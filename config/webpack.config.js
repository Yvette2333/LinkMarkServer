const Path = require('path')
console.log(__dirname)
module.exports = {
  resolve: {
    alias: {
      '@': Path.join(__dirname,'/server')
    }
  }
}