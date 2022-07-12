# 说明
这是一个基于nodejs的服务器项目，服务请求封装基于koa

# 目录划分
本文的目录划分不是基于业务的，而是基于功能。

其他后续补充
# 插件说明
**dotenv**:解析根目录的.evn文件，用于存储一些自定义的环境变量，比如端口号，域名等等，该插件解析调用config()方法后，
就会把自定义的这些变量插入到node环境的process.env中，我们就可以在这里取。

```
coderhub
├─ .env																			
├─ package-lock.json
├─ package.json
├─ README.md
└─ src
   ├─ app																		
   │  ├─ config.js
   │  ├─ database.js
   │  ├─ error-handle.js
   │  └─ index.js
   ├─ constants
   │  └─ error-types.js
   ├─ controller
   │  ├─ auth.controller.js
   │  └─ user.controller.js
   ├─ main.js
   ├─ middleware
   │  ├─ auth.middleware.js
   │  └─ user.middleware.js
   ├─ router
   │  ├─ auth.router.js
   │  ├─ index.js
   │  └─ user.router.js
   ├─ service
   │  └─ user.service.js
   └─ utils
      └─ password-handle.js

```

