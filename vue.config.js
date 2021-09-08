const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/morney-1-website/'
    : '/',
  lintOnSave: false,
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons')
    config.resolve.alias.set('@', resolve('src'));

    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir).end() // 包含 icons 目录
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({ extract: false }).end()
      .use('svgo-loader').loader('svgo-loader').tap(option => ({
      ...option,
      plugins: [ { removeAttrs: { attrs: 'fill' } } ]
    }))
      .end()
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [ { plainSprite: true } ])
    config.module.rule('svg').exclude.add(dir) // 其他 svg loader 排除 icons 目录
  },

}


