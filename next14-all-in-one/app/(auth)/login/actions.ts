"use server";
import db from "@/lib/db";
import { z } from "zod";
import { PASSWORD_MIN_MAX_LENGTH } from "@/lib/constants";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

// 이메일로 유저 찾기
const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "이 이메일을 사용하는 계정이 존재하지 않습니다."),
  password: z
    .string({
      required_error: "비밀번호를 입력하세요.",
    })
    .min(PASSWORD_MIN_MAX_LENGTH),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    // 유저가 존재할 시 비밀번호 해시값 찾기
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
    // 로그인
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      // redirect "/profile"
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["잘못된 비밀번호입니다."],
          email: [],
        },
      };
    }
  }
}
