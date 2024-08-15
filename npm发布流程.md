# npm 包发布流程（粗略）

## 1.创建项目并且初始化

```js
// 项目创建 lsy-util
npm init/npm init -y
```

## 2.配置 package.json 文件

```js
{
    "name": "lsy-util",
    "version": "0.0.4",// 发布的版本，每次都不能一样
    "description": "赖某人的常用功能封装",// 包的描述
    "main": "src",// 入口文件（这里我用的文件夹，如果只有一个入口文件可以直接写到文件。例：index.js）
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [ // 检索关键字
        "lsy-util"
    ],
    "author": "",
    "license": "ISC",// 项目许可证
    "exports": {// 这里是我配置的多文件入口
        ".": {
            "import": "./src/index.js",
            "require": "./src/index.js"
        },
        "./ts": {
            "import": "./src/indexTs.ts",
            "require": "./src/indexTs.ts"
        }
    }
}
```

...项目写完之后

## 发布之前需要 npm 账号，如果没有先注册（注意邮箱是可用的，因为要发验证码的）

## 命令行窗口登录 npm 账号

```js
npm login
// 登录成功后会看到一下命令提示
// 注意，npm的镜像源一定要是官方的，不要是淘宝之类的，否则会报错403
// 修改命令
npm config set registry https://registry.npmmirror.com/
npm config set registry https://registry.npmjs.org/
//
Logged in as lsy5201314 on https://registry.npmjs.org/
```

## 发布 npm 包

```js
npm publish
// 如果正常会项目的一些数据提示，如下
npm notice
npm notice package: lsy-util@0.0.5
npm notice === Tarball Contents ===
npm notice 18.9kB src/index.js
npm notice 534B   package.json
npm notice 2.2kB  README.md
npm notice 21.7kB src/indexTs.ts
npm notice === Tarball Details ===
npm notice name:          lsy-util
npm notice version:       0.0.5
npm notice package size:  8.4 kB
npm notice unpacked size: 43.4 kB
npm notice shasum:        c25866f88b4c88***************
npm notice integrity:     sha512-5FJL/1sWd6LKQ[...]Cf1PbaqnJSC7g==
npm notice total files:   4
npm notice
+ lsy-util@0.0.5 // 注意当有了这一串代码才代表发布成功
```
