module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset',{
      useBuiltIns: 'entry',
      // polyfills: [
      //     'es.promise',
      //     'es.symbol'
      //   ]
      }
    ]
  ],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: "css" } 
    ],
    ["@babel/plugin-transform-runtime"],
  ]
}
