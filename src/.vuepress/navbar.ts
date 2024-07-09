import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  // "/demo/",
  // {
  //   text: "博文",
  //   icon: "pen-to-square",
  //   prefix: "/posts/",
  //   children: [
  //     {
  //       text: "软件",
  //       icon: "pen-to-square",
  //       prefix: "软件/",
  //       children: [
  //         { text: "buzz使用教程", icon: "pen-to-square", link: "buzz使用教程" },
  //       ],
  //     },
  //     // {
  //     //   text: "苹果",
  //     //   icon: "pen-to-square",
  //     //   prefix: "apple/",
  //     //   children: [
  //     //     { text: "苹果1", icon: "pen-to-square", link: "1" },
  //     //     { text: "苹果2", icon: "pen-to-square", link: "2" },
  //     //     "3",
  //     //     "4",
  //     //   ],
  //     // },
  //     // {
  //     //   text: "香蕉",
  //     //   icon: "pen-to-square",
  //     //   prefix: "banana/",
  //     //   children: [
  //     //     {
  //     //       text: "香蕉 1",
  //     //       icon: "pen-to-square",
  //     //       link: "1",
  //     //     },
  //     //     {
  //     //       text: "香蕉 2",
  //     //       icon: "pen-to-square",
  //     //       link: "2",
  //     //     },
  //     //     "3",
  //     //     "4",
  //     //   ],
  //     // },
  //     // { text: "樱桃", icon: "pen-to-square", link: "cherry" },
  //     // { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },
  //     // "tomato",
  //     // "strawberry",
  //   ],
  // },
  {
    text: "分类",
    icon: "categoryselected",
    children: [
      { text: "软件", icon: "pen-to-square", link: "/category/软件/" },
    ],
  },
  {
    text: "V2 文档",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
