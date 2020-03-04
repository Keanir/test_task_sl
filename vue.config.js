module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      title: "ПЁСЕЛЬ"
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "~@/assets/style/functions.scss";
          @import "~@/assets/style/variables.scss";
          @import "~@/assets/style/fonts.scss";
          @import "~@/assets/style/themes.scss";
        `
      }
    }
  }
}
