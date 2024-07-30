import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export const metadata = {
  title: "Home",
};

export default async function Product() {
  const initialProduct = await getInitialProducts();
  const revalidate = async () => {
    "use server";
    revalidatePath("/home");
  };

  return (
    <div>
      <ProductList initialProducts={initialProduct} />
      <form action={revalidate}>
        <button>Revalidate</button>
      </form>
      <Link
        href="/add-product"
        className="bg-meta flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:opacity-80"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
