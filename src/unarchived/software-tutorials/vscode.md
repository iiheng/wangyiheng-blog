---
date: 2024-08-07
category:
- vscode
tag:
- 编程软件
archive: true
---

# VS Code 使用教程

## 1. 安装VS Code

1. 访问[VS Code官网](https://code.visualstudio.com/)
2. 点击"Download"按钮下载适合您操作系统的版本(Windows, macOS, 或 Linux)
3. 下载完成后,运行安装程序并按照提示完成安装

## 2. 界面概览

安装完成后,打开VS Code,你会看到以下主要部分:

- **活动栏**(左侧): 包含文件浏览器、搜索、源代码管理等图标
- **侧边栏**: 显示活动栏中选中项的详细信息
- **编辑器**: 中央的代码编辑区域
- **面板**: 底部区域,包含终端、输出、调试控制台等
- **状态栏**(底部): 显示当前项目和文件信息

## 3. 打开文件夹或项目

1. 点击左上角的"File" > "Open Folder"
2. 选择你想要打开的文件夹
3. 文件夹内容将显示在左侧的文件浏览器中

## 4. 创建和编辑文件

1. 在文件浏览器中右键点击,选择"New File"
2. 输入文件名(包括扩展名,如 `index.html`)
3. 在中央编辑区域编辑文件内容
4. 使用 `Ctrl+S` (Windows/Linux) 或 `Cmd+S` (macOS) 保存文件

## 5. 安装扩展

1. 点击左侧活动栏中的扩展图标(方块图案)
2. 在搜索框中输入想要的扩展名称
3. 点击扩展卡片上的"Install"按钮进行安装
4. 有些扩展可能需要重启VS Code才能生效

## 6. 使用集成终端

1. 使用 `` Ctrl+` `` 快捷键打开集成终端
2. 在终端中可以运行命令,如 `npm install`, `git commit` 等

## 7. 代码导航

- 使用 `Ctrl+P` 快速打开文件
- 使用 `Ctrl+Shift+O` 在当前文件中导航到特定符号(函数、类等)
- 使用 `F12` 跳转到定义

## 8. 调试

1. 点击左侧活动栏中的调试图标(虫子图案)
2. 点击"添加配置"创建 `launch.json` 文件
3. 选择适合你项目的调试环境
4. 设置断点(点击行号左侧)
5. 按 F5 开始调试

## 9. 源代码管理

如果你的项目是一个Git仓库:

1. 点击左侧活动栏中的源代码管理图标(分支图案)
2. 在这里你可以查看更改、暂存文件、提交更改、推送到远程仓库等

## 10. 自定义设置

1. 点击左下角的齿轮图标,选择"Settings"
2. 在这里你可以修改编辑器的各种设置,如字体、主题、缩进等

## 11. 项目特定配置

对于特定项目，你可能需要一些专门的配置。这些配置可以在项目的根目录下的 `.vscode` 文件夹中设置。

1. 在项目根目录创建 `.vscode` 文件夹
2. 在 `.vscode` 文件夹中创建 `settings.json` 文件
3. 将以下内容添加到 `settings.json` 文件中：

```json
{
  // 在保存时格式化文件
  "editor.formatOnSave": true,
  // 文件格式化配置
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // 配置语言的文件关联
  "files.associations": {
    "pages.json": "jsonc", // pages.json 可以写注释
    "manifest.json": "jsonc" // manifest.json 可以写注释
  }
}
```

这些设置将：
- 在保存文件时自动格式化
- 为 Vue 和 JSON 文件设置 Prettier 作为默认格式化工具
- 允许在 `pages.json` 和 `manifest.json` 文件中写注释

注意：确保已安装 "esbenp.prettier-vscode" 扩展以使用 Prettier 进行格式化。

## 12. 快捷键

学习一些常用的快捷键可以大大提高效率：

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+C`, `Ctrl+X`, `Ctrl+V` | 复制、剪切、粘贴 |
| `Ctrl+Z`, `Ctrl+Y` | 撤销、重做 |
| `Ctrl+F` | 查找 |
| `Ctrl+H` | 替换 |
| `Alt+Up/Down` | 移动当前行 |

这是VS Code的基本使用教程。随着你的使用,你会发现VS Code还有很多强大的功能等待探索。记住,VS Code的[官方文档](https://code.visualstudio.com/docs)是一个很好的资源,可以帮助你深入了解各种功能。
