import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/wangyiheng-blog/",

  lang: "zh-CN",
  title: "DG Blog",
  description: "文档站点",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
