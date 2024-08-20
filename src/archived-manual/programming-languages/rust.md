---
date: 2024-08-09
category:
- 编程语言
tag:
- rust
archive: true
---

# Rust 编程语言

Rust 是一门开源的编程语言，由 Mozilla 开发，其设计目标是提供一种现代、简洁、安全、并发的编程语言。Rust 编译器可以保证内存安全，并提供自动内存管理，让开发者不用担心内存管理，从而可以专注于业务逻辑的实现。

## Cargo.toml

Cargo 是 Rust 的构建系统，它可以自动管理项目的依赖，并提供编译、测试、打包等功能。Cargo.toml 是 Cargo 的配置文件，它定义了项目的依赖、名称、版本、作者、描述、分类、关键字、许可证、包的类型、默认的编译目标等信息。


```toml
[package]
name = "rust-demo" # 项目名称
version = "0.1.0" # 项目版本
authors = ["wangyiheng <<EMAIL>>"] # 作者信息
edition = "2021" # Rust 版本，推荐使用最新的稳定版
description = "A brief description of your project" # 项目简介
license = "MIT OR Apache-2.0" # 许可证
repository = "https://github.com/yourusername/rust-demo" # 代码仓库地址
homepage = "https://your-project-homepage.com" # 项目主页
documentation = "https://docs.rs/rust-demo" # 文档链接
readme = "README.md" # README 文件路径
keywords = ["demo", "example", "rust"] # 关键词，用于 crates.io 搜索
categories = ["development-tools::testing"] # 分类，参考 crates.io 的分类
# 如果您的项目是一个可执行文件而不是库，可以添加：
# default-run = "main" # 指定默认运行的二进制文件

# 如果您的项目需要特定的 Rust 版本，可以添加：
rust-version = "1.70.0" # 最低支持的 Rust 版本

[dependencies]
# 在这里列出您的项目依赖
"glutin"

```

## Rust中的变量和常量

Rust语言中有三种主要的值存储方式：不可变变量、可变变量和常量。每种方式都有其特定的用途和特点。

### 1. 不可变变量 (Immutable Variables)

默认情况下，Rust中的所有变量都是不可变的。

```rust
let x = 5;
```

特点：
- 一旦赋值后不能再改变
- 可以在运行时计算
- 可以在不同的作用域中多次声明
- 支持遮蔽（shadowing）

### 2. 可变变量 (Mutable Variables)

当需要修改变量的值时，可以将变量声明为可变的。

```rust
let mut y = 5;
y = 6; // 这是允许的
```

特点：
- 使用`mut`关键字声明
- 值可以被修改
- 类型不能改变

### 3. 常量 (Constants)

常量用于存储在整个程序运行期间都不会改变的值。

```rust
const MAX_POINTS: u32 = 100_000;
```

特点：
- 使用`const`关键字声明
- 必须显式指定类型
- 值必须是编译时可确定的常量表达式
- 可以在任何作用域中声明，包括全局作用域
- 不能被遮蔽

### 4. 变量遮蔽 (Shadowing)

Rust允许声明一个与已存在变量同名的新变量，新变量会"遮蔽"之前的变量。

```rust
let x = 5;
let x = x + 1; // 新的x遮蔽了原来的x
```

特点：
- 创建一个新变量，而不是修改原有变量
- 可以改变变量的类型
- 是块级作用域的

### 5. 比较

| 特性 | 不可变变量 | 可变变量 | 常量 |
|------|------------|----------|------|
| 可否修改值 | 否 | 是 | 否 |
| 运行时计算 | 可以 | 可以 | 不可以 |
| 类型推断 | 支持 | 支持 | 不支持（必须显式指定） |
| 遮蔽 | 支持 | 支持 | 不支持 |
| 作用域 | 块级 | 块级 | 全局或块级 |

### 6. 使用场景

- 不可变变量：适用于大多数情况，有助于防止意外修改。
- 可变变量：当需要频繁修改值时使用。
- 常量：用于整个程序中都不会改变的值，如配置参数。
- 遮蔽：当需要转换值的类型或在处理过程中改变变量含义时很有用。

通过合理使用这些特性，Rust在保证内存安全的同时，也为开发者提供了足够的灵活性。



## Rust 数据类型

Rust 语言中的基础数据类型有以下几种。

### 整数型（Integer）

整数型简称整型，按照比特位长度和有无符号分为以下种类：

| 位长度 | 有符号 | 无符号 |
|--------|--------|--------|
| 8-bit  | i8     | u8     |
| 16-bit | i16    | u16    |
| 32-bit | i32    | u32    |
| 64-bit | i64    | u64    |
| 128-bit| i128   | u128   |
| arch   | isize  | usize  |

isize 和 usize 两种整数类型是用来衡量数据大小的，它们的位长度取决于所运行的目标平台，如果是 32 位架构的处理器将使用 32 位位长度整型。

整数的表述方法有以下几种：

| 进制 | 例 |
|------|---|
| 十进制 | 98_222 |
| 十六进制 | 0xff |
| 八进制 | 0o77 |
| 二进制 | 0b1111_0000 |
| 字节(只能表示 u8 型) | b'A' |

很显然，有的整数中间存在一个下划线，这种设计可以让人们在输入一个很大的数字时更容易判断数字的值大概是多少。

### 浮点数型（Floating-Point）

Rust 与其它语言一样支持 32 位浮点数（f32）和 64 位浮点数（f64）。默认情况下，64.0 将表示 64 位浮点数，因为现代计算机处理器对两种浮点数计算的速度几乎相同，但 64 位浮点数精度更高。

#### 实例

```rust
fn main() {
    let x = 2.0; // f64
    let y: f32 = 3.0; // f32
}
```

### 数学运算

用一段程序反映数学运算：

#### 实例

```rust
fn main() {
    let sum = 5 + 10; // 加
    let difference = 95.5 - 4.3; // 减
    let product = 4 * 30; // 乘
    let quotient = 56.7 / 32.2; // 除
    let remainder = 43 % 5; // 求余
}
```

许多运算符号之后加上 = 号是自运算的意思，例如：

sum += 1 等同于 sum = sum + 1。

**注意：**Rust 不支持 **++** 和 **--**，因为这两个运算符出现在变量的前后会影响代码可读性，减弱了开发者对变量改变的意识能力。

### 布尔型

布尔型用 bool 表示，值只能为 true 或 false。

### 字符型

字符型用 char 表示。

Rust的 char 类型大小为 4 个字节，代表 Unicode标量值，这意味着它可以支持中文，日文和韩文字符等非英文字符甚至表情符号和零宽度空格在 Rust 中都是有效的 char 值。

Unicode 值的范围从 U+0000 到 U+D7FF 和 U+E000 到 U+10FFFF （包括两端）。 但是，"字符"这个概念并不存在于 Unicode 中，因此您对"字符"是什么的直觉可能与Rust中的字符概念不匹配。所以一般推荐使用字符串储存 UTF-8 文字（非英文字符尽可能地出现在字符串中）。

**注意：**由于中文文字编码有两种（GBK 和 UTF-8），所以编程中使用中文字符串有可能导致乱码的出现，这是因为源程序与命令行的文字编码不一致，所以在 Rust 中字符串和字符都必须使用 UTF-8 编码，否则编译器会报错。

### 复合类型

#### 元组

元组是用一对 ( ) 包括的一组数据，可以包含不同种类的数据：

##### 实例

```rust
let tup: (i32, f64, u8) = (500, 6.4, 1);
// tup.0 等于 500
// tup.1 等于 6.4
// tup.2 等于 1
let (x, y, z) = tup;
// y 等于 6.4
```

#### 数组

数组用一对 [ ] 包括的同类型数据。

##### 实例

```rust
let a = [1, 2, 3, 4, 5];
// a 是一个长度为 5 的整型数组

let b = ["January", "February", "March"];
// b 是一个长度为 3 的字符串数组

let c: [i32; 5] = [1, 2, 3, 4, 5];
// c 是一个长度为 5 的 i32 数组

let d = [3; 5];
// 等同于 let d = [3, 3, 3, 3, 3];

let first = a[0];
let second = a[1];
// 数组访问

a[0] = 123; // 错误：数组 a 不可变
let mut a = [1, 2, 3];
a[0] = 4; // 正确
```
## Rust中的语句和表达式

在Rust中，函数体由一系列的语句组成，可选地以一个表达式结尾。理解语句和表达式的区别对于编写高效的Rust代码至关重要。

### 定义

- **语句（Statements）**：执行某些操作且没有返回值的步骤。
- **表达式（Expressions）**：计算并返回一个值的代码片段。

### 语句示例

语句通常以分号（;）结尾。

```rust
let a = 6;
println!("Hello, world!");
```

### 表达式示例

表达式计算出一个值，通常不以分号结尾。

```rust
a = 7
b + 2
c * (a + b)
```

### 分号的作用

- 语句通常以分号结尾。
- 表达式后如果加上分号，它就变成了一个语句，且不再返回值。

### 特殊情况

#### 代码块中的最后一个表达式

如果想让代码块返回值，最后一个表达式不应该加分号。

```rust
let x = {
    let y = 1;
    y + 1  // 注意这里没有分号，这个表达式的值(2)将被赋给x
};
```

#### 函数返回值

如果函数的最后一个表达式不加分号，它的值将被作为函数的返回值。

```rust
fn add_one(x: i32) -> i32 {
    x + 1  // 不加分号，这个表达式的值将被返回
}
```

### 表达式语句

有些表达式可以作为语句使用，这时它们会以分号结尾。

```rust
let y = 6;  // 6是一个表达式，但整行是一个语句
```

### 复杂表达式

一些复杂的结构，如`if`、`match`、闭包等，本身就是表达式，不需要分号。

```rust
let x = if condition { 5 } else { 6 };
```

### 总结

- 语句通常以分号结尾，执行操作但不返回值。
- 表达式计算并返回值，通常不以分号结尾。
- 在Rust中，分号的使用是一个重要的语法元素，但理解其背后的概念（语句vs表达式）更为重要。

理解这些概念对于编写清晰、高效的Rust代码非常重要，尤其是在处理函数返回值和复杂控制流时。

## Rust函数
Rust 函数的基本形式：
```
fn <函数名> (<参数列表>) -> <返回类型> {
    函数体
}
```

## Rust条件语句
```
if <条件> {
    <代码块>
} else if <条件> {
    <代码块>
} else {
    <代码块>
}
```

## Rust循环语句
```
// 无限循环, 直到break退出循环,在break 后添加一个值作为返回值
loop {
    <代码块>
    break;
}


while <条件> {
    <代码块>
}

for <变量> in <表达式> {

}
```

## Rust迭代器

## Rust所有权
所有权的三条规则：
- Rust 中的每个值都有一个变量，称为其所有者
- 一个值只能有一个所有者
- 当所有者不在程序运行范围时，该值将被删除。

## Rust引用
```
let s = String::from("hello");
let r1 = &s; // 不可变引用（可以进行多次引用，只能读取不能修改）
let r2 = &s; // 再次引用

let r3 = &mut s; // 可变引用（不可多次引用，可以读取也可以修改）
```

## Rust 闭包
```
|参数...|{ 表达式}
```

## Rust 结构体

```
struct <结构体名> {
    <成员变量>: <类型>,
}

impl <结构体名> {
    fn <方法名>(&self, <参数>) -> <返回类型> {
        <代码块>
    }
}


```

## Rust枚举类
```
enum <枚举名> {
    <成员1>,
    <成员2>,
    ...
}
```

## Rust泛型
```
struct Point<T> {
    x: T,
    y: T
}

emun Option<T> {
    Some(T),
    None
}

```

## Rust特性
```
trait <特性名> {
    fn <方法名>(&self, <参数>) -> <返回类型>;
}

impl <结构体名> for <特性名> {
    fn <方法名>(&self, <参数>) -> <返回类型> {
        <代码块>
    }
}
```

## Rust生命周期
```
fn main() {
    let r;
    {
        let s1 = "rust";
        let s2 = "ecmascript";
        r = longer(s1, s2);
    }
    println!("{} is longer", r);
}
fn longer<'a>(s1: &'a str, s2: &'a str) -> &'a str {
    if s2.len() > s1.len() {
        s2
    } else {
        s1
    }
}
```

## Rust集合与字符串
```
let v = vec![1, 2, 3];

let s = String::from("hello");

let h = HashMap::new();
```


## 并发编程
```
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 0..5 {
            println!("spawned thread print {}", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 0..3 {
        println!("main thread print {}", i);
        thread::sleep(Duration::from_millis(1));
    }

    handle.join().unwrap();
}


use std::thread;
use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap();
    });

    let received = rx.recv().unwrap();
    println!("Got: {}", received);
}
```


## Rust宏
```
// 宏的定义
macro_rules! vec {
    // 基本情况，空的情况
    () => {
        Vec::new()
    };
   
    // 递归情况，带有元素的情况
    ($($element:expr),+ $(,)?) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($element);
            )+
            temp_vec
        }
    };
}

fn main() {
    // 调用宏
    let my_vec = vec![1, 2, 3];
    println!("{:?}", my_vec); // 输出: [1, 2, 3]

    let empty_vec = vec![];
    println!("{:?}", empty_vec); // 输出: []
}
```

## Rust智能指针

## Rust异步编程async/await
```
// 引入所需的依赖库
use tokio;

// 异步函数，模拟异步任务
async fn async_task() -> u32 {
    // 模拟异步操作，等待 1 秒钟
    tokio::time::sleep(tokio::time::Duration::from_secs(1)).await;
    // 返回结果
    42
}

// 异步任务执行函数
async fn execute_async_task() {
    // 调用异步任务，并等待其完成
    let result = async_task().await;
    // 输出结果
    println!("Async task result: {}", result);
}

// 主函数
#[tokio::main]
async fn main() {
    println!("Start executing async task...");
    // 调用异步任务执行函数，并等待其完成
    execute_async_task().await;
    println!("Async task completed!");
}
```
