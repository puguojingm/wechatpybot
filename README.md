## 安装
1. 设置npm安装源为淘宝源
   
   ```shell
   npm config set registry https://registry.npm.taobao.org
   ```
   
>  为什么要设置源？
> 
> npm 是NodeJs的包管理工具，使用npm可以安装Nodejs第三方的包或者库。npm 默认安装是从国外的服务器地址下载，由于国内网络问题下载速度会很慢，所以需要更改为国内下载源。
   国内最好的npm源是淘宝的地址，它会实时从国外的Nodejs服务器地址同步所有的第三方包，这样我们想下载的任何包都可以从国内的地址下载，速度会很快。
>
> PS: 几乎所有的语言都有自己的包管理工具，Java使用maven，Python使用pip ,Go 使用 go get/mod , Nodejs 使用npm ...
   
2. 安装依赖的包
   ```
   npm insall
   ```

> 在新建一个NodeJs的项目时，通常会先在项目目录运行`npm init` ， 它会创建一个名为`package.json`的文件。
> 这个json文件里有一个dependencies内容，里面存放所有的需要安装的包。当执行`npm install` 时它会在当前目录下查找`package.json`文件，并自动安装dependencies选项所有的依赖包。
> 
> 我们也可以单独安装一个包，比如我想单独安装`wechaty` 这个包，可以使用下面命令：
>   ```shell
>   npm install wechaty --save
>   ```
>    这里的`--save` 表示在安装完`wechaty`之后会将这个包添加`package.json`到中的dependencies选项中，以便可以在后期直接使用`npm install` 自动安装。

3. 运行
   ```shell
   node example.js
   ```
   运行之后命令行会显示一个微信登录二维码。扫码登录之后，会打印login。登录成功之后，这如果微信收到消息会在命令行打印出来。
## 说明
1. `example.js` 中的`onMessage`函数可以监听收到的消息，可以按照自己的需求在onMessage中自定义需求逻辑
2. app.js 为没有完成的使用express框架提供的http server 服务。

