import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div
        className="hero min-h-[500px] bg-base-200"
        // style={{
        //   backgroundImage:
        //     "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        // }}
      >
        {/* <div className="hero-overlay bg-opacity-60"></div> */}
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <div className="flex justify-center">
              <Image
                src="/lawlogo1.png"
                className="flex justify-center"
                alt="LawGuru"
                width={200}
                height={200}
              />
            </div>
            <h1 className="mb-5 text-5xl font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
              Welcome to LawGuru
            </h1>
            <p className="mb-5 text-blue-300">
              your go-to platform for AI-powered legal advice and guidance!
            </p>
            <Link href="/dashboard">
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
