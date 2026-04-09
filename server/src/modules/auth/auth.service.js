import * as authQuery from "./auth.data.js";
import * as hashing from "../../utils/hash.js";
import { jwtGenerator } from "../../utils/jwt/jwtGenerator.js";
import generateCode from "../../utils/generateCode.js";
import { sendEmail } from "../../utils/email/nodemailer.js";
import {AppError} from "../../utils/AppError.js";
import  ROLES  from "../../../database/roles.js";
import { registrationTemplate } from "../../utils/email/emailTemplate.js";


export const register = async ({ userName, email, password, role=ROLES.USER }) => {
  const userExists = await authQuery.findUserByEmail(email);
  if (userExists) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await hashing.hash(password);
  const code = generateCode();

  await sendEmail({
    to: email,
    subject: "Confirm Registration",
    html: registrationTemplate(userName, code),
  });

  const newUser = await authQuery.createUser({
    userName,
    email,
    password: hashedPassword,
    code,
    isConfirmed: false,
    role,
  });
  return newUser;
};
 
export const login = async ({ email, password }) => {
  const user = await authQuery.findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials", 401);
  }
  if (!user.confirmEmail) {
    throw new Error("Email is not confirmed", 401);
  }

  
  const isMatch = await hashing.compareHash(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials", 401);
  }
  const token = jwtGenerator({ id: user.id, email: user.email });
  return { user, token };
};

export const confirmEmail = async ({ email, code }) => {
  const user = await authQuery.findUserByEmail(email);
  if (!user) {
    throw new AppError("User not found", 400);
  }
  if (user.isConfirmed) {
    throw new AppError("Email is already confirmed", 400);
  }
  if (user.code !== code) {
    throw new AppError("Invalid confirmation code", 400);
  }
  await authQuery.confirmEmail(email, code);
  return true;
};
