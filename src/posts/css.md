---
date: 2024-08-03
category:
- xposed
tag:
- Hook
- Xposed
archive: true
---

# CSS样式学习

## 1 CSS选择器
### 1.1 基本选择器

<details>
<summary>通配选择器，选择所有元素</summary>
选择器只有 * 一种

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>css教学</title>
    </head>
    <body>
        <p>这是一个段落</p>
    </body>
    <style>
        *{
            color:red
        }
    </style>
</html>

```

</details>

<details>
<summary>类型选择器，选择所有指定类型的元素</summary>
选择器使用元素名称，如 p, h1, div 等

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>css教学</title>
    </head>
    <body>
        <h1>这是一个标题</h1>
        <p>这是一个段落</p>
    </body>
    <style>
        p {
            color: blue;
        }
        h1 {
            color: green;
        }
    </style>
</html>

```

</details>

<details>
<summary>类选择器，选择特定类名的元素</summary>
选择器使用 .className

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>css教学</title>
    </head>
    <body>
        <p class="highlight">这是一个段落</p>
        <p>这是另一个段落</p>
    </body>
    <style>
        .highlight{
            color:red
        }
    </style>
</html>

```

</details>

<details>
<summary>ID选择器，选择特定ID的元素</summary>
选择器使用 #id 形式

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>css教学</title>
    </head>
    <body>
        <p id="unique">这是一个带有ID的段落</p>
    </body>
    <style>
        #unique {
            color: blue;
        }
    </style>
</html>

```

</details>



### 1.2 复合选择器
<details>
<summary>交集选择器，选择同时满足多个条件的元素</summary>
选择器使用 .class1.class2 形式

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>css教学</title>
    </head>
    <body>
        <p class="class1 class2">这是一个同时属于class1和class2的段落</p>
        <p class="class1">这是一个只属于class1的段落</p>
        <p class="class2">这是一个只属于class2的段落</p>
    </body>
    <style>
        .class1.class2 {
            color: red;
        }
    </style>
</html>

```

</details>

<details>
<summary>并集选择器，选择多个元素</summary>
选择器由多个选择器通过逗号分隔组成

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>css教学</title>
    </head>
    <body>
        <p>这是一个段落</p>
        <div>这是一个div</div>
        <span>这是一个span</span>
    </body>
    <style>
        p, div, span {
            color: blue;
        }
    </style>
</html>

```

</details>

<details>
<summary>后代选择器，选择所有某元素的后代元素</summary>
选择器是由两个元素名之间的空格组成

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>css教学</title>
    </head>
    <body>
        <div>
            <p>这是一个段落</p>
            <span>这是一个span</span>
        </div>
        <p>这是另一个段落</p>
    </body>
    <style>
        div p {
            color:blue
        }
    </style>
</html>

```

</details>

<details>
<summary>子代选择器，选择直接子元素</summary>
选择器使用 `>` 号

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>css教学</title>
    </head>
    <body>
        <div class="parent">
            <p>这是一个段落</p>
            <span>这是一个span</span>
            <div>
                <p>这是另一个段落</p>
            </div>
        </div>
    </body>
    <style>
        .parent > p {
            color: red;
        }
        .parent > span {
            color: blue;
        }
    </style>
</html>

```

</details>

<details>
<summary>兄弟选择器，选择同一父元素下的兄弟元素</summary>
选择器使用 ~ 符号

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>css教学</title>
    </head>
    <body>
        <h1>标题</h1>
        <p>这是一个段落</p>
        <p>这是另一个段落</p>
    </body>
    <style>
        h1 ~ p {
            color: blue;
        }
    </style>
</html>

```

</details>

<details>
<summary>属性选择器，选择具有特定属性的元素</summary>
选择器可以是 [attribute]、[attribute=value]、[attribute~=value]、[attribute|=value]、[attribute^=value]、[attribute$=value] 或 [attribute*=value]

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>css教学</title>
    </head>
    <body>
        <p title="example">这是一个带有 title 属性的段落</p>
        <p>这是一个没有 title 属性的段落</p>
    </body>
    <style>
        [title]{
            color: red;
        }
    </style>
</html>
```

</details>

<details>
<summary>动态伪类选择器，选择元素的不同状态</summary>
动态伪类选择器包括 :hover、:active、:focus 等

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>css教学</title>
    </head>
    <body>
        <button>悬停或点击我</button>
        <input type="text" placeholder="点击我">
    </body>
    <style>
        button:hover {
            background-color: yellow;
        }
        
        button:active {
            background-color: orange;
        }
        
        input:focus {
            border-color: blue;
        }
    </style>
</html>

```

</details>

<details>
<summary>结构伪类选择器，选择特定位置的元素</summary>
选择器包括 :first-child、:last-child、:nth-child(n) 等

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>css教学</title>
    </head>
    <body>
        <ul>
            <li>第一项</li>
            <li>第二项</li>
            <li>第三项</li>
            <li>第四项</li>
        </ul>
    </body>
    <style>
        /* 选择第一个子元素 */
        li:first-child {
            color: red;
        }
        
        /* 选择最后一个子元素 */
        li:last-child {
            color: blue;
        }
        
        /* 选择第三个子元素 */
        li:nth-child(3) {
            color: green;
        }
    </style>
</html>

```

</details>

<details>
<summary>否定伪类选择器，选择不符合特定条件的元素</summary>
选择器使用 :not() 伪类

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>css教学</title>
    </head>
    <body>
        <p>这是一个段落</p>
        <p class="highlight">这是一个高亮的段落</p>
        <div>这是一个 div 元素</div>
    </body>
    <style>
        p:not(.highlight) {
            color: blue;
        }
    </style>
</html>

```

</details>

<details>
<summary>目标伪类选择器，选择被锚链接指向的目标元素</summary>
选择器是 :target

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>css教学</title>
    </head>
    <body>
        <a href="#section1">跳到第一个部分</a>
        <a href="#section2">跳到第二个部分</a>

        <div id="section1">
            <h2>第一个部分</h2>
            <p>这是第一个部分的内容。</p>
        </div>

        <div id="section2">
            <h2>第二个部分</h2>
            <p>这是第二个部分的内容。</p>
        </div>
    </body>
    <style>
        :target {
            background-color: yellow;
        }
    </style>
</html>

```

</details>

<details>
<summary>语言伪类选择器，选择特定语言的元素</summary>
选择器是 :lang() 形式

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>css教学</title>
    </head>
    <body>
        <p lang="en">This is a paragraph in English.</p>
        <p lang="zh">这是一个中文段落。</p>
    </body>
    <style>
        :lang(en) {
            color: blue;
        }
        :lang(zh) {
            color: red;
        }
    </style>
</html>
```

</details>

<details>
<summary>伪元素选择器，选择特定元素的部分内容</summary>
选择器有 ::before 和 ::after 两种

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>css教学</title>
    </head>
    <body>
        <p>这是一个段落</p>
    </body>
    <style>
        p::before {
            content: "开始: ";
            color: blue;
        }
        
        p::after {
            content: " :结束";
            color: green;
        }
    </style>
</html>

```

</details>

### 1.3 CSS选择器优先级

CSS（层叠样式表）中的选择器优先级是决定哪个样式规则最终应用于元素的关键因素。了解选择器优先级可以帮助我们更好地控制页面样式，避免不必要的样式冲突。

#### 1. 优先级层级（从高到低）

1. `!important`
2. 内联样式
3. ID选择器
4. 类选择器、属性选择器、伪类
5. 元素选择器、伪元素
6. 通用选择器（*）

#### 2. 优先级计算方法

优先级通常用一个四位数字来表示，格式为：(a, b, c, d)

- a: 内联样式的数量
- b: ID选择器的数量
- c: 类、属性和伪类选择器的数量
- d: 元素和伪元素选择器的数量

例如：
- `#nav .list li a:hover` 的优先级为 (0, 1, 2, 2)
- `body #content .data img:hover` 的优先级为 (0, 1, 2, 2)

#### 3. 优先级比较规则

- 从左到右比较四位数字
- 如果相等，则继续比较下一位
- 如果所有数字都相等，则后声明的样式优先

#### 4. 特殊情况

- `!important` 声明会覆盖所有其他声明
- 内联样式（写在HTML元素的style属性中）优先级高于外部样式表
- 继承的样式优先级最低

#### 5. 示例

```css
/* 优先级: 0,1,1,1 */
#content .title h1 {
  color: blue;
}

/* 优先级: 0,0,2,1 */
.main-content .title h1 {
  color: red;
}

/* 优先级: 0,0,0,3 */
html body main h1 {
  color: green;
}
```

在上面的例子中，`#content .title h1` 的优先级最高，因此h1元素的颜色将是蓝色。

#### 6. 最佳实践

- 避免过度使用 `!important`
- 尽量使用类选择器，避免ID选择器
- 保持选择器简洁，避免过长的选择器链
- 利用CSS的层叠性质，合理组织样式规则

#### 7. 工具

可以使用在线工具计算和比较CSS选择器的优先级，例如：
- [Specificity Calculator](https://specificity.keegan.st/)
- [CSS Specificity Graph Generator](https://jonassebastianohlsson.com/specificity-graph/)

理解和掌握CSS选择器优先级对于创建可维护和可预测的样式表至关重要。它能帮助开发者更好地组织CSS代码，减少样式冲突，提高开发效率。

## 2 CSS 伸缩盒模型 (Flexbox)

Flexbox 是一种一维的布局模型,它提供了强大而灵活的方式来分配空间和对齐内容。

### 基本概念

- Flex 容器 (Flex Container): 设置了 `display: flex` 或 `display: inline-flex` 的元素
- Flex 项目 (Flex Items): Flex 容器的直接子元素
- 主轴 (Main Axis): Flex 容器的主要轴线,默认从左到右
- 交叉轴 (Cross Axis): 垂直于主轴的轴线

### Flex 容器属性

#### display

```css
.container {
  display: flex; /* 或 inline-flex */
}
```

#### flex-direction

定义主轴的方向。

```css
.container {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

#### flex-wrap

定义 Flex 项目是否换行。

```css
.container {
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

#### flex-flow

`flex-direction` 和 `flex-wrap` 的简写。

```css
.container {
  /* 只设置 flex-direction */
  flex-flow: row;
  flex-flow: row-reverse;
  flex-flow: column;
  flex-flow: column-reverse;

  /* 只设置 flex-wrap */
  flex-flow: nowrap;
  flex-flow: wrap;
  flex-flow: wrap-reverse;

  /* 同时设置 flex-direction 和 flex-wrap */
  flex-flow: row nowrap;
  flex-flow: row wrap;
  flex-flow: row wrap-reverse;
  flex-flow: row-reverse nowrap;
  flex-flow: row-reverse wrap;
  flex-flow: row-reverse wrap-reverse;
  flex-flow: column nowrap;
  flex-flow: column wrap;
  flex-flow: column wrap-reverse;
  flex-flow: column-reverse nowrap;
  flex-flow: column-reverse wrap;
  flex-flow: column-reverse wrap-reverse;
}

```

#### justify-content

定义 Flex 项目在主轴上的对齐方式。

```css
.container {
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
}
```

#### align-items

定义 Flex 项目在交叉轴上的对齐方式。

```css
.container {
  align-items: stretch | flex-start | flex-end | center | baseline;
}
```

#### align-content

定义多行 Flex 项目在交叉轴上的对齐方式。

```css
.container {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

### Flex 项目属性

#### order

定义 Flex 项目的排列顺序。

```css
.item {
  order: <integer>; /* 默认为 0 */
}
```

#### flex-grow

定义 Flex 项目的增长系数。

```css
.item {
  flex-grow: <number>; /* 默认为 0 */
}
```

#### flex-shrink

定义 Flex 项目的收缩系数。

```css
.item {
  flex-shrink: <number>; /* 默认为 1 */
}
```

#### flex-basis

定义 Flex 项目在主轴方向上的初始大小。

```css
.item {
  flex-basis: <length> | auto; /* 默认为 auto */
}
```

#### flex

`flex-grow`, `flex-shrink` 和 `flex-basis` 的简写。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ];
}
```

#### align-self

允许单个 Flex 项目有与其他项目不一样的对齐方式。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

### 常用 Flex 布局技巧

1. 居中对齐：
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

2. 等宽多列布局：
```css
.container {
  display: flex;
}
.item {
  flex: 1;
}
```

3. 粘性页脚：
```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
}
```

4. 响应式导航栏：
```css
@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
  }
}
```