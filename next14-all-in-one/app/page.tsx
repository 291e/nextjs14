import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
        <span className="text-9xl">로고</span>
        <h1 className="text-4xl">Metabank 360</h1>
        <h2 className="text-2xl">Metabank 360에 어서오세요!</h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link className="py-2.5 btn-meta text-lg " href="/create-account">
          시작하기
        </Link>
        <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Link className="hover:underline" href="/login">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
