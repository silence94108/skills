# 建站通2.0 服务端 HTTP 接口（常用）

来源：官方 showdoc 文档原文归档（https://www.showdoc.com.cn/2047618105032301 ，抓取于 2026-07）。企业官网高频接口：留言/简历提交、浏览量查询、远程详情、自定义信息 CRUD、关联列表、文件上传、站点用户注册登录、短信、通用记录、操作日志。所有接口的 site_id 一律用本站的（查 update-data.js 或制作端）。

## 目录

1. [提交简历](#提交简历)（内容管理/招聘）
2. [留言](#留言)（内容管理）
3. [根据分类获取产品列表](#根据分类获取产品列表)（内容管理）
4. [自定义信息](#自定义信息)（内容管理）
5. [自定义信息列表](#自定义信息列表)（内容管理）
6. [自定义信息删除](#自定义信息删除)（内容管理）
7. [自定义信息详情](#自定义信息详情)（内容管理）
8. [查询浏览量](#查询浏览量)（内容管理）
9. [获取文章或产品的关联列表](#获取文章或产品的关联列表)（内容管理）
10. [获取文章或产品的关联列表（分类和分类下数据特殊处理）](#获取文章或产品的关联列表（分类和分类下数据特殊处理）)（内容管理）
11. [文章详情](#文章详情)（内容管理）
12. [上传图片](#上传图片)（文件上传）
13. [上传视频](#上传视频)（文件上传）
14. [上传文件](#上传文件)（文件上传）
15. [用户注册](#用户注册)（用户管理）
16. [用户登录](#用户登录)（用户管理）
17. [忘记密码](#忘记密码)（用户管理）
18. [发送短信](#发送短信)（短信管理）
19. [添加记录](#添加记录)（功能型接口）
20. [查询记录](#查询记录)（功能型接口）
21. [产品记录列表](#产品记录列表)
22. [分类记录列表](#分类记录列表)

---

## 提交简历

> 分组：内容管理/招聘

##### 简要描述

- 提交简历接口

##### 请求URL
- ` https://jzt2.china9.cn/api/recruitment/addRecruitment`
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string | 站点id    |
|content |是  |string | 内容 示例 {"姓名":"小王","性别":"男"}    |
|position_id |是  |string | 职位id（招聘列表某条数据的id）    |
|filecontent |否  |string | 简历附件：文件链接，多个文件逗号隔开(简历附件可通过上传文件接口上传，拿文件链接)    |

##### 使用示例 

 ``` 
 $.post("http://jzt2.china9.cn/api/recruitment/addRecruitment", {
 	site_id: "站点id",
	position_id: "职位id",
	filecontent: "http://jianzhantong.oss-cn-beijing.aliyuncs.com/0971a11acea011ea9d6bfa163ea50a57/file/20221111/81361afd57132251e8b67ee51cbf04a4.txt,http://jianzhantong.oss-cn-beijing.aliyuncs.com/0971a11acea011ea9d6bfa163ea50a57/file/20221102/69867cf1b6d2fc35c555b2877daf414f.pdf",
 	content: {
 		"姓名": "张三",
 		"邮箱地址": "12345678@qq.com",
 		"手机号": "18855556666",
 		"工作经验": "5年以上"
 	}
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```

##### 返回示例 
 ``` 
 {
  "code": 200,
  "msg": "成功",
} 

```

---

## 留言

> 分组：内容管理

##### 简要描述

- 留言接口

##### 请求URL
- ` http://jzt2.china9.cn/api/message/addMsg `
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string | 站点id    |
|column_id |是  |string | 栏目id （制作端查看）   |
|content |是  |object | 内容 示例【姓名:小王,性别:男】    |

##### 使用示例 

 ``` 
 $.post("http://jzt2.china9.cn/api/message/addMsg", {
 	site_id: "站点id",
 	content: {
 		"姓名": "张三",
 		"邮箱地址": "12345678@qq.com",
 		"手机号": "18855556666",
 		"内容": "留言内容"
 	}
 }, function(res) {
	 if (res.code === 200) {
	 	alert("留言提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```


##### 返回示例 



 ``` 
 {
  "code": 200,
  "msg": "留言成功",
} 

```

---

## 根据分类获取产品列表

> 分组：内容管理

##### 简要描述

- 根据产品分类获取产品列表接口

##### 请求URL
- ` http://jzt2.china9.cn/api/Goods/goods_lst `
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string | 站点id    |
|page |是  |int | 当前页    |
|limit |否  |int | 默认10条    |
|category_id |是  |string | 分类id  传0取全部产品分类  多个分类用逗号隔开    |
|type |否  |string | 类型 all取当前分类及子级下的所有数据  alone只取当前分类所有数据（不包含所有子级）  默认 alone     |

##### 使用示例 

 ``` 
 $.post("http://jzt2.china9.cn/api/Goods/goods_lst", {
 	site_id: "站点id",
	category_id: "64b0ed11f99e18340142dc26",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("查询成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```


##### 返回示例 



 ``` 
{
    "code": 200,
    "msg": "查询成功",
    "data": {
        "total": 10,
        "per_page": 10,
        "current_page": 1,
        "last_page": 1,
        "data": [
            {
                "category_id": "64b0ed11f99e18340142dc26",
                "sort": 26,
                "status": 1,
                "type": "goods",
                "details": "<img src='undefined'>",
                "title": "ccc",
                "site_id": "6358f79e50ea651811158850",
                "intro": "",
                "is_top": 0,
                "bg_img": "",
                "create_time": 1694058347,
                "update_time": "2023-09-07 11:45:47",
                "id": "64f9476b499ca54f270cbe20",
                "category": [
                    {
                        "pid": "0",
                        "sort": 4,
                        "type": "goods",
                        "title": "分类1",
                        "site_id": "6358f79e50ea651811158850",
                        "create_time": "2023-07-14 14:37:05",
                        "update_time": "2023-08-02 13:57:25",
                        "content_type": "category",
                        "id": "64b0ed11f99e18340142dc26"
                    }
                ],
                "ces": "",
                "imgGroup": ""
            },
            {
                "category_id": "64b0ed11f99e18340142dc26,64b0ed009aef5613d939b80d",
                "sort": 24,
                "status": 1,
                "type": "goods",
                "details": "<img src='undefined'>",
                "title": "多分类测试",
                "site_id": "6358f79e50ea651811158850",
                "intro": "*",
                "bg_img": "",
                "create_time": 1689407440,
                "update_time": "2023-08-02 14:46:36",
                "ces": "",
                "imgGroup": "",
                "showQRCode": true,
                "content_type": "goods",
                "is_top": 0,
                "id": "64b24fd0beef1948db4191f1",
                "category": [
                    {
                        "pid": "0",
                        "sort": 3,
                        "type": "goods",
                        "title": "案例1",
                        "site_id": "6358f79e50ea651811158850",
                        "create_time": "2023-07-14 14:36:48",
                        "update_time": "2023-07-14 14:36:48",
                        "id": "64b0ed009aef5613d939b80d"
                    },
                    {
                        "pid": "0",
                        "sort": 4,
                        "type": "goods",
                        "title": "分类1",
                        "site_id": "6358f79e50ea651811158850",
                        "create_time": "2023-07-14 14:37:05",
                        "update_time": "2023-08-02 13:57:25",
                        "content_type": "category",
                        "id": "64b0ed11f99e18340142dc26"
                    }
                ]
            }
            
        ]
    }
}

```

---

## 自定义信息

> 分组：内容管理

##### 简要描述

- 自定义信息

##### 请求URL
- ` http://jzt2.china9.cn/api/custom/addMsg `
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string | 站点id    |
|custom_type_id |否  |string | 分类id    |

##### 使用示例 

 ``` 
 $.post("http://jzt2.china9.cn/api/custom/addMsg", {
 	site_id: "站点id",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```


##### 返回示例 



 ``` 
 {
  "code": 200,
  "msg": "提交成功",
} 

```

---

## 自定义信息列表

> 分组：内容管理

##### 简要描述

- 自定义信息列表

##### 请求URL
- ` http://jzt2.china9.cn/api/custom/lst `
  
##### 请求方式
- GET 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string | 站点id    |
|page |是  |int | 当前页    |
|order_sort |否  |string | 排序  desc倒序   asc正序   默认倒序    |
|order_field |否  |string | 排序字段  默认  create_time     |
|limit |否  |int | 默认10条    |
|search_type |否  |string | 搜索类型  precise精准搜索   like模糊搜索   默认为精准搜索    |
|where |否  |object | 条件 数据格式为  json对象   |
##### 使用示例 

 ``` 
 $.post("http://jzt2.china9.cn/api/custom/lst", {
 	site_id: "站点id",
	order_sort: "desc",
	where: {
         "user_id": "123213",
     }
 }, function(res) {
	 if (res.code === 200) {
	 	alert("查询成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```


##### 返回示例 



 ``` 
 {
  "code": 200,
  "msg": "提交成功",
} 

```

---

## 自定义信息删除

> 分组：内容管理

##### 简要描述

- 自定义信息删除

##### 请求URL
- ` http://jzt2.china9.cn/api/custom/delMsg `
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string | 站点id    |
|msg_id |是  |string | 消息id    |

##### 使用示例 

 ``` 
 $.post("http://jzt2.china9.cn/api/custom/delMsg", {
 	site_id: "站点id",
	msg_id: "消息id",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("删除成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```


##### 返回示例 



 ``` 
 {
  "code": 200,
  "msg": "删除成功",
} 

```

---

## 自定义信息详情

> 分组：内容管理

##### 简要描述

- 自定义信息详情

##### 请求URL
- ` http://jzt2.china9.cn/api/custom/info `
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string | 站点id    |
|msg_id |是  |string | 消息id    |

##### 使用示例 

 ``` 
 $.post("http://jzt2.china9.cn/api/custom/info", {
 	site_id: "站点id",
	msg_id: "消息id",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("查询成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```


##### 返回示例 



 ``` 
 {
  "code": 200,
  "msg": "查询成功",
} 

```

---

## 查询浏览量

> 分组：内容管理

##### 简要描述

- 查询浏览量

##### api 参数
- `https://jzt2.china9.cn/api/readnum/selRead`

##### 请求方式
- GET 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|id  |是|string| 列表数据id|
|type     |是  |string | 类型：goods产品、content文章、product商品、text信息、 carousel轮播、 image图片 |

##### 使用示例
```
$.get('https://jzt2.china9.cn/api/readnum/selRead', {
	id: "62ec7a5dba5200003d0014a6",
	type: "content",
}, function(res) {
	if (res.code === 200) {
		// 成功
        console.log(res.msg);
	} else {
		console.log(res.msg);
	}
})
```

---

## 获取文章或产品的关联列表

> 分组：内容管理

##### 简要描述

- 根据某个文章或产品的id获取后台与之关联的列表数据

##### 请求URL
- ` http://jzt2.china9.cn/api/Content/associationLst
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string | 站点id    |
|page |是  |int | 当前页    |
|limit |否  |int | 默认10条    |
|id |是  |string | 需要获取关联数据的文章或产品id  |
|type |是  |int | 参数id的类型：1文章  2产品   |
|association_type |是  |int | 查询的关联数据类型：1文章  2产品  |

##### 使用示例 

 ``` 
 $.post("http://jzt2.china9.cn/api/Content/associationLst", {
 	site_id: "站点id",
	id: "6527bea02413a1403c6d25b0",
	type:1,
	association_type:1,
 }, function(res) {
	 if (res.code === 200) {
	 	alert("查询成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```


##### 返回示例 



 ``` 
{
    "code": 200,
    "msg": "关联列表",
    "data": {
        "total": 3,
        "per_page": 10,
        "current_page": 1,
        "last_page": 1,
        "data": [
            {
                "data_id": "6527bea02413a1403c6d25b0",
                "type": 1,
                "association_type": 1,
                "gl_id": "6361e153a40f361ec24e9700",
                "sort": 1,
                "create_time": "2023-10-28 15:33:47",
                "id": "653cb95be33f7400111818ba",
                "info": {
                    "category_id": "637303fa068bff3d12618cfe",
                    "sort": 1,
                    "status": 1,
                    "type": "content",
                    "details": "<div><video controls=\"controls\" width=\"300\" height=\"150\">\n<source src=\"https://vod.guanjialc.com/sv/4fd3bb66-181c4d08ca0/4fd3bb66-181c4d08ca0.mp4\" type=\"video/mp4\" /></video></div>",
                    "title": "附件测试1",
                    "intro": "附件测试",
                    "bg_img": "https://oss.lcweb01.cn/jzt/0971a11acea011ea9d6bfa163ea50a57/image/20221102/004556c171510f52503c323d14b2c6e1.png",
                    "site_id": "6358f79e50ea651811158850",
                    "create_time": "2022-11-02 11:17:39",
                    "update_time": "2023-02-03 10:36:23",
                    "category": {
                        "pid": "0",
                        "sort": 1,
                        "type": "content",
                        "title": "测试分类",
                        "site_id": "6358f79e50ea651811158850",
                        "create_time": "2022-11-15 11:14:02",
                        "update_time": "2023-07-11 09:39:42",
                        "editor": "<p>测试</p>",
                        "recommend": true,
                        "image_intro": "https://oss.lcweb01.cn/jzt/0971a11acea011ea9d6bfa163ea50a57/image/20230710/26732ccdb719f7779b7a4652ea467a15.jpeg",
                        "id": "637303fa068bff3d12618cfe"
                    },
                    "editor": "",
                    "phoneBg": "",
                    "is_top": 0,
                    "id": "6361e153a40f361ec24e9700"
                }
            },
            {
                "data_id": "6527bea02413a1403c6d25b0",
                "type": 1,
                "association_type": 1,
                "category_id": "",
                "gl_id": "64ffc8d081799931ac1bfeee",
                "sort": 2,
                "create_time": "2023-10-30 17:05:14",
                "id": "653f71ca850639471d160d11",
                "info": {
                    "title": "“主动刷脸”打卡，上班就是如此简单！",
                    "site_id": "6358f79e50ea651811158850",
                    "category_id": "",
                    "sort": 22,
                    "intro": "",
                    "details": "<p style=\"margin: 0px; padding: 0px; max-width: 100%; clear: both; font-size: 14px; font-family: 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', 微软雅黑, Arial, sans-serif; text-align: center; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><img style=\"margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\" title=\"d4aec5aced4de46a81f815a5b213be7f.gif\" src=\"https://oss.lcweb01.cn/jzt/0971a11acea011ea9d6bfa163ea50a57/image/20221116/d4aec5aced4de46a81f815a5b213be7f.gif\" alt=\"901368\" /></p>",
                    "bg_img": "https://oss.lcweb01.cn/jzt/0971a11acea011ea9d6bfa163ea50a57/image/20231016/1ea963f9093b5fe89d25ce256194ed46.jpeg",
                    "status": 1,
                    "is_top": 0,
                    "create_time": "2023-09-12 10:11:28",
                    "update_time": "2023-10-16 10:10:41",
                    "bgImg": "",
                    "category": null,
                    "content_type": "content",
                    "editor": "",
                    "phoneBg": "",
                    "readnum": 0,
                    "recommend": true,
                    "id": "64ffc8d081799931ac1bfeee"
                }
            },
            {
                "data_id": "6527bea02413a1403c6d25b0",
                "type": 1,
                "association_type": 1,
                "category_id": "",
                "gl_id": "64e0254055671544437da25b",
                "sort": 3,
                "create_time": "2023-10-30 17:05:14",
                "id": "653f71ca850639471d160d12",
                "info": {
                    "category_id": "",
                    "sort": 21,
                    "status": 1,
                    "type": "content",
                    "details": " ",
                    "editor": "<p><video controls=\"controls\" width=\"300\" height=\"150\">\n<source src=\"https://ceshiss1.com/bucket/1692411170.mp4\" type=\"video/mp4\" /></video></p>",
                    "bg_img": "https://ceshiss1.com/bucket/1692411180.jpg",
                    "title": "123123",
                    "site_id": "6358f79e50ea651811158850",
                    "intro": "",
                    "is_top": 0,
                    "create_time": "2023-08-19 10:13:20",
                    "update_time": "2023-08-19 10:13:20",
                    "id": "64e0254055671544437da25b",
                    "category": null
                }
            }
        ]
    }
}
```

---

## 获取文章或产品的关联列表（分类和分类下数据特殊处理）

> 分组：内容管理

##### 简要描述

- 根据某个文章或产品的id获取后台与之关联的列表数据

##### 请求URL
- ` http://jzt2.china9.cn/api/Content/associationLsts
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|category_id |否  |string | 分类id    |
|site_id |是  |string | 站点id    |
|id |是  |string | 需要获取关联数据的文章或产品id  |
|type |是  |int | 参数id的类型：1文章  2产品  3点位  4下载  5解决   |
|association_type |是  |int | 查询的关联数据类型：1文章  2产品  3点位  4下载  5解决  |

##### 使用示例 

 ``` 
 $.post("http://jzt2.china9.cn/api/Content/associationLsts", {
 	site_id: "站点id",
	id: "6527bea02413a1403c6d25b0",
	type:1,
	association_type:1,
 }, function(res) {
	 if (res.code === 200) {
	 	alert("查询成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```


##### 返回示例 



 ``` 
{
    "code": 200,
    "msg": "关联列表",
    "data": [
            {
                "data_id": "6527bea02413a1403c6d25b0",
                "type": 1,
                "association_type": 1,
                "gl_id": "6361e153a40f361ec24e9700",
                "sort": 1,
                "create_time": "2023-10-28 15:33:47",
                "id": "653cb95be33f7400111818ba",
                "info": {
                    "category_id": "637303fa068bff3d12618cfe",
                    "sort": 1,
                    "status": 1,
                    "type": "content",
                    "details": "<div><video controls=\"controls\" width=\"300\" height=\"150\">\n<source src=\"https://vod.guanjialc.com/sv/4fd3bb66-181c4d08ca0/4fd3bb66-181c4d08ca0.mp4\" type=\"video/mp4\" /></video></div>",
                    "title": "附件测试1",
                    "intro": "附件测试",
                    "bg_img": "https://oss.lcweb01.cn/jzt/0971a11acea011ea9d6bfa163ea50a57/image/20221102/004556c171510f52503c323d14b2c6e1.png",
                    "site_id": "6358f79e50ea651811158850",
                    "create_time": "2022-11-02 11:17:39",
                    "update_time": "2023-02-03 10:36:23",
                    "category": {
                        "pid": "0",
                        "sort": 1,
                        "type": "content",
                        "title": "测试分类",
                        "site_id": "6358f79e50ea651811158850",
                        "create_time": "2022-11-15 11:14:02",
                        "update_time": "2023-07-11 09:39:42",
                        "editor": "<p>测试</p>",
                        "recommend": true,
                        "image_intro": "https://oss.lcweb01.cn/jzt/0971a11acea011ea9d6bfa163ea50a57/image/20230710/26732ccdb719f7779b7a4652ea467a15.jpeg",
                        "id": "637303fa068bff3d12618cfe"
                    },
                    "editor": "",
                    "phoneBg": "",
                    "is_top": 0,
                    "id": "6361e153a40f361ec24e9700"
                }
            },
            {
                "data_id": "6527bea02413a1403c6d25b0",
                "type": 1,
                "association_type": 1,
                "category_id": "",
                "gl_id": "64ffc8d081799931ac1bfeee",
                "sort": 2,
                "create_time": "2023-10-30 17:05:14",
                "id": "653f71ca850639471d160d11",
                "info": {
                    "title": "“主动刷脸”打卡，上班就是如此简单！",
                    "site_id": "6358f79e50ea651811158850",
                    "category_id": "",
                    "sort": 22,
                    "intro": "",
                    "details": "<p style=\"margin: 0px; padding: 0px; max-width: 100%; clear: both; font-size: 14px; font-family: 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', 微软雅黑, Arial, sans-serif; text-align: center; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><img style=\"margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\" title=\"d4aec5aced4de46a81f815a5b213be7f.gif\" src=\"https://oss.lcweb01.cn/jzt/0971a11acea011ea9d6bfa163ea50a57/image/20221116/d4aec5aced4de46a81f815a5b213be7f.gif\" alt=\"901368\" /></p>",
                    "bg_img": "https://oss.lcweb01.cn/jzt/0971a11acea011ea9d6bfa163ea50a57/image/20231016/1ea963f9093b5fe89d25ce256194ed46.jpeg",
                    "status": 1,
                    "is_top": 0,
                    "create_time": "2023-09-12 10:11:28",
                    "update_time": "2023-10-16 10:10:41",
                    "bgImg": "",
                    "category": null,
                    "content_type": "content",
                    "editor": "",
                    "phoneBg": "",
                    "readnum": 0,
                    "recommend": true,
                    "id": "64ffc8d081799931ac1bfeee"
                }
            },
            {
                "data_id": "6527bea02413a1403c6d25b0",
                "type": 1,
                "association_type": 1,
                "category_id": "",
                "gl_id": "64e0254055671544437da25b",
                "sort": 3,
                "create_time": "2023-10-30 17:05:14",
                "id": "653f71ca850639471d160d12",
                "info": {
                    "category_id": "",
                    "sort": 21,
                    "status": 1,
                    "type": "content",
                    "details": " ",
                    "editor": "<p><video controls=\"controls\" width=\"300\" height=\"150\">\n<source src=\"https://ceshiss1.com/bucket/1692411170.mp4\" type=\"video/mp4\" /></video></p>",
                    "bg_img": "https://ceshiss1.com/bucket/1692411180.jpg",
                    "title": "123123",
                    "site_id": "6358f79e50ea651811158850",
                    "intro": "",
                    "is_top": 0,
                    "create_time": "2023-08-19 10:13:20",
                    "update_time": "2023-08-19 10:13:20",
                    "id": "64e0254055671544437da25b",
                    "category": null
                }
            }
        ]
}
```

---

## 文章详情

> 分组：内容管理

##### 简要描述

- 文章详情接口

##### 请求URL
- ` https://jzt2.china9.cn/api/content/selinfo `
  
##### 请求方式
- GET 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string | 站点id    |
|id |是  |string | 文章id    |
|column_id |是  |string | 栏目id    |

##### 请求示例(收藏文章)
```
var data = {
	site_id: '站点id',
}
$.get('https://jzt2.china9.cn/api/content/selinfo', data, function(res) {
	if (res.code === 200) {
		// 成功
        console.log(res.msg);
	} else {
		console.log(res.msg);
	}
})
```

##### 返回示例 

``` 
  {
    "code": 200,
    "msg": "查询成功",
    "data": {
        "category_id": "",
        "sort": 2,
        "status": 3,
        "type": "content",
        "details": " ",
        "title": "1",
        "column_id": "65f94153698b031ecb5b4b30",
        "site_id": "6358f79e50ea651811158850",
        "intro": "",
        "is_top": 0,
        "bg_img": "",
        "create_time": "2024-03-20 16:57:05",
        "update_time": "2024-03-20 16:57:05",
        "id": "65faa4e171c9a6583053afe3"
    }
}
```

---

## 上传图片

> 分组：文件上传

##### 简要描述

- 上传图片接口

##### 请求URL
- ` https://jzt2.china9.cn/api/uploads/uploadImg `
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|image |是  |file |文件   |
|site_id |是  |string | 站点id    |

##### 请求示例 

````
var formData = new FormData();
formData.append("site_id", "站点id");
formData.append("image", file); // file 文件流
$.ajax({
	type: "POST",
	url:"https://jzt2.china9.cn/api/uploads/uploadImg",
	data: formData,
	contentType: false,
	processData: false,
	dataType: 'json',
	success:function(res){
		if (res.code === 200) {
			// 成功
			console.log(res.msg);
		} else {
			// 失败
			console.log(res.msg);
		}
	}
});

````

##### 返回示例 

``` 
  {
    "code": 200,
    "msg": "上传成功",
    "data": 'url'
  }
```

---

## 上传视频

> 分组：文件上传

##### 简要描述

- 上传视频接口

##### 请求URL
- ` https://jzt2.china9.cn/api/uploads/uploadVideo `
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|video |是  |file |文件   |
|site_id |是  |string | 站点id    |

##### 返回示例 

``` 
  {
    "code": 200,
    "msg": "上传成功",
    "data": 'url'
  }
```

---

## 上传文件

> 分组：文件上传

##### 简要描述

- 上传文件接口

##### 请求URL
- ` https://jzt2.china9.cn/api/uploads/uploadFile `
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|file |是  |file |文件   |
|site_id |是  |string | 站点id    |

##### 返回示例 

``` 
  {
    "code": 200,
    "msg": "上传成功",
    "data": 'url'
  }
```

---

## 用户注册

> 分组：用户管理

##### 简要描述

- 用户注册接口

##### 请求URL
- ` https://jzt2.china9.cn/api/siteuser/register `
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string | 站点id    |
|username |是  |string | 账号    |
|pwd |否  |string | 密码    |
|nickname |否  |string | 昵称    |
|phone |否  |number | 手机号 （如果需要验证短信验证码手机号字段必传且参数为phone）   |
|code |否  |number | 短信验证码 （如果需要验证短信验证码该字段字段必传且参数为code）   |
|可自定义信息  |否  |    |  其他   |
##### 使用示例 

``` 
var data = {
	site_id: '站点id',
	username: '用户名',
	pwd: '密码',
	nickname: '昵称', // 系统自带参数 昵称  不需要可不传
	email: '邮箱', // 自定义参数
	phone: '手机号', // 自定义参数
}
var base = new Base64();  // base64加密  需要引用公共js(jzt_common.js)
data = JSON.stringify(data)   // 先把data转成json字符串
data = base.encode(data)   // 再将data使用base64加密
data = { data: data }  // 再将data通过data参数传给后台
$.post('https://jzt2.china9.cn/api/siteuser/register', data, function(res) {
	if (res.code === 200) {
		// 注册成功
		console.log(res.msg);
	} else {
		// 注册失败
		console.log(res.msg);
	}
})
```
##### 返回示例 

``` 
  {
    "code": 200,
    "msg": "注册成功",
    "data": ''
  }
```

---

## 用户登录

> 分组：用户管理

##### 简要描述

- 用户登录接口

##### 请求URL
- ` https://jzt2.china9.cn/api/siteuser/login `
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string | 站点id    |
|username |是  |string | 账号    |
|pwd |否  |string | 密码    |
|phone |否  |number | 手机号 （如果需要验证短信验证码手机号字段必传且参数为phone）   |
|code |否  |number | 短信验证码 （如果需要验证短信验证码该字段字段必传且参数为code）   |

##### 使用示例 

``` 
var data = {
	site_id: '站点id',
	username: '用户名',
	pwd: '密码',
}
var base = new Base64();  // base64加密  需要引用公共js(jzt_common.js)
data = JSON.stringify(data)   // 先把data转成json字符串
data = base.encode(data)   // 再将data使用base64加密
data = { data: data }  // 再将data通过data参数传给后台
$.post('https://jzt2.china9.cn/api/siteuser/login', data, function(res) {
	if (res.code === 200) {
		// 登录成功
		console.log(res.msg);
	} else if(res.code === 403) {
		// 账号锁定
		console.log(res.msg);
	} else {
		// 失败
		console.log(res.msg);
	}
})
```

##### 返回示例 
 ``` 
 {
  "code": 200,
  "msg": "登录成功",
  "data": {
    "site_id": "6358f79e50ea651811158850",
    "username": "qiaoqiao",
    "pwd": "e10adc3949ba59abbe56e057f20f883e",
    "nickname": "qiaoqiao",
    "create_time": "2022-11-22 11:03:40",
    "status": 1,
    "id": "637c3c0c14bbf532a510ef34"
  }
} 

```
##### 返回参数说明

|参数名|类型|说明|
|:----    |:---|:----- |
|code |string | 状态码：200成功  403锁定   500其他  |
|data |object | 数据    |
|msg |string | 提示信息    |

---

## 忘记密码

> 分组：用户管理

##### 简要描述

- 忘记密码重置密码接口

##### 请求URL
- ` https://jzt2.china9.cn/api/Siteuser/forgot_pwd `
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string | 站点id    |
|phone |是  |number | 手机号 （需要验证短信验证码 手机号字段必传且参数为phone）   |
|code |是  |number | 短信验证码 （该字段必传且参数为code）   |
|pwd |是  |string | 新密码    |
|new_pwd |是  |string | 再次输入新密码    |
|username |否  |username | 账号    |
|user_id |否  |user_id | 用户id    |
|old_pwd |否  |old_pwd | 原密码    |

##### 使用示例 

``` 
var data = {
	site_id: '站点id',
	phone: '手机号',
	pwd: '新密码',
	new_pwd: '再次输入的新密码',
}
var base = new Base64();  // base64加密  需要引用公共js(jzt_common.js)
data = JSON.stringify(data)   // 先把data转成json字符串
data = base.encode(data)   // 再将data使用base64加密
data = { data: data }  // 再将data通过data参数传给后台
$.post('https://jzt2.china9.cn/api/siteuser/forgot_pwd', data, function(res) {
	if (res.code === 200) {
        // 修改成功
        console.log(res.msg);
    } else {
        // 修改失败
        console.log(res.msg);
    }
})
```

##### 返回示例 
 ``` 
 {
  "code": 200,
  "msg": "修改成功",
  "data": {
    "site_id": "6358f79e50ea651811158850",
    "username": "qiaoqiao",
    "pwd": "e10adc3949ba59abbe56e057f20f883e",
    "nickname": "qiaoqiao",
    "create_time": "2022-11-22 11:03:40",
    "status": 1,
    "id": "637c3c0c14bbf532a510ef34"
  }
} 

```
##### 返回参数说明

|参数名|类型|说明|
|:----    |:---|:----- |
|code |string | 状态码：200成功  400其他  |
|data |object | 数据    |
|msg |string | 提示信息    |

---

## 发送短信

> 分组：短信管理

##### 简要描述

- 发送短信接口

##### 请求URL
- ` https://jzt2.china9.cn/api/sendsms/send `
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|phone |是  |string |手机号   |
|site_id |是  |string | 站点id    |
|sms_id |是  |string | 模板id    |

##### 请求示例
```
$.post('https://jzt2.china9.cn/api/sendsms/send', {
	phone: '手机号',
	site_id: '站点id',
	sms_id: '短信模板id'
}, function(res) {
	if (res.code === 200) {
		// 发送成功
		console.log(res);
	} else {
		// 发送失败
		console.log(res.msg);
	}
})
```

##### 返回示例 

``` 
  {
    "code": 200,
    "msg": "发送成功",
  }
```

---

## 添加记录

> 分组：功能型接口

##### 简要描述

- 添加记录接口

##### 请求URL
- ` https://jzt2.china9.cn/api/collection/addMsg `
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string | 站点id    |
|自定义字段 |否  |any | 自定义字段    |

##### 请求示例(收藏文章)
```
var data = {
	site_id: '站点id',
	type: 'collection',  // 自定字段类型  区分功能
	info_id: info.value.id,  // 自定字段文章id  收藏文章的id
	userId: userInfo.value.id,  // 自定字段用户id  收藏文章的用户id
	isCollection: !isCollection.value  // 自定字段是否收藏  
}
$.post('https://jzt2.china9.cn/api/collection/addMsg', data, function(res) {
	if (res.code === 200) {
		// 操作成功
		console.log(res.msg);
	} else {
		// 操作失败
		console.log(res.msg);
	}
})
```

##### 返回示例 

``` 
  {
    "code": 200,
    "msg": "操作成功",
  }
```

---

## 查询记录

> 分组：功能型接口

##### 简要描述

- 添加记录接口

##### 请求URL
- ` https://jzt2.china9.cn/api/collection/selMsg `
  
##### 请求方式
- GET 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string | 站点id    |
|field |否  |string | 排序字段  例如  id    |
|order |否  |string | 排序方式 asc正序  desc倒序    |
|自定义字段 |否  |any | 自定义字段    |

##### 请求示例(收藏文章)
```
var data = {
	site_id: '站点id',
	type: 'collection', // 自定字段类型  区分功能
	info_id: info.value.id, // 自定字段文章id  收藏文章的id
	userId: userInfo.value.id, // 自定字段用户id  收藏文章的用户id
}
$.get('https://jzt2.china9.cn/api/collection/selMsg', data, function(res) {
	if (res.code === 200) {
		// 成功
        console.log(res.msg);
	} else {
		console.log(res.msg);
	}
})
```

##### 返回示例 

``` 
  {
    "code": 200,
	"data": [
		{
			"site_id": "6352679462e52a19f57c2d06",
			"info_id": "62dfbc508b224f79305b2de5",
			"type": "collection",
			"userId": "62dfbc508b224f793045dfsaa",
		}
	],
    "msg": "操作成功",
  }
```

---

## 产品记录列表

##### 简要描述

- 产品记录列表

##### 请求URL
- ` https://jzt2.china9.cn/api/log/goodsLog `
  
##### 请求方式
- GET 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string |站点id   |
|goods_id |是  |string |产品id   |

##### 使用示例 

 ``` 
 $.get("http://jzt2.china9.cn/api/log/goodsLog", {
 	site_id: "站点id",
	goods_id: "产品id",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```


##### 返回示例 



 ``` 
{
    "code": 200,
    "msg": "查询成功",
    "data": [
        {
            "goods_id": "65090241baf2826cf523de8d",
            "NianDu": "2023",
            "KaoHeQingKuang": "称职",
            "create_time": "2023-06-13 16:43:09",
            "update_time": "2023-06-13 16:43:09",
            "id": "65336e03e710273d06587a41"
        },
        {
            "goods_id": "65090241baf2826cf523de8d",
            "NianDu": "2022",
            "KaoHeQingKuang": "称职",
            "create_time": "2023-06-13 16:43:09",
            "update_time": "2023-06-13 16:43:09",
            "id": "65336e03e710273d06587a40"
        },
        {
            "goods_id": "65090241baf2826cf523de8d",
            "NianDu": "2021",
            "KaoHeQingKuang": "称职",
            "create_time": "2023-06-13 16:43:09",
            "update_time": "2023-06-13 16:43:09",
            "id": "65336e03e710273d06587a3f"
        },
        {
            "goods_id": "65090241baf2826cf523de8d",
            "NianDu": "2020",
            "KaoHeQingKuang": "称职",
            "create_time": "2023-06-13 16:43:09",
            "update_time": "2023-06-13 16:43:09",
            "id": "65336e03e710273d06587a3e"
        }
    ]
}

```

---

## 分类记录列表

##### 简要描述

- 分类记录列表

##### 请求URL
- ` https://jzt2.china9.cn/api/log/categoryLog `
  
##### 请求方式
- GET 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string |站点id   |
|category_id |是  |string |分类id   |

##### 使用示例 

 ``` 
 $.get("https://jzt2.china9.cn/api/log/categoryLog", {
 	site_id: "站点id",
	category_id: "分类id",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```


##### 返回示例 



 ``` 
{
    "code": 200,
    "msg": "查询成功",
    "data": [
        {
            "category_id": "650816359f3f0000a500604d",
            "NianDu": "2023",
            "KaoHeQingKuang": "合格",
            "create_time": "2023-02-23 10:22:35",
            "update_time": "2023-02-23 10:22:35",
            "id": "65336f01059bc5542a6e3c2b"
        }
    ]
}

```
