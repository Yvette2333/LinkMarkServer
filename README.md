# Link Mark Server
服务于Link Mark Client 的node服务, 使用koa框架搭建。

This LinkMark include the following features:
- ✅ Using `nodemon` Development environment hot load.
- ✅ Support `ES6` syntax, Using `@babel-polyfill` `@babel-register` `@babel/preset-env`.
- ✅ Connect `Mongodb` Database.
- ✅ Using `ejs` for Email Template.
- ⭕️ API documentation based on JSDoc.
- ⭕️ 安全防范
  csrf  
    set-Cookies :  ... , same-site 
    referer
------

# Gettiing Stared

```
# Download node_modules
$ yarn

# Run DataBase
$ yarn start:db

# Run normally
$ yarn start
```


# Before DEV
Change file name `.env.example` to `.env`, and change the environment variables in the file。
```
# MAIL
MAIL_USER=<username@email.com>
MAIL_SMTP=<email_smtp>

# DATABASE CONNECT LINK
DATABASE_URL= 'mongodb+srv://<username>:<password>@xxxx.mongodb.net/?retryWrites=true&w=majority'

# secret key
TOKENSECRET= <youself_token_code>
```
