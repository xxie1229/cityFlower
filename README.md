# 市花介绍网页

一个纯前端静态网页，用于展示中国部分城市的市花与简介，并支持关键词搜索。

## 文件结构

- `index.html`：页面结构
- `styles.css`：页面样式
- `script.js`：数据与交互逻辑

## 使用方式

1. 直接在浏览器打开 `index.html`。
2. 或在 VS Code 中安装 Live Server 后右键 `index.html` -> Open with Live Server。

## 当前功能

- 展示 8 个城市市花卡片
- 支持按城市名 / 市花名 / 简介关键字实时搜索
- 无匹配时显示空状态提示

## 发布到服务器（公网访问）

以下方式可让用户在任意终端通过浏览器访问（手机/平板/电脑均可）。

### 方式一：Docker 部署（推荐）

前提：你有一台 Linux 云服务器（已安装 Docker），并开放 `80` 端口。

1. 上传项目到服务器（例如放在 `/opt/cityFlower`）。
2. 在服务器执行：

```bash
cd /opt/cityFlower
docker build -t cityflower-web:1.0 .
docker run -d --name cityflower -p 80:80 --restart always cityflower-web:1.0
```

3. 浏览器访问：`http://你的服务器公网IP`

### 更新网页（重新发布）

```bash
cd /opt/cityFlower
docker rm -f cityflower
docker build -t cityflower-web:1.0 .
docker run -d --name cityflower -p 80:80 --restart always cityflower-web:1.0
```

### 绑定域名（可选）

1. 在域名 DNS 添加 `A` 记录，指向服务器公网 IP。
2. 等待解析生效后访问：`http://你的域名`

如需 HTTPS，建议在服务器前加 Nginx + Certbot 或使用云厂商负载均衡证书。

## 使用 GitHub Pages 发布（推荐静态站点）

本项目已包含自动发布工作流：`.github/workflows/pages.yml`。

### 一次性配置

1. 在 GitHub 新建仓库：`cityFlower`。
2. 将本地项目推送到该仓库 `main` 分支。
3. 打开仓库 `Settings -> Pages`：
	- `Source` 选择 `GitHub Actions`。

### 本地推送命令（Windows PowerShell）

```powershell
cd C:\Users\xbxie\cityFlower
git init
git add .
git commit -m "init: city flower web"
git branch -M main
git remote add origin https://github.com/xxie1229/cityFlower.git
git push -u origin main
```

推送后，GitHub Actions 会自动部署。访问地址：

`https://xxie1229.github.io/cityFlower/`

### 后续更新

每次修改后执行：

```powershell
git add .
git commit -m "feat: update content"
git push
```

等待约 1~3 分钟，页面会自动更新。
