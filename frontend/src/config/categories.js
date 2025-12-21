export const categories = {
  Food: {
    icon: "bx bx-bowl-hot",
    hex: "#22C55E",
  },
  Shopping: {
    icon: "bx bx-shopping-bag",
    hex: "#3B82F6",
  },
  Education: {
    icon: "bx bx-book",
    hex: "#8B5CF6",
  },
  Transport: {
    icon: "bx bx-car",
    hex: "#EF4444",
  },
  Entertainment: {
    icon: "bx bx-film",
    hex: "#EC4899",
  },
  Income: {
    icon: "bx bx-dollar-circle",
    hex: "#F59E0B",
  },
};

/* 🔥 NOWE – do gridów / formularzy */
export const categoryList = Object.entries(categories).map(([key, value]) => ({
  key,
  icon: value.icon,
  hex: value.hex,
}));
