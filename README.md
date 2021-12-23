# Nvjdc

* [@NolanHzy](https://github.com/NolanHzy/nvjdcdocker) 牛批



## 排错说明

Nvjdc登录后没有wxpusher的二维码

git pull 出现如下报错

    error: Your local changes to the following files would be overwritten by merge:Config.json
    Please, commit your changes or stash them before you can merge.Aborting

请删掉容器后重新按步骤拉取即可，镜像不用删

    docker rm -f nolanjdc

记得删除root文件夹下的nolanjdc文件夹



## 注意 注意注意

    HUBdcoker里面有一个 nolanjdc/nvjdc 镜像不要拉 我看还有500多人拉了 起名都有所图 别的我不多说了把

    我自己的docker  nolanhzy/nvjdc 认清楚

## 提示

由于我自己的环境是centos x86，

这是打包过的 不要fork

不是热更新 每次修改配置需要重启容器

## Windows安装教程


# 1安装ASP.NET Core Runtime 5.0.12

安装地址:https://dotnet.microsoft.com/download/dotnet/5.0
下载之后无脑下一步

# 2下载当前项目源码解压

# 3删除NETJDC.deps.json


# 4根据自己系统将dll复制根目录即可

64位

复制runtimes\win-x64\native\OpenCvSharpExtern.dll到根目录

32位

复制runtimes\win-x86\native\OpenCvSharpExtern.dll到根目录

# 启动 

 管理员打开CMD CD到源码文件夹中  输入 dotnet NETJDC.dll --urls=http://*:5000

 后面那个是端口可以自己改

## docker安装教程

如果你是装过NVjdc 先看看后面1.2以前如何更新之1.2升级说明

1拉源码
国内
```
git clone https://ghproxy.com/https://github.com/NolanHzy/nvjdcdocker.git /root/nolanjdc
```
国外
```
git clone https://github.com/NolanHzy/nvjdcdocker.git /root/nolanjdc
```


2 拉取基础镜像以后不需要拉取镜像了 如果需要拉取我会通知
```
sudo docker pull nolanhzy/nvjdc:latest
```

3 执行命令

```
yum install wget unzip -y
```

4创建一个目录放配置

```
 cd /root/nolanjdc
```
```
mkdir -p  Config && cd Config
```

5手动建立Config.json 配置文件 
注意ARM多一个配置 Captchaurl

```
{
  ///浏览器最多几个网页
  "MaxTab": "4",
  //网站标题
  "Title": "NolanJDCloud",
  //回收时间分钟 不填默认3分钟
  "Closetime": "5",
  //网站公告
  "Announcement": "为提高账户的安全性，请关闭免密支付。",
  ///开启打印等待日志卡短信验证登陆 可开启 拿到日志群里回复 默认不要填写
  "Debug": "",
  ///自动滑块次数5次 5次后手动滑块 可设置为0默认手动滑块
  "AutoCaptchaCount": "0",
  ///XDD PLUS Url  http://IP地址:端口/api/login/smslogin
  "XDDurl": "",
  ///xddToken
  "XDDToken": "",
  ///登陆预警 0 0 12 * * ?  每天中午十二点 https://www.bejson.com/othertools/cron/ 表达式在线生成网址
  "ExpirationCron": " 0 0 12 * * ?",
  ///个人资产 0 0 10,20 * * ?  早十点晚上八点
  "BeanCron": "0 0 10,20 * * ?",
  // ======================================= WxPusher 通知设置区域 ===========================================
  // 此处填你申请的 appToken. 官方文档：https://wxpusher.zjiecode.com/docs
  // WP_APP_TOKEN 可在管理台查看: https://wxpusher.zjiecode.com/admin/main/app/appToken
  // MainWP_UID 填你自己uid
  ///这里的通知只用于用户登陆 删除 是给你的通知
  //重要：事件回调地址中填写Nvjdc地址http://公网ip:端口/api/wxpusher
  "WP_APP_TOKEN": "",
  "MainWP_UID": "",
  // ======================================= Pushplus 通知设置区域 ===========================================
  ///Push Plus官方网站：http": //www.pushplus.plus  只有青龙模式有用
  ///下方填写您的Token，微信扫码登录后一对一推送或一对多推送下面的token，只填" "PUSH_PLUS_TOKEN",
  "PUSH_PLUS_TOKEN": "",
  //下方填写您的一对多推送的 "群组编码" ，（一对多推送下面->您的群组(如无则新建)->群组编码）
  "PUSH_PLUS_USER": "",
  ///青龙配置  注意对接XDD 对接芝士 设置为"Config":[]
  "Config": [
    {
      //序号必填从1 开始
      "QLkey": 1,
      //服务器名称
      "QLName": "阿里云",
      //青龙地址
      "QLurl": "http://ip:5700",
      //青龙2,9 OpenApi Client ID
      "QL_CLIENTID": "",
      //青龙2,9 OpenApi Client Secret
      "QL_SECRET": "",
      //CK最大数量
      "QL_CAPACITY": 99,
      //使用pushplus就用它，删掉注释，把WP_APP_TOKEN注释掉（二选一）
      //"QRurl": ""
      ///使用WxPusher就用它，把QRurl注释掉，建议一个青龙一个WxPusher应用（二选一）
      "WP_APP_TOKEN": ""
    }
  ]

}
```

6 回到nolanjdc目录创建chromium文件夹并进入

```
cd /root/nolanjdc && mkdir -p  .local-chromium/Linux-884014 && cd .local-chromium/Linux-884014
```

7下载 chromium 

```
wget https://mirrors.huaweicloud.com/chromium-browser-snapshots/Linux_x64/884014/chrome-linux.zip && unzip chrome-linux.zip
```

8删除刚刚下载的压缩包 

```
rm  -f chrome-linux.zip
```

9回到刚刚创建的目录

```
cd  /root/nolanjdc
```



10启动镜像

```
sudo docker run   --name nolanjdc -p 5701:80 -d  -v  "$(pwd)":/app \
-v /etc/localtime:/etc/localtime:ro \
-it --privileged=true  nolanhzy/nvjdc:latest
```
注意由于我懒 不想更新镜像 /etc/localtime


那么群辉启动docker 就删除掉 -v /etc/localtime:/etc/localtime:ro \

由于有定时任务 需要设置 时区 假设群辉拉的源码在 /volume1/docker/nvjdc 目录
```
sudo docker run   --name nolanjdc -p 5701:80 -d  -v  /volume1/docker/nvjdc:/app \
-it --privileged=true  nolanhzy/nvjdc:latest
```
进入容器
```
docker exec -it nolanjdc bash
```
修改时间
```
cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```
输入date 查看时区对不对  群辉的docker 日志时间有毛病 我们就不用管docker log
```
date
```

这里可能群辉没有

11查看 日志 

```
docker logs -f nolanjdc 
```

  

出现 NETJDC  started 即可 

## Arm安装教程


安装地址 https://github.com/NolanHzy/nvjdcdocker/blob/main/Arm%E5%AE%89%E8%A3%85%E8%AF%B4%E6%98%8E.md


## 1.2以前如何更新之1.2
如果你是装过NVjdc 并且root下存在nolanjdc 文件夹

并且你的浏览器和配置已经在/root/nolanjdc文件下了


请你将你现有的/root/nolanjdc更换名称 如nolanjdcdb
```
mv /root/nolanjdc /root/nolanjdcdb
```

然后执行步骤一 拉取代码
国内
```
git clone https://ghproxy.com/https://github.com/NolanHzy/nvjdcdocker.git /root/nolanjdc
```
国外
```
git clone https://github.com/NolanHzy/nvjdcdocker.git /root/nolanjdc
```


然后将刚刚更换名称文件夹 如nolanjdcdb中的 配置文件放到/root/nolanjdc/Config 文件夹中
```
 cd /root/nolanjdc &&  mkdir -p  Config &&  mv /root/nolanjdcdb/Config.json /root/nolanjdc/Config/Config.json
```

将刚刚更换名称文件夹 如nolanjdcdb 中的浏览器所有文件放到/root/nolanjdc/.local-chromium/Linux-884014 文件夹中
```
 cd /root/nolanjdc &&    mv /root/nolanjdcdb/.local-chromium /root/nolanjdc/.local-chromium
```

删除容器
```
docker rm -f nolanjdc 
```
然后从步骤9开始即可

后续更新只需要按照下方代码更新即可


## 更新

```
cd /root/nolanjdc
```
```
docker stop nolanjdc
```
```
git pull
```
```
docker start nolanjdc
```


## 特别声明:

* 本仓库涉仅用于测试和学习研究，禁止用于商业用途，不能保证其合法性，准确性，完整性和有效性，请根据情况自行判断.

* 本项目内所有资源文件，禁止任何公众号、自媒体进行任何形式的转载、发布。

* Nolan对任何代码问题概不负责，包括但不限于由任何脚本错误导致的任何损失或损害.

* 间接使用本仓库搭建的任何用户，包括但不限于建立VPS或在某些行为违反国家/地区法律或相关法规的情况下进行传播, Nolan对于由此引起的任何隐私泄漏或其他后果概不负责.

* 请勿将本项目的任何内容用于商业或非法目的，否则后果自负.

* 如果任何单位或个人认为该项目的脚本可能涉嫌侵犯其权利，则应及时通知并提供身份证明，所有权证明，我们将在收到认证文件后删除相关代码.

* 任何以任何方式查看此项目的人或直接或间接使用本仓库项目的任何脚本的使用者都应仔细阅读此声明。Nolan 保留随时更改或补充此免责声明的权利。一旦使用并复制了任何本仓库项目的规则，则视为您已接受此免责声明.

**您必须在下载后的24小时内从计算机或手机中完全删除以上内容.**  </br>
> ***您使用或者复制了本仓库且本人制作的任何脚本，则视为`已接受`此声明，请仔细阅读***

## 多谢

