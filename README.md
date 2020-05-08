# Link Mark Server
服务于Link Mark Client 的node服务,使用koa框架搭建。

项目亮点
- nodemon，开发环境热加载
- 服务端es6语法支持，使用 @babel-polyfill @babel-register @babel/preset-env 使服务端支持es6语法
- 链接远程mongodb数据库
- 安全防范（暂未实现）
  csrf  
    set-Cookies :  ... , same-site 
    referer
