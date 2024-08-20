---
date: 2024-08-01
category:
- 全栈开发
tag:
- UniApp
- Vue.js
- 小程序
- uni-starter
- uni-admin
archive: true
---

# UniApp全栈开发教程：招聘网站项目

## 1. 环境搭建

### 1.1 开发工具安装

#### 1.1.1 HBuilderX（推荐）

HBuilderX是UniApp开发的官方IDE，提供了丰富的功能和插件。

- 下载：[HBuilderX官网](https://www.dcloud.io/hbuilderx.html)
- 教程：[HBuilderX使用视频](https://www.bilibili.com/video/BV1Bp4y1379L?p=2&vd_source=44e0ce32778bfce015c72f51b5d0c032)

特点：
- 内置终端和调试工具
- 丰富的插件生态
- UniApp开发的最佳选择

#### 1.1.2 Visual Studio Code

VSCode是一个轻量级但功能强大的编辑器，也可用于UniApp开发。

- 下载：[VSCode官网](https://code.visualstudio.com/)
- 教程：[VSCode UniApp开发配置](https://www.bilibili.com/video/BV1Bp4y1379L/?p=6&share_source=copy_web&vd_source=e8c70a5224d8c6dac70419be17953d6a)
- 文档：[VSCode UniApp环境配置](https://www.cnblogs.com/weizwz/p/17952042)

配置步骤：
1. 安装插件：Vetur, ESLint, uni-app-snippets等
2. 配置工作区设置
3. 安装项目依赖

对于Windows用户，你可以使用以下PowerShell命令快速设置环境：

```powershell
# 下载设置脚本
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/iiheng/vscode-uniapp-setup/main/scripts/setup.ps1" -OutFile "setup.ps1"

# 执行脚本
.\setup.ps1

```
## 2. 项目创建与结构

### 2.1 招聘网站客户端（uni-starter）

使用uni-starter模板快速搭建客户端应用。

- 文档：[uni-starter官方文档](https://doc.dcloud.net.cn/uniCloud/uni-starter.html)

创建步骤：
1. 在HBuilderX中新建项目
2. 选择"uni-starter"模板
3. 填写项目基本信息

主要功能：
- 用户注册登录
- 职位列表和搜索
- 简历投递
- 消息通知

自定义图标：[自定义图标](https://uniapp.dcloud.net.cn/component/uniui/uni-icons.html)


获取用户的登录信息，可使用下面这个方法：

```javascript
uniCloud.getCurrentUserInfo()
```

更多API在[uniCloud客户端SDK文档](https://doc.dcloud.net.cn/uniCloud/client-sdk.html)查询

### 2.2 招聘网站管理端（uni-admin）

使用uni-admin模板构建管理后台。

- 文档：[uni-admin官方文档](https://doc.dcloud.net.cn/uniCloud/admin.html)

创建步骤：
1. 在HBuilderX中新建项目
2. 选择"uni-admin"模板
3. 配置管理员账号和密码

主要功能：
- 用户管理
- 职位管理
- 简历审核
- 数据统计

## 3. 功能开发
### 基础表设计


<details>
<summary>用户表：用户注册信息</summary>

- _id: String (自动生成的唯一标识符)
- username: String (用户名)
- password: String (加密后的密码)
- email: String (电子邮箱)
- phone: String (电话号码)
- role: String (用户角色，如 'jobseeker' 或 'employer')
- created_at: Timestamp (创建时间)
- updated_at: Timestamp (更新时间)

</details>

<details>
<summary>职位表：职位信息</summary>

- _id: String
- user_id: String (关联的用户ID)
- title: String (职位标题)
- company_id: String (关联的公司ID)
- description: String (职位描述)
- requirements: String (职位要求)
- salary_range: Object (薪资范围，包含 min 和 max)
- location: String (工作地点)
- job_type: String (全职、兼职等)
- status: String (开放、关闭等)
- created_at: Timestamp (创建时间)
- updated_at: Timestamp (更新时间)

> dg-jobs.schema.json
```
// 文档教程: https://uniapp.dcloud.net.cn/uniCloud/schema
{
    "bsonType": "object",
    "required": [],
    "permission": {
        "read": true,
        "create": "auth.uid != null",
        "update": "doc.user_id == auth.uid",
        "delete": "doc.user_id == auth.uid"
    },
    "properties": {
        "_id": {
            "description": "ID，系统自动生成"
        },
        "user_id": {
            "bsonType": "string",
            "description": "关联的用户ID",
            "foreignKey": "uni-id-users._id",
            "defaultValue": {
                "$env": "uid"
            }
        }
    }
}

```
</details>

<details>
<summary>简历表：简历信息</summary>

- _id: String
- user_id: String (关联的用户ID)
- name: String (姓名)
- email: String (联系邮箱)
- phone: String (联系电话)
- education: Array (教育经历)
- experience: Array (工作经验)
- skills: Array (技能)
- created_at: Timestamp (创建时间)
- updated_at: Timestamp (更新时间)

> dg-resumes.schema.json
```
// 文档教程: https://uniapp.dcloud.net.cn/uniCloud/schema
// 文档教程: https://uniapp.dcloud.net.cn/uniCloud/schema
{
    "bsonType": "object",
    "required": [],
    "permission": {
        "read": true,
        "create": "auth.uid != null",
        "update": "doc.user_id == auth.uid",
        "delete": "doc.user_id == auth.uid"
    },
    "properties": {
        "_id": {
            "description": "ID，系统自动生成"
        },
        "user_id": {
            "bsonType": "string",
            "description": "关联的用户ID",
            "foreignKey": "uni-id-users._id",
            "defaultValue": {
                "$env": "uid"
            }
        },
        "name": {
            "bsonType": "string",
            "description": "姓名",
            "trim": "both",
            "foreignKey": "uni-id-users.username"
        },
        "phone": {
            "bsonType": "string",
            "description": "联系电话",
            "pattern": "^\\+?[0-9]{10,14}$",
            "foreignKey": "uni-id-users.mobile"
        },
        "status": {
            "bsonType": "int",
            "title": "求职状态",
            "description": "求职状态",
            "defaultValue": 0,
            "componentForEdit": {
                "name": "uni-data-picker"
            },
            "enum": [{
                    "text": "离职-随时到岗",
                    "value": 0
                },
                {
                    "text": "在职-月内到岗",
                    "value": 1
                },
                {
                    "text": "在职-考虑机会",
                    "value": 2
                },
                {
                    "text": "在职-暂不考虑",
                    "value": 3
                }
            ]
        },
        "personal_advantages": {
            "bsonType": "string",
            "title": "个人优势",
            "description": "描述个人的优势和特长",
            "trim": "both",
            "maxLength": 1000
        },
        "work_cities": {
            "bsonType": "array",
            "title": "工作城市",
            "description": "期望的工作城市（最多3个）",
            "maxItems": 3,
            "uniqueItems": true,
            "items": {
                "bsonType": "string",
                "trim": "both",
                "maxLength": 50
            }
        },
        "created_at": {
            "bsonType": "timestamp",
            "description": "创建时间",
            "defaultValue": {
                "$env": "now"
            }
        },
        "updated_at": {
            "bsonType": "timestamp",
            "description": "更新时间",
            "defaultValue": {
                "$env": "now"
            }
        }
    }
}
```

</details>

<details>
<summary>公司表: 公司信息</summary>

- _id: String
- user_id: String (关联的用户ID)
- name: String (公司名称)
- description: String (公司描述)
- location: String (公司所在地)
- industry: String (公司行业)
- website: String (公司网址)
- created_at: Timestamp (创建时间)
- updated_at: Timestamp (更新时间)
</details>

<details>
<summary>通知表：消息通知</summary>

- _id: String
- user_id: String (关联的用户ID)
- message: String (通知内容)
- created_at: Timestamp (创建时间)
</details>

<details>

<summary>应聘记录表：应聘者的应聘记录</summary>

- _id: String
- user_id: String (关联的用户ID)
- job_id: String (关联的职位ID)
- status: String (状态，如 'pending'、'accepted'、'rejected')
- created_at: Timestamp (创建时间)
- updated_at: Timestamp (更新时间)
</details>

<details>
<summary>工作经历表：用户的工作经历记录</summary>

- _id: String
- user_id: String (关联的用户ID)
- company_name: String (公司名称)
- start_date: Timestamp (入职时间)
- end_date: Timestamp (离职时间，如果是当前工作可以为null)
- is_current_job: Boolean (是否为当前工作)
- job_title: String (职位名称)
- job_description: String (工作内容)
- achievements: String (工作业绩)
- department: String (所属部门)
- created_at: Timestamp (创建时间)
- updated_at: Timestamp (更新时间)

</details>

<details>
<summary>项目经历表：用户的项目经历记录</summary>

- _id: String
- user_id: String (关联的用户ID)
- start_date: Timestamp (项目开始时间)
- end_date: Timestamp (项目结束时间，如果是进行中的项目可以为null)
- project_description: String (项目描述)
- project_media: Array (项目相关的媒体文件，包含图片或视频的URL)
- created_at: Timestamp (创建时间)
- updated_at: Timestamp (更新时间)

</details>


<details>
<summary>求职期望表：用户的求职期望记录</summary>

- _id: String
- user_id: String (关联的用户ID)
- job_title: String (职位名称)
- job_type: String (全职、兼职等)
- salary_range: Object (薪资要求)
- created_at: Timestamp (创建时间)
- updated_at: Timestamp (更新时间)

</details>

### 微信小程序获取手机号
前情提要: 在使用uniapp开发小程序时，获取用户手机号码需要提交商家信息。这是因为获取用户手机号码需要使用微信开放平台的接口，而微信开放平台要求开发者必须先进行认证，提交商家信息后才能使用该接口。商家信息包括企业名称、营业执照、联系人信息等。只有通过认证的开发者才能使用微信开放平台的接口，包括获取用户手机号码的接口。

## CSS3样式学习
[css视频教学](https://www.bilibili.com/video/BV1p84y1P7Z5/?spm_id_from=333.337.search-card.all.click&vd_source=d58aa7a3be7646592b8409e904eff77a)

## uniapp组件：
[uniapp组件](https://uniapp.dcloud.net.cn/component/)



