import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "文章（已归档）",
      icon: "book",
      prefix: "archived-manual/",
      children: "structure",
    },
    {
      text: "文章（AI编辑）",
      icon: "book",
      prefix: "archived-ai/",
      children: "structure",
    },

    // {
    //   text: "文章（未归档）",
    //   icon: "book",
    //   prefix: "unarchived/",
    //   children: "structure",
    // },
   
    // "intro",
    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://plugin-md-enhance.vuejs.press/zh/guide/content/revealjs/demo.html",
    // },
  ],
});
