module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production' ? '/analyzer/' : '/',
  runtimeCompiler: true
}
