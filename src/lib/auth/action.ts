"use server";

import { getFormDataValue } from "../getFormDataValue";
import { signIn } from "./auth";

export const signInWithCredentials = async (formData: FormData) => {
  return await signIn("credentials", {
    email: getFormDataValue("email", formData),
    password: getFormDataValue("password", formData),
    redirect: false,
  });
};
export const signInWithGoogle = async () => {
  return await signIn("google");
};
export const signInWithApple = async () => {
  return await signIn("apple");
};
