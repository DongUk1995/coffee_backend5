export const processCategory = (category) => {
  const slug = category
    .match(/[^\s]+/g)
    ?.join("-")
    .toLowerCase();

  return {
    where: {
      name: category,
    },
    create: {
      name: category,
      slug,
    },
  };
};
