# 飞牛私有云

我们从飞牛官网 （https://fnnas.com/ ）了解到，飞牛私有云，即飞牛OS，是广州铁刃智造技术有限公司基于最新版本的 Linux 内核（Debian 发行版）深度开发的NAS系统，兼容主流 x86 硬件，灵活扩展外部存储。

有了NAS，可以做很多自己想做的事情，比如：搭建属于自己的家庭影音库、搭建下载服务器、搭建网站、运行Docker等等。

## 安装及使用



## 系统安装
系统安装前的准备工作：


##  常用功能

### 设置远程挂载

飞牛NAS设置 **远程挂载** ，前提是已经在飞牛NAS **应用中心** 中安装了 **Alist**，并且已经挂载了 **某个网盘**。

1. 进入 **文件管理** ，左侧菜单栏选择 **远程挂载**，然后在 右侧页面中选择 **挂载远程文件夹**，如下图：

![远程挂载](https://img.qxiansen.online/file/AgACAgUAAyEGAASG4H8TAAM7Z4JWAb_YkTFbQRGepVRWsAarqdAAAs2-MRs06xFUkEaLZVk50aoBAAMCAAN5AAM2BA.png)

2. 在弹出窗口中选择 **WebDAV** 图标，然后点击 **下一步** ，如下图：

![WebDAv](https://img.qxiansen.online/file/AgACAgUAAyEGAASG4H8TAAM8Z4JWlDQs0PWU4RFmEpGo_VFo1gQAAs6-MRs06xFUoZ9CXenxHTYBAAMCAAN4AAM2BA.png)

3. 在页面中按照下图填写信息，点击 **确认** 后即可挂载成功。

![填写Alist信息](https://img.qxiansen.online/file/AgACAgUAAyEGAASG4H8TAAM9Z4JW_mAIOW4Be_IZG-P_cNv79mUAAs--MRs06xFUT2T3vwX-PIEBAAMCAAN4AAM2BA.png)

## 配置DDNSTO

在开始配置之前，我们需要提前做好几项工作，以便在配置过程中使用。

- 打开 **DDNSTO官网**，注册账号。**[点此前往官网注册](https://web.ddnsto.com/)**
- 打开飞牛NAS后台，选择 **文件管理** ，在你想要存放 **DDNSTO** 的位置，新建 **ddnsto** 文件夹。进入 **ddnsto** 文件夹，再新建 **ddnsto-config** 文件夹

1. 飞牛后台打开 **Docker** 应用，点击 **镜像仓库** ，搜索栏输入 **linkease/ddnsto** 回车，选择第1个镜像下载，如下图：

![下载镜像](https://img.qxiansen.online/file/AgACAgUAAyEGAASG4H8TAAM-Z4J1UNVK7xOa9HmZLvlfhntIdWMAAva-MRs06xlULm4qThTzgy8BAAMCAAN5AAM2BA.png)

2. 下载完成后，点击 **本地镜像** ，点击 **运行** 按钮，如下图：

![运行镜像](https://img.qxiansen.online/file/AgACAgUAAyEGAASG4H8TAAM_Z4J2Q0Z28QGVDVBi4F1ZrUQs-rkAAvm-MRs06xlUd5ihNhX4A9cBAAMCAAN5AAM2BA.png)

3. 勾选 **开机自动启动** ，然后点击 **下一步** ，如下图：

![勾选开机自动启动](https://img.qxiansen.online/file/AgACAgUAAyEGAASG4H8TAANAZ4J21kLITG2uLckbFBpWVnRcE2IAAvu-MRs06xlUOiWYHwbqDGQBAAMCAAN4AAM2BA.png)

4. 点击 **存储位置 → 添加路径** ，把我们之前建立的文件夹添加进来，再输入框里输入 **/ddnsto-config** ，如下图：

![添加存储位置](https://img.qxiansen.online/file/AgACAgUAAyEGAASG4H8TAANBZ4J40vfu1lZ8HVbWGrXob1VrwSMAAv--MRs06xlUsZAqQytuDawBAAMCAAN4AAM2BA.png)

5. 向下拉，点击 **环境变量** ，输入 **token** 的值，然后点击 **下一步** ，如下图：

![添加环境变量](https://img.qxiansen.online/file/AgACAgUAAyEGAASG4H8TAANCZ4J5uwhQmwjkT1LkQWQkv9TNxHwAAgG_MRs06xlUP4l4A1sH-egBAAMCAAN4AAM2BA.png)

6. 点击 **创建** 后，配置完成，如下图：

![创建完成](https://img.qxiansen.online/file/AgACAgUAAyEGAASG4H8TAANDZ4J6itvU66BdUYblpkVuKY5lwk0AAgO_MRs06xlUDrrGT6cMKIABAAMCAAN4AAM2BA.png)

7. 到 **DDNSTO** 官网登录后台，点击 **添加域名映射** ，在弹出窗口按提示填写信息即可完成内网穿透。