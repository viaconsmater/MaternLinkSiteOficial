export default {
  title: "Via Consultas",
  description: "Documentação da Via Consultas",
  base: "/docs/",
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Changelog", link: "/changelog/2024/fevereiro" },
    ],
    sidebar: {
      "/changelog/": [
        {
          text: "Changelog",
          items: [
            {
              text: "2024",
              collapsable: true,
              items: [{ text: "Fevereiro", link: "/changelog/2024/fevereiro" }],
            },
            {
              text: "2024",
              collapsable: true,
              items: [{ text: "Março", link: "/changelog/2024/marco" }],
            },
            {
              text: "2024",
              collapsable: true,
              items: [{ text: "Abril", link: "/changelog/2024/abril" }],
            },
            {
              text: "2024",
              collapsable: true,
              items: [{ text: "Maio", link: "/changelog/2024/maio" }],
            },
            {
              text: "2024",
              collapsable: true,
              items: [{ text: "Junho", link: "/changelog/2024/junho" }],
            },
          ],
        },
      ],
    },
  },
};