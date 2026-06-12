# 利生集团国际官网 · 网页设计规范 (Design Spec)

> 基准来源：首页精修区块 —— 公司概览+数据统计、OEM 精选板块、About（研发/工厂）、产品 Tab。
> 新页面/新模块编码时一律遵循本规范。

---

## 1. 设计令牌 (Design Tokens)

### 1.1 颜色

| Token | 值 | 用途 |
|---|---|---|
| `--accent-red` | `#d71920` | 主色：CTA 按钮、标题装饰线、Tab 激活态、hover 高亮 |
| `--accent-gold` | `#e39a24` | 辅色：竖向装饰条、按钮描边、卡片链接下划线 |
| 深金（kicker） | `#b56c10` | 小型眉题文字、米色卡片内的数字标题 |
| 卡片链接金 | `#d98410` | feature-card 内文字链接 |
| `--text-dark` | `#303030` | 主标题、强调文字 |
| 标题深灰（衬线标题） | `#343434` | Georgia 衬线大标题 |
| `--text-muted` | `#626262` | 正文、说明文字 |
| 正文灰（备选） | `#555` | 概览/OEM 区正文 |
| `--soft-gray` | `#f6f6f6` | 浅灰分区背景 |
| 米色 | `#f7f0e6` | 重点内容底色：OEM 大卡片、数据小卡片、CTA 区 |
| 白 | `#fff` | 默认分区背景 |
| Footer 墨绿 | `#2A3331` | 仅 footer |

**背景节奏**：分区背景按 白 → 白 → 米色卡片(在白底上) → 白 → 浅灰 交替，靠卡片底色区分层次，不大面积涂色。

### 1.2 字体

| 用途 | 字体 | 规则 |
|---|---|---|
| 正文 / 数据数字 / 按钮 / 无衬线大标题 | `Arial, Helvetica, sans-serif` | 全站默认 |
| 衬线标题（概览 h2、卡片 h3、子板块 h3） | `Georgia, "Times New Roman", serif` | 营造老字号质感 |
| 数字 | Arial + `font-variant-numeric: lining-nums tabular-nums` | 统计数字必加 |

**两类标题的使用规律**：
- **无衬线 800**：板块主标题（About h2、Products/News 区 section-heading）—— 配红色装饰短线
- **Georgia 衬线 700**：叙述性/内容型标题（概览 h2、OEM 卡片 h3、研发/工厂 h3、子公司 h2）—— 配深灰装饰短线或不带线

### 1.3 字号体系（桌面端）

| 层级 | 字号 | 行高 | 字重 |
|---|---|---|---|
| H2 板块主标题（无衬线） | `clamp(42px, 4vw, 58~62px)` | 1 ~ 1.15 | 800 |
| H2 衬线大标题 | `clamp(38px, 4vw, 58px)` | 1.15 | 700 |
| H3 卡片标题（衬线） | `32px` 固定 | 1.18 | 700(默认) |
| H3 子板块标题（衬线） | `clamp(28px, 2.6vw, 40px)` | 1.12 | 700(默认) |
| 统计大数字 | `clamp(42px, 4vw, 62px)` | 1 | 800 |
| 统计单位 (Billion/Tons) | `clamp(21px, 1.85vw, 29px)` | 0.86 | 700 |
| 小卡片数字标题 | `22px` | 1 | 800 |
| 正文（About 区） | `18px` | 1.7 | 400 |
| 正文（概览/研发/工厂） | `17px` | 1.65 ~ 1.66 | 400 |
| 正文（卡片内） | `16px` | 1.58 ~ 1.62 | 400 |
| 统计说明 dd | `17px` | 1.35 | 700 |
| 小卡片说明 dd | `15px` | 1.5 | 400 |
| 眉题 kicker | `13~15px` | — | 800，全大写 |
| 按钮 / Tab | `15~16px` | 1.2 | 700~800，CTA 全大写 |
| 产品卡标题 | `18px` | 1.25 | 700 |

### 1.4 布局容器

```css
--page-max: 1280px;
--page-gutter: 72px;            /* ≤900px 时改为 32px */
width: min(var(--page-max), calc(100% - var(--page-gutter)));
margin: 0 auto;
```
- 窄文本容器（概览文案）：`min(920px, calc(100% - 48px))`
- 断点：`900px`（主断点）、`700px`、`380px`
- 移动端容器：`min(100% - 32px, 560~620px)`

---

## 2. 间距设计规律（核心节奏）

### 2.1 模块（section）间距

| 规则 | 值 |
|---|---|
| 分区上 padding | 56 ~ 104px（重要区块用 86~104，普通用 56~78） |
| 分区下 padding | 48 ~ 112px |
| 移动端分区 padding | 上下各压缩约 30%（50~76px） |
| 区块内大子板块间隔（如 研发→工厂） | `margin-top: 56px` |

实测值参考：概览文案 `padding: 86px 0 78px`；OEM 区 `74px 0 112px`；About 区 `104px 0 76px`；产品区 `56px 0 48px`。

### 2.2 标题装饰短线（统一手法，用 `::after`）

| 场景 | 尺寸 | 颜色 | 线上间距 | 线下间距 |
|---|---|---|---|---|
| 板块主标题 H2 | `48~50px × 3px` | `--accent-red` | 20~22px | 28px（居中标题线后无内容则 0） |
| 子板块 H3 / 子公司 H2 | `46px × 2~3px` | `#303030` | 18px | 24px |

编码模板：
```css
h2::after { content:""; display:block; width:48px; height:3px;
  margin:22px 0 28px; background:var(--accent-red); }
```

### 2.3 文字段落间距

| 关系 | 间距 |
|---|---|
| 大标题 → 首段正文 | 28 ~ 32px（概览 32px） |
| 卡片标题 h3 → 正文 | 18px |
| 段落 p + p / span + span | 12 ~ 14px |
| 眉题 kicker → 标题 | 12px（kicker 的 margin-bottom） |
| 数字 dt → 说明 dd | 10px |
| 正文 → 按钮/CTA | 34px（标准值；卡片内链接 22px，列表按钮组 34px） |
| 卡片图片 → 文字区 | 28px（feature-card padding-top） |

**口诀**：段间 12–14；题文 18；大题文 32；文到按钮 34。

### 2.4 网格 gap

| 级别 | 值 | 场景 |
|---|---|---|
| 大双栏 | `56 ~ 64px` | OEM 图文双栏 56、About 双栏 `56px 64px` |
| 中 | `28 ~ 34px` | 统计 3 列 34、产品 4 列 28 |
| 小 | `14 ~ 22px` | 按钮组 14、小卡片 18、feature 卡片 22、媒体拼图 18 |
| 移动端 | 统一降到 18 ~ 28px | 双栏全部塌缩为单栏 |

---

## 3. 各模块规范

### 3.1 公司概览 + 数据统计

```
.overview-copy  容器 min(920px, 100%-48px)，padding 86px 0 78px
  h2  Georgia, clamp(38px,4vw,58px), lh1.15, w700, #343434, max-width 760px
  p   margin-top 32px, #555, 17px/1.65, max-width 820px

.overview-stats  grid, 行间 gap 28px
.stats-row       3 列等分, gap 34px, 容器 page-max
.stat-item       border-left: 5px solid var(--accent-gold); padding-left: 22px;
                 grid-template-rows: 62px auto; min-height 96px
  dt 数字        clamp(42px,4vw,62px), w800, tabular-nums, 底对齐
  单位           clamp(21px,1.85vw,29px), w700, 与数字间 gap 10px
  dd 说明        margin-top 10px, --text-muted, 17px/1.35, w700
```
移动端(≤700px)：2 列，gap `28px 18px`，左边线 4px / padding-left 14px，数字 `clamp(34px,11vw,44px)`，dd 降为 14px w400。

### 3.2 OEM 精选板块

```
.featured-links   page-max 容器, padding 74px 0 112px

.featured-report  大卡片：bg #f7f0e6, padding 42px 52px, min-height 318px
                  grid: minmax(360px,.96fr) / minmax(420px,1.08fr), gap 56px, 居中对齐
  图片            aspect-ratio 1.42, 阴影 0 8px 20px rgba(42,47,43,.18)（全站唯一投影场景）
  h3              Georgia 32px/1.18, #343434
  p               margin-top 18px, #555, 16px/1.58
  .report-actions grid gap 14px, margin-top 34px
  .report-action  描边按钮：min-height 58px, padding 0 18px 0 22px,
                  border 2px solid var(--accent-gold), bg rgba(255,255,255,.42),
                  15px w800 大写, 两端对齐 + 金色箭头(26px)
                  hover: 整体填充金色, 文字 #2f312f, translateY(-1px)

.feature-card-grid  2 列, gap 22px, margin-top 33px
.feature-card     img aspect 1.62; 文字区 padding-top 28px
  h3              Georgia 32px/1.18
  p               margin-top 18px, 16px/1.58
  a 链接          margin-top 22px, #d98410, Georgia 17px w700,
                  border-bottom 2px solid #e39a24, 无下划线
```
移动端：全部单栏；大卡 padding 24px、gap 28px；卡片网格 gap 56px、margin-top 42px；h3 30px。

### 3.3 About（含研发/工厂子板块）

```
.about-section  padding 104px 0 76px
.about-inner    grid: minmax(360px,1fr) / minmax(420px,1.08fr), gap 56px 64px

左栏（logo 图 + 子公司列表，纵向 gap 56px）
  .subsidiary-list  右对齐
    h2        Georgia clamp(28px,2.6vw,40px)/1.12
    h2::after 46×2px #303030, margin 18px 0 24px auto
    li        16px w700/1.35, 列表 gap 13px

右栏 .about-copy（垂直居中）
  h2          无衬线 clamp(42px,4.2vw,62px)/1, w800
  h2::after   48×3px var(--accent-red), margin 22px 0 28px
  p           --text-muted 18px/1.7; p+p 间 14px
  .about-more 胶囊按钮：radius 999px, 高 52px, min-width 158px,
              margin-top 34px, 红底白字 16px w800 大写

子板块 .about-rd / .about-factory（跨双栏，--about-rd-gutter: 46px）
  容器        padding 46px, 研发块与上方间 margin-top 18px, 工厂块 margin-top 56px
  金色竖条    ::before/::after 5px 宽，贴齐外缘（left/right: -46px）
              规律：研发块在左缘，工厂块在右缘，左右交替
  布局        grid: minmax(320px,.86fr) / minmax(360px,1fr), gap 36px 48px
  kicker      #b56c10 13px w800 大写, margin-bottom 12px
  h3          Georgia clamp(28px,2.6vw,40px)/1.12
  h3::after   46×3px #303030, margin 18px 0 24px
  正文 span   --text-muted 17px/1.66, max-width 520px; span+span 间 12px
  媒体拼图    grid .72fr/1fr 两行, gap 18px, 高 clamp(360px,32vw,520px)
              第 1 张图占满左列两行，2、3 张右列各一行，object-fit cover
  数据小卡    跨整行 3 列, gap 18px, 单卡 padding 22px 24px, bg #f7f0e6
    dt        #b56c10 22px/1 w800
    dd        margin-top 10px, --text-muted 15px/1.5
```
移动端：全部单栏；gutter 22px、padding 28px 22px；拼图改单列，图 aspect 1.48。

### 3.4 产品 Tab

```
.products-section  padding 56px 0 48px, page-max 容器
.section-heading   居中 h2 无衬线 clamp(42px,4vw,58px)/1 w800 + 红线 50×3px (margin 20px auto 0)

.product-tabs      居中 flex, gap 16px, margin-top 38px
  button           min-width 178px, min-height 48px, padding 0 22px,
                   border 1px solid #c9c9c9, 白底 #303030, 16px w700, 直角
  hover / .active  红底白字红边（border-color/bg 均 --accent-red）

.product-panels    margin-top 42px
.product-panel     4 列, gap 28px
.product-card      居中
  img              aspect-ratio 1 (正方形), object-fit cover
  h3               margin 22px auto 0, 18px/1.25 w700, max-width 270px, min-height 58px

.products-more     更多按钮：178×54px, 红底白字, 16px w800 大写, margin 26px auto 0
```
移动端：Tab 两个一行 (`flex:1 1 calc(50% - 10px)`, 14px)；产品 2 列 gap 18px；卡标题 15px。

---

## 4. 按钮 / 交互规范

| 类型 | 样式 | 场景 |
|---|---|---|
| 主 CTA（块状） | 红底白字，`178×54px`，直角，16px w800 大写 | 产品/新闻"更多" |
| 主 CTA（胶囊） | 红底白字，高 52~54px，`border-radius:999px` | About more、联系 CTA |
| 描边按钮 | 2px 金色描边 + 半透明白底，hover 填充金色 | OEM 链接列表 |
| Tab | 1px `#c9c9c9` 描边白底，激活红底白字 | 产品分类 |
| 文字链接 | 金色文字 + 2px 金色下边线，Georgia w700 | 卡片内"了解更多" |

**过渡统一**：`transition: 0.2s ease`（color/border/background/transform）；hover 位移仅 `translateY(-1px ~ -2px)`。
**圆角原则**：全站直角；唯一例外是胶囊 CTA (999px) 和圆形导航按钮 (50%)。
**hover 文字色**：链接 hover → `--accent-red`；footer 链接 hover → `--accent-gold`。

---

## 5. 编码注意事项

1. 新增颜色一律先定义为 `:root` CSS 变量，禁止散落硬编码。建议把 `#b56c10`、`#f7f0e6`、`#343434`、`#555` 也提升为变量（现状是硬编码）。
2. 标题装饰线统一用 `::after`，不要用 `<hr>` 或 border。
3. 数字展示必须加 `font-variant-numeric: lining-nums tabular-nums`。
4. 图片统一 `display:block; object-fit:cover` + 固定 `aspect-ratio`，由容器控制裁切。
5. 响应式写法：容器宽用 `min()`，字号用 `clamp()`，主断点 900px、文字密集区补 700px。
6. ⚠️ 已知不一致：header 默认 `--header-accent: #7bcf78`（绿色），与红金体系冲突，首页未覆盖——编码时应统一改为 `--accent-red` 或 `--accent-gold`。
