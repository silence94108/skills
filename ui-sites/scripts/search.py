#!/usr/bin/env python3
"""UI/UX 灵感网站搜索工具"""

import csv
import argparse
import io
import os
import sys
from collections import Counter

# Windows 环境下强制 UTF-8 输出，避免 GBK 编码错误
if sys.stdout.encoding != "utf-8":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
if sys.stderr.encoding != "utf-8":
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(SCRIPT_DIR, "..", "data", "sites.csv")

CATEGORY_LABELS = {
    "inspiration": "设计灵感",
    "color": "配色工具",
    "typography": "字体排版",
    "animation": "动效动画",
    "design-system": "设计系统",
    "component": "组件库",
    "aggregate": "聚合平台",
}

SUBCATEGORY_LABELS = {
    "ui-general": "综合 UI",
    "web": "Web 设计",
    "landing": "Landing Page",
    "mobile": "移动端",
    "flow": "用户流程",
    "color-palette": "配色方案",
    "color-contrast": "对比度检查",
    "font-library": "字体库",
    "font-pairing": "字体搭配",
    "font-tool": "排版工具",
    "motion-tool": "动画工具",
    "motion-inspiration": "动效灵感",
    "enterprise-ds": "企业级 DS",
    "open-source-ds": "开源 DS",
    "component-lib": "组件库",
    "curated": "精选合集",
}


def load_sites():
    sites = []
    with open(CSV_PATH, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            sites.append(row)
    return sites


def list_categories(sites):
    cat_counter = Counter(s["category"] for s in sites)
    sub_counter = Counter(s["subcategory"] for s in sites)

    print(f"{'='*60}")
    print(f"  UI/UX 灵感网站资源库 — 共 {len(sites)} 个网站")
    print(f"{'='*60}")
    print()
    print("📂 大类 (--category)")
    print(f"{'─'*40}")
    for cat, count in sorted(cat_counter.items(), key=lambda x: -x[1]):
        label = CATEGORY_LABELS.get(cat, cat)
        print(f"  {cat:<20} {label:<10} ({count})")
    print()
    print("📁 细分类 (--sub)")
    print(f"{'─'*40}")
    for sub, count in sorted(sub_counter.items(), key=lambda x: -x[1]):
        label = SUBCATEGORY_LABELS.get(sub, sub)
        print(f"  {sub:<22} {label:<12} ({count})")
    print()


def search_sites(sites, keyword):
    keyword_lower = keyword.lower()
    results = []
    for s in sites:
        searchable = f"{s['name']} {s['description']} {s['keywords']}".lower()
        if keyword_lower in searchable:
            results.append(s)
    return results


def filter_by_category(sites, category):
    return [s for s in sites if s["category"] == category]


def filter_by_subcategory(sites, subcategory):
    return [s for s in sites if s["subcategory"] == subcategory]


def filter_by_pricing(sites, pricing):
    return [s for s in sites if s["pricing"] == pricing]


def print_results(results, limit=None):
    if not results:
        print("❌ 没有找到匹配的网站")
        return

    if limit:
        results = results[:limit]

    print(f"\n🔍 找到 {len(results)} 个网站:\n")
    for i, s in enumerate(results, 1):
        cat_label = CATEGORY_LABELS.get(s["category"], s["category"])
        sub_label = SUBCATEGORY_LABELS.get(s["subcategory"], s["subcategory"])
        pricing_icon = {"free": "🆓", "freemium": "💎", "paid": "💰"}.get(
            s["pricing"], ""
        )
        print(f"  {i}. {s['name']} {pricing_icon}")
        print(f"     {s['url']}")
        print(f"     {s['description']}")
        print(f"     [{cat_label} > {sub_label}]")
        if s.get("analysis"):
            print(f"     ---")
            print(f"     {s['analysis']}")
        print()


def main():
    parser = argparse.ArgumentParser(
        description="UI/UX 灵感网站搜索工具",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  python search.py --list              列出所有分类
  python search.py "配色"              搜索关键词
  python search.py --category color    按大类过滤
  python search.py --sub landing       按细分类过滤
  python search.py --pricing free      按定价过滤
  python search.py --category animation -n 3  组合查询
        """,
    )
    parser.add_argument("keyword", nargs="?", help="搜索关键词")
    parser.add_argument("--list", action="store_true", help="列出所有分类和数量")
    parser.add_argument("--category", "-c", help="按大类过滤")
    parser.add_argument("--sub", "-s", help="按细分类过滤")
    parser.add_argument("--pricing", "-p", help="按定价过滤 (free/freemium/paid)")
    parser.add_argument("-n", type=int, help="限制结果数量")
    parser.add_argument("--all", "-a", action="store_true", help="显示所有网站")

    args = parser.parse_args()

    sites = load_sites()

    if args.list:
        list_categories(sites)
        return

    results = sites

    if args.category:
        results = filter_by_category(results, args.category)
    if args.sub:
        results = filter_by_subcategory(results, args.sub)
    if args.pricing:
        results = filter_by_pricing(results, args.pricing)
    if args.keyword:
        results = search_sites(results, args.keyword)

    if not args.keyword and not args.category and not args.sub and not args.pricing and not args.all:
        list_categories(sites)
        return

    print_results(results, args.n)


if __name__ == "__main__":
    main()
