import { v4 } from "uuid";
export const generateId = () => {
  return v4();
};

export const BASE_ELO = 1000;
