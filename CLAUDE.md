# LishengWEB 工程档案

利生集团（山东，lishengmf.com）英文国际站，Astro 静态站点，核心目标：海外面条 OEM 代加工引流。
用户开发模式：dev server 常驻 localhost:4321 实时观察；**细节修改阶段直接定位编辑、改完即告知，不扫描全文档、不开预览、不跑测试**；仅新页面/路由/import 等结构性改动跑一次 `npx astro build` 验证。

## 路由 ↔ 文件 ↔ 样式对照（2026-06-12 现状）

| 路由 | 页面文件 (src/pages/) | 专属样式 (src/styles/) |
|---|---|---|
| `/` | index.astro | index.css |
| `/company/` | company/index.astro | company-about.css |
| `/company/honors/` | company/honors.astro | company-honors.css |
| `/company/subsidiaries/` | company/subsidiaries.astro | company-subsidiaries.css |
| `/factory/lab/` | factory/lab.astro | factory-lab.css |
| `/factory/production/` | factory/production.astro | factory-production.css |
| `/factory/certificates/` | factory/certificates.astro | factory-certificates.css |
| `/factory/tour/` | factory/tour.astro | factory-tour.css |
| `/services/` | services.astro | services.css |
| `/services/customization/` | services/customization.astro | customization.css |
| `/products/` | products.astro | products.css |
| `/products/specifications/` | products/specifications.astro | products-specs.css |
| `/news/` | news.astro | news.css |
| `/news/{id}/`（58 篇详情，自动生成） | news/[id].astro（动态路由） | news-article.css |
| `/contact/` | contact.astro | contact.css |

共享样式：global.css（令牌）、header.css、footer.css、subpage.css（子页 hero + page-section）、contact-cta.css（CTA 组件自带）。
**约定：每页一个独立 CSS 文件，改一页不影响别页**；视觉规范见 DESIGN-SPEC.md（红 #d71920 / 金 #e39a24、Georgia 衬线标题、直角、米色 #f7f0e6 卡片）。
逐页精修中的页面级覆盖模式（写在各页 CSS，参考 factory-certificates.css）：① 章节标题单行 `.page-section-inner h2 { max-width: none }`（honors、certificates 已用）；② 区块密集页统一节奏 `.page-section { padding: 48px 0 }`；③ 同底色相邻区块加 `has-divider` 类出内容区等宽细线；④ company-cta 默认透明、hover 米色。
**certificates 页已精修完成**（2026-06-12）：顺序为国家荣誉→行业地位（白底，末尾 CTA）→ISO/HACCP/IQNET 证书卡（灰底，点图开 PDF）→绿色食品画廊（灰底+分割线）。

## 导航结构（Header.astro navItems）

- Home `/`
- Company ▾：About `/company/`、Honors & Awards `/company/honors/`、Subsidiaries `/company/subsidiaries/`
- Factory ▾（主项点击→ `/factory/production/`）：Smart Factory、Food Lab、Product Certifications、Factory Tour（Smart Factory 居首，2026-06-12 调整）
- Services ▾：OEM Manufacturing `/services/`、Product Customization `/services/customization/`
- Products ▾：Noodle/Flour/Partner（`/products/#hash` 直达 Tab）、Sample Specifications
- News `/news/`、Contact `/contact/`
- 高亮规则：带下拉的主项用 `navActive`（子项精确匹配），Company 与 Factory 共享 `/company/` 前缀也不会串扰；顶级项 17px、整块可点；Request a Quote 按钮 hover 变红。
- 移动端（≤900px，2026-06-12 定稿）：所有 hover/focus-within 展开规则锁在 `@media (min-width: 901px)`（不要用 hover:hover，桌面缩窗测试会失效）；展开菜单右对齐（对齐汉堡按钮）、高度由内容撑开（max-height 兜底滚动）、`nav-sweep` clip-path 上→下扫入 0.35s；点开时 header 加 `menu-open` 类瞬时同色（site.js 同步切换）；菜单内禁 tap-highlight 和 focus outline；语言项 `.nav-item.lang-switch` 移动端隐藏（无入口，待 i18n）。

## 可复用组件（src/components/）

- ProductCard.astro：产品卡 + `<dialog>` 弹窗（样式/脚本自包含），products.astro 内 65 款产品实例
- NewsCard.astro：新闻卡（自带样式），news.astro 内 58 张，复制块即可加新闻
- ContactCta.astro：米色 CTA 带（props：kicker/title/text/buttonLabel/buttonHref/secondaryLabel/secondaryHref）；Footer 默认渲染（含 Customize Your Product 小字链接），`<Footer showCta={false} />` 关闭（news 列表/详情页已关闭）
- Header / Footer / HeroSlider

## 数据与资料（写文案前先查）

- LISHENG-COMPANY-PROFILE.md：公司全档案（概况/历程/8 家子公司/荣誉/口径差异表/素材映射）。**统一口径：日处理小麦 4,500 吨、日产挂面 600 吨、11 家公司（6 生产 + 3 收储）、1300 员工、年收入 30 亿**
- LISHENG-NEWS-ARCHIVE.md：58 条官网新闻全集（中文正文 + 英文标题对照）
- src/data/news/{id}.md：单篇新闻源（frontmatter: title/date/source/cover），新增 md 即自动生成详情页
- 官网抓取：仅 HTTP；有 wtime/wtoken cookie 防爬门槛，需两步握手
- 图片库（2026-06-12 调整后）：public/images/company/{about,about/honor,subsidiaries,honors}/、factory/{lab,production,certificates/{certificate,green}}/（factory 根目录另有散图；certificate/ 内为 ISO/HACCP/IQNET PDF + 同名 -preview.jpg 预览图，green/ 为 5 张绿色食品证书扫描件，均已改为 URL 安全文件名）、products/{noodles1,flour1,customization1}/、news/、main/、icon/。**替换图片直接覆盖 public 下页面引用的同名文件**（不要只改源素材夹）；注意旧相机图可能损坏或带 EXIF 旋转，必要时用 PIL 重编码烘焙方向

## 交互脚本要点

- public/scripts/site.js：header 滚动态、hero 轮播、产品 Tab（data-product-tab/panel）、history 轮播
- products.astro 内联脚本：hash → Tab 激活；news.astro：8 条/页翻页 + sessionStorage 页码记忆（仅 `?from=article` 返回时恢复）+ 网格高度只增不减防滚动跳动；customization.astro：选项按钮多选 toggle（点击变红，无存储）

## 待办 / 已知事项

- 首页 About 段落仍写 "7,000 tons"（官网无此数，应改 4,500~4,600）；History 区年份已修正
- Footer 的 Privacy Policy / Terms 为占位死链
- 天宇彩印成立年份未知（子公司卡无年份）；瑞利/天宇配图为 production 素材暂代
- 首页品牌墙（Our Brands）整段已 HTML 注释隐藏，待素材
- "欢迎客户验厂"等服务承诺（services/factory tour 页）待公司确认
- 规格页（specifications）的理化数值为行业典型值，待品控部核定
- Header 最右侧语言切换（EN ▾ 中文）为占位（`href="#"`，`data-lang="zh"` 钩子已留）；多语言方案已定：Astro i18n + `/zh/` 页面树复制式，待内容整理好后实施；移动端语言入口未做
