import React, { Suspense } from "react";
import getSession from "@/lib/session";
import db from "@/lib/db";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    return user;
  }
  notFound();
}

async function Username() {
  const user = await getUser();
  return <h1>어서오세요. {user?.username}</h1>;
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div>
      <Suspense fallback={"..."}>
        <Username />
      </Suspense>
      <form action={logOut}>
        <button>Log Out</button>
      </form>
    </div>
  );
}
