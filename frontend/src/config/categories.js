import {
  MdRestaurantMenu,
  MdLocalMall,
  MdAutoStories,
  MdCommute,
  MdTheaters,
  MdAccountBalance,
  MdCategory,
} from "react-icons/md";

export const categories = {
  Food: {
    Icon: MdRestaurantMenu,
    hex: "#22C55E",
  },
  Shopping: {
    Icon: MdLocalMall,
    hex: "#3B82F6",
  },
  Education: {
    Icon: MdAutoStories,
    hex: "#8B5CF6",
  },
  Transport: {
    Icon: MdCommute,
    hex: "#EF4444",
  },
  Entertainment: {
    Icon: MdTheaters,
    hex: "#EC4899",
  },
  Income: {
    Icon: MdAccountBalance,
    hex: "#F59E0B",
  },
  Default: {
    Icon: MdCategory,
    hex: "#6B7280",
  },
};

export const categoryList = Object.entries(categories).map(([key, value]) => ({
  key,
  Icon: value.Icon,
  hex: value.hex,
}));
