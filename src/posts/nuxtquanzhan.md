---
date: 2024-07-21
category:
  - 教程
tag:
  - nuxt,全栈
archive: false
---
# nuxt全栈教程

### 利用mysql安装docker
```
 docker run -d -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=123456 -v ${PWD}/db:/var/lib/mysql --restart always mysql:8.2
```

### mysql 表设计
```
-- 创建数据库
CREATE DATABASE IF NOT EXISTS advcamsx;

-- 使用新创建的数据库
USE advcamsx;

-- 创建 Customers 表
DROP TABLE IF EXISTS Customers;
CREATE TABLE IF NOT EXISTS Customers (
    CustomerId INT PRIMARY KEY,
    CompanyName VARCHAR(255),
    ContactName VARCHAR(255)
);
INSERT INTO Customers (CustomerID, CompanyName, ContactName) VALUES 
(1, 'Alfreds Futterkiste', 'Maria Anders'),
(4, 'Around the Horn', 'Thomas Hardy'),
(11, 'Bs Beverages', 'Victoria Ashworth'),
(13, 'Bs Beverages', 'Random Name');

-- 创建 users 表
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    points INT DEFAULT 0
);

-- 创建 activation_codes 表
DROP TABLE IF EXISTS activation_codes;
CREATE TABLE activation_codes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(255) NOT NULL UNIQUE,
    points INT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    expiration_date DATE NOT NULL
);

-- 创建 advertisements 表
DROP TABLE IF EXISTS advertisements;
CREATE TABLE advertisements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    status ENUM('待审核', '审核通过', '审核失败') NOT NULL,
    submission_date DATE NOT NULL,
    scheduled_send_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 创建 adrecords 表
DROP TABLE IF EXISTS adrecords;
CREATE TABLE adrecords (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ad_id INT NOT NULL,
    send_date DATE NOT NULL,
    result ENUM('成功', '失败') NOT NULL,
    FOREIGN KEY (ad_id) REFERENCES advertisements(id)
);

-- 创建 code_usage_records 表
DROP TABLE IF EXISTS code_usage_records;
CREATE TABLE code_usage_records (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code_id INT NOT NULL,
    user_id INT NOT NULL,
    usage_date DATE NOT NULL,
    FOREIGN KEY (code_id) REFERENCES activation_codes(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

```


## cloudflare d1表设计
### 用户表设计
```
DROP TABLE IF EXISTS Customers;
CREATE TABLE IF NOT EXISTS Customers (CustomerId INTEGER PRIMARY KEY, CompanyName TEXT, ContactName TEXT);
INSERT INTO Customers (CustomerID, CompanyName, ContactName) VALUES (1, 'Alfreds Futterkiste', 'Maria Anders'), (4, 'Around the Horn', 'Thomas Hardy'), (11, 'Bs Beverages', 'Victoria Ashworth'), (13, 'Bs Beverages', 'Random Name');

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Points INTEGER DEFAULT 0
);

DROP TABLE IF EXISTS activation_codes;
CREATE TABLE activation_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    points INTEGER NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expiration_date DATE NOT NULL
);

DROP TABLE IF EXISTS advertisements;
CREATE TABLE advertisements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    status TEXT CHECK(Status IN ('待审核', '审核通过', '审核失败')) NOT NULL,
    submission_date DATE NOT NULL,
    scheduled_send_date DATE Not NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

DROP TABLE IF EXISTS adrecords;
CREATE TABLE adrecords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ad_id INTEGER NOT NULL,
    send_date DATE NOT NULL,
    result TEXT CHECK(Result IN ('成功', '失败')) NOT NULL,
    FOREIGN KEY (ad_id) REFERENCES advertisements(id)
);

DROP TABLE IF EXISTS code_usagere_cords;
CREATE TABLE code_usagere_cords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    usage_date DATE NOT NULL,
    FOREIGN KEY (code_id) REFERENCES activation_codes(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);


```

### 创建表
```
npx wrangler d1 execute advcamsx --local --file=./schema.sql
```

### 查询user表
```
npx wrangler d1 execute advcamsx --local --command="SELECT * FROM users"
```