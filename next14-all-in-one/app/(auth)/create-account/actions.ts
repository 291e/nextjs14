"use server";
import { z } from "zod";
import { PASSWORD_MIN_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const checkPasswords = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "이름은 글자여야 합니다.",
        required_error: "이름을 입력하세요.",
      })
      .min(USERNAME_MIN_LENGTH, "2글자 이상을 입력하세요.")
      .toLowerCase()
      .trim(),

    email: z.string().email().toLowerCase(),

    password: z
      .string()
      .min(PASSWORD_MIN_MAX_LENGTH, "비밀번호 4자리를 입력하세요.")
      .max(PASSWORD_MIN_MAX_LENGTH, "비밀번호 4자리를 입력하세요."),
    confirmPassword: z.string(),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "사용자명이 이미 사용중입니다.",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이메일이 이미 사용중입니다.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    // 유정 정보 db에 저장
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    // db에 저장된 유저는 로그인
    const session = await getSession();
    session.id = user.id;
    await session.save();
    // 리다이렉트 "/home"
    redirect("/profile");
  }
}
