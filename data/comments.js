export const getComments = async () => {
  return [
    {
      id: 1,
      body: "Ini komen diggy",
      username: "Diggy Style",
      userId: 1,
      parentId: null,
      createdAt: "24 April 2022",
      img: "https://apps.himatif.org/img/Dicky-Rahma-Hermawan.jpg",
    },
    {
      id: 2,
      body: "Ini komen Abim",
      username: "Abim",
      userId: 2,
      parentId: null,
      createdAt: "24 April 2022",
      img: "https://api.himatif.org/data/assets/foto/2019/31.jpg",
    },
    {
      id: 3,
      body: "first comment",
      username: "Fahrio",
      userId: 3,
      parentId: 1,
      createdAt: "2021",
    },
    {
      id: 4,
      body: "first comment",
      username: "Maman",
      userId: 4,
      parentId: 2,
      createdAt: "2021",
    },
  ];
};
