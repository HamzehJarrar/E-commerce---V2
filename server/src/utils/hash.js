import bcrypt from "bcrypt";

export const hash = async (Plain) => {
  return await bcrypt.hash(Plain, parseInt(process.env.SALT));
};

export const compareHash = async (Plain, hashed) => {
  return await bcrypt.compare(Plain, hashed);
};

