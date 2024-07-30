import CloseButton from "@/components/close-button";
import db from "@/lib/db";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";

export default async function Modal({ params }: { params: { id: string } }) {
  const id = +params.id;
  if (isNaN(id)) {
    return notFound();
  }

  const product = await db.product.findUnique({
    where: {
      id: id,
    },
    select: {
      photo: true,
      title: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div className="absolute w-full h-full z-50 flex justify-center items-center bg-black left-0 top-0 bg-opacity-60">
      <CloseButton />
      <div className="max-w-screen-sm h-1/2 w-full flex justify-center">
        <div className="relative overflow-hidden aspect-1/1 bg-neutral-700 text-neutral-200 rounded-md flex justify-center items-center">
          <Image
            src={`${product.photo}`}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
