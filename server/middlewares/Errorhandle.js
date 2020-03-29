class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = code
  }
}
const ErrorHandle = async (ctx, next) => {
  // console.log(ctx)
  // ctx.body = '404'
  try {
    // 利用洋葱圈模型的特性，所有请求都会经过这里
    await next()
  } catch (error) {
    console.log('error handle ...',error)
    const isHttpException = error instanceof HttpException
    const isDev = global.config.environment = 'dev'
    if (isDev && !isHttpException) {
      throw error
    }
    // 已知错误
    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        errorCode: error.errorCode,
        request: `${ctx.method}: ${ctx.path}`
      }
      ctx.status = error.code
    } else {
      // 未知错误
      ctx.body = {
        msg: '服务器内部错误',
        errorCode: 999,
        request: `${ctx.method}: ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}
export  default ErrorHandle