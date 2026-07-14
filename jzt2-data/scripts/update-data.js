/**
 * 建站通2.0 数据包自动更新脚本（通用模板）
 *
 * 使用方法:
 *   1. 复制本文件到项目根目录
 *   2. npm i adm-zip
 *   3. 运行: node update-data.js <site_id>
 *      或编辑下方 SITE_ID 常量填入本站 id 后直接 node update-data.js
 *      （site_id 每站唯一，制作端查看，禁止抄别的项目）
 *
 * 功能: 从建站通 API 下载最新数据包并解压到 jsonDatas 目录，
 *       旧数据自动备份到 jsonDatas_backup（记得把这两个目录加进 .gitignore 按需处理）
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

// 本站 site_id：命令行参数优先，否则用这里填的常量
const SITE_ID = process.argv[2] || '';

if (!SITE_ID) {
    console.error('\x1b[31m❌ 缺少 site_id\x1b[0m');
    console.error('用法: node update-data.js <site_id>');
    console.error('或编辑本文件顶部的 SITE_ID 常量填入本站 id（制作端查看）');
    process.exit(1);
}

// 配置
const CONFIG = {
    apiUrl: `https://jzt2.china9.cn/api/Download/index?site_id=${SITE_ID}`,
    downloadPath: './temp_data.zip',
    extractPath: './jsonDatas',
    backupPath: './jsonDatas_backup'
};

// 颜色输出
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// 下载文件
async function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        log('📥 开始下载数据包...', 'blue');

        const file = fs.createWriteStream(dest);

        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                // 处理重定向
                log('🔄 处理重定向...', 'yellow');
                https.get(response.headers.location, (redirectResponse) => {
                    const totalSize = parseInt(redirectResponse.headers['content-length'], 10);
                    let downloadedSize = 0;

                    redirectResponse.on('data', (chunk) => {
                        downloadedSize += chunk.length;
                        if (totalSize && !isNaN(totalSize)) {
                            const percent = ((downloadedSize / totalSize) * 100).toFixed(2);
                            process.stdout.write(`\r下载进度: ${percent}%`);
                        } else {
                            process.stdout.write(`\r已下载: ${(downloadedSize / 1024 / 1024).toFixed(2)} MB`);
                        }
                    });

                    redirectResponse.pipe(file);

                    file.on('finish', () => {
                        file.close();
                        console.log(); // 换行
                        log('✅ 下载完成！', 'green');
                        resolve();
                    });
                }).on('error', (err) => {
                    fs.unlink(dest, () => {});
                    reject(err);
                });
            } else {
                const totalSize = parseInt(response.headers['content-length'], 10);
                let downloadedSize = 0;

                response.on('data', (chunk) => {
                    downloadedSize += chunk.length;
                    if (totalSize && !isNaN(totalSize)) {
                        const percent = ((downloadedSize / totalSize) * 100).toFixed(2);
                        process.stdout.write(`\r下载进度: ${percent}%`);
                    } else {
                        process.stdout.write(`\r已下载: ${(downloadedSize / 1024 / 1024).toFixed(2)} MB`);
                    }
                });

                response.pipe(file);

                file.on('finish', () => {
                    file.close();
                    console.log(); // 换行
                    log('✅ 下载完成！', 'green');
                    resolve();
                });
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

// 备份当前数据
function backupCurrentData() {
    try {
        if (fs.existsSync(CONFIG.extractPath)) {
            log('📦 备份当前数据...', 'blue');

            // 删除旧备份
            if (fs.existsSync(CONFIG.backupPath)) {
                fs.rmSync(CONFIG.backupPath, { recursive: true, force: true });
            }

            // 创建新备份
            fs.cpSync(CONFIG.extractPath, CONFIG.backupPath, { recursive: true });
            log('✅ 备份完成！', 'green');
        }
    } catch (error) {
        log(`⚠️  备份失败: ${error.message}`, 'yellow');
    }
}

// 服务端 ThinkPHP 开了 app_trace，会在 zip 末尾追加调试面板 HTML，
// 导致 zip 末尾的 EOCD（PK\x05\x06）落在 ADM-ZIP 默认扫描窗口外。
// 这里从尾部往前找最后一个 EOCD，截掉后面的垃圾再喂给 ADM-ZIP。
function sanitizeZipBuffer(buf) {
    for (let i = buf.length - 22; i >= 0; i--) {
        if (buf[i] === 0x50 && buf[i + 1] === 0x4b && buf[i + 2] === 0x05 && buf[i + 3] === 0x06) {
            const commentLen = buf.readUInt16LE(i + 20);
            const realEnd = i + 22 + commentLen;
            if (realEnd < buf.length) {
                log(`🩹 检测到尾部冗余 ${buf.length - realEnd} 字节（疑似 ThinkPHP trace），已截断`, 'yellow');
            }
            return buf.slice(0, realEnd);
        }
    }
    throw new Error('未找到 zip End-of-Central-Directory 记录');
}

// 解压文件
function extractZip(zipPath, extractTo) {
    log('📂 开始解压数据包...', 'blue');

    try {
        const rawBuffer = fs.readFileSync(zipPath);
        const cleanBuffer = sanitizeZipBuffer(rawBuffer);
        const zip = new AdmZip(cleanBuffer);
        const zipEntries = zip.getEntries();

        // 查找 jsonDatas 文件夹
        const jsonDatasEntries = zipEntries.filter(entry =>
            entry.entryName.includes('jsonDatas/')
        );

        if (jsonDatasEntries.length === 0) {
            throw new Error('压缩包中未找到 jsonDatas 目录');
        }

        // 解压到临时目录
        const tempExtractPath = './temp_extract';
        if (fs.existsSync(tempExtractPath)) {
            fs.rmSync(tempExtractPath, { recursive: true, force: true });
        }
        zip.extractAllTo(tempExtractPath, true);

        // 找到 jsonDatas 目录
        let jsonDatasPath = null;
        function findJsonDatasPath(dir) {
            const files = fs.readdirSync(dir);
            for (const file of files) {
                const fullPath = path.join(dir, file);
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    if (file === 'jsonDatas') {
                        jsonDatasPath = fullPath;
                        return;
                    }
                    findJsonDatasPath(fullPath);
                }
            }
        }
        findJsonDatasPath(tempExtractPath);

        if (!jsonDatasPath) {
            throw new Error('未找到 jsonDatas 目录');
        }

        // 删除旧的 jsonDatas
        if (fs.existsSync(extractTo)) {
            fs.rmSync(extractTo, { recursive: true, force: true });
        }

        // 移动新的 jsonDatas
        fs.cpSync(jsonDatasPath, extractTo, { recursive: true });

        // 清理临时文件
        fs.rmSync(tempExtractPath, { recursive: true, force: true });

        log('✅ 解压完成！', 'green');

        // 列出更新的文件
        const files = fs.readdirSync(extractTo);
        log(`\n📋 更新的文件列表 (共 ${files.length} 个):`, 'blue');
        files.forEach(file => {
            console.log(`   - ${file}`);
        });

    } catch (error) {
        throw new Error(`解压失败: ${error.message}`);
    }
}

// 清理临时文件
function cleanup() {
    try {
        if (fs.existsSync(CONFIG.downloadPath)) {
            fs.unlinkSync(CONFIG.downloadPath);
            log('🧹 清理临时文件完成', 'green');
        }
    } catch (error) {
        log(`⚠️  清理临时文件失败: ${error.message}`, 'yellow');
    }
}

// 主函数
async function main() {
    console.log('\n' + '='.repeat(60));
    log('🚀 建站通2.0 数据包更新工具', 'green');
    log(`站点: ${SITE_ID}`, 'blue');
    console.log('='.repeat(60) + '\n');

    try {
        // 1. 备份当前数据
        backupCurrentData();

        // 2. 下载数据包
        await downloadFile(CONFIG.apiUrl, CONFIG.downloadPath);

        // 3. 解压数据包
        extractZip(CONFIG.downloadPath, CONFIG.extractPath);

        // 4. 清理临时文件
        cleanup();

        console.log('\n' + '='.repeat(60));
        log('🎉 数据更新成功！', 'green');
        console.log('='.repeat(60) + '\n');

    } catch (error) {
        log(`\n❌ 错误: ${error.message}`, 'red');
        log('💡 提示: 如果更新失败，可以从 jsonDatas_backup 恢复数据', 'yellow');

        // 清理临时文件
        cleanup();

        process.exit(1);
    }
}

// 运行
main();
