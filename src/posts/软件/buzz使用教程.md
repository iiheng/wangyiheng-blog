---
date: 2024-07-09
category:
  - 软件
tag:
  - 开源
  - 文字转语音
archive: false
---

# Buzz – 开源、可离线的实时语音转文字工具

## Buzz 简介

Buzz 是一款基于 OpenAI Whisper 技术的开源、可离线运行的实时语音转文字工具，适用于 Windows、macOS 和 Linux 系统。它不仅能将麦克风输入的语音实时转换为文字，还支持将视频和音频文件转换为文字和字幕。

### 功能介绍

- **实时语音转文字与实时翻译**：需要麦克风权限
- **音频、视频文件导入**：支持的文件格式包括 mp3、wav、m4a、ogg、mp4、webm、ogm
- **字幕导出**：可以导出逐句字幕或逐词字幕，支持的格式有 TXT、SRT、VTT

相比于 Autocut，Buzz 专注于语音转文字和字幕生成，功能更为专一。与命令行版的 Python Whisper 相比，Buzz 速度更快，并且提供了图形用户界面，使普通用户使用更加便捷。

由于支持离线功能，Buzz 的安装包体积较大：

- Buzz-0.5.8-mac.dmg 330 MB
- Buzz-0.5.8-unix.tar.gz 1.5 GB
- Buzz-0.5.8-windows.tar.gz 261 MB
- Buzz.exe 161 MB

### Whisper 模型

Whisper 是一种通用语音识别模型，利用大型数据集进行训练，支持多语言语音识别和翻译功能。

Buzz 在首次使用时会下载 Whisper 模型，根据不同的质量需求，模型的大小如下：

| 质量  | 大小 | English-only model | Multilingual model | 必需的显存 | 处理速度 |
|-------|------|--------------------|--------------------|-------------|----------|
| tiny  | 39 M | tiny.en            | tiny               | ~1 GB       | ~32x     |
| base  | 74 M | base.en            | base               | ~1 GB       | ~16x     |
| small | 244 M| small.en           | small              | ~2 GB       | ~6x      |
| medium| 769 M| medium.en          | medium             | ~5 GB       | ~2x      |
| large | 1550 M| N/A                | large              | ~10 GB      | 1x       |

Whisper 模型存储路径：

- macOS: `~/Library/Caches/Buzz`
- Linux: `~/.cache/Buzz`
- Windows: `C:\Users\<username>\AppData\Local\Buzz\Buzz\Cache`

卸载 Buzz 时，请记得删除模型文件。

## 使用方法

Buzz 提供两项主要功能：

1. **Translate** 翻译
2. **Transcribe** 转录

要从文件进行转录，可以点击“文件”菜单中的“导入”（在 Mac 上使用 command + O，Windows 上使用 Ctrl + O）。支持的文件格式有 mp3、wav、m4a、ogg、mp4、webm、ogm，导出格式包括 TXT、SRT、VTT。

转换速度取决于计算机性能，实际效果非常出色，特别是对中文的识别效果很好。

## 获取

你可以从 [GitHub](https://meta.appinn.net/t/topic/38263) 下载 Buzz。
