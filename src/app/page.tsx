import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex justify-between flex-col">
      <div className="navbar bg-base-100 sm:px-16">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">LawGuru</a>
        </div>
        <div className="navbar-end gap-3">
          <Link className="btn" href="/sign-up">
            Sign Up
          </Link>
          <Link className="btn" href="/sign-in">
            Sign In
          </Link>
        </div>
      </div>
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
              <h1 className="mb-5 text-5xl font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
                Welcome to LawGuru
              </h1>
              <p className="mb-5 text-blue-300">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <Link href="/dashboard">
                <button className="btn btn-primary">Get Started</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
