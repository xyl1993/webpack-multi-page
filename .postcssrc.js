// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-aspect-ratio-mini": {},//主要用来处理元素容器宽高比。
    "postcss-write-svg": { utf8: false },
    "postcss-cssnext": {},//该插件可以让我们使用CSS未来的特性
    /**
     * 在不想要把px转换为vw的时候，首先在对应的元素（html）中添加配置中指定的类名.ignore或.hairlines(.hairlines一般用于设置border-width:0.5px的元素中)
     */
    // "postcss-px-to-viewport": {   //postcss-px-to-viewport插件主要用来把px单位转换为vw、vh、vmin或者vmax这样的视窗单位，也是vw适配方案的核心插件之一。
    //   viewportWidth: 750, //视窗的宽度，对应的是我们设计稿的宽度，一般是750
    //   viewportHeight: 1334, //视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
    //   unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
    //   viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
    //   selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
    //   minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
    //   mediaQuery: false // 允许在媒体查询中转换`px`
    // }, 
    /**
     * 插件主要是给CSS的属性添加content的属性，配合viewport-units-buggyfill库给vw、vh、vmin和vmax做适配的操作。
     */
    "postcss-viewport-units":{},
    "cssnano": { //主要用来压缩和清理CSS代码
      preset: "default", 
      autoprefixer: false, 
      zindex:false   //bug暂未解决
    },
    // 由于cssnext和cssnano都具有autoprefixer,
    //事实上只需要一个，所以把默认的autoprefixer删除掉，
    //然后把cssnano中的autoprefixer设置为false
    // "autoprefixer": {}
  }
}
