import Footer from "../components/footer";
import Image from "next/image";
import Link from "next/link";
import HeadTitle from "../components/headTitle";

export default function Home() {
  return (
    <>
      <HeadTitle title="About" />
      {/* Home section start */}
      <section id="home" className="font-asap">
        <div className="container  m-auto">
          <div className="flex flex-wrap ">
            <div className="w-full text-center mt-8 ">
              <Link href={`/dashboard`}>
                <a>
                  <Image
                    src="/logo-parentalogi.png"
                    alt="parentalogi"
                    className="py-2"
                    width="250px"
                    height="250px"
                  />
                </a>
              </Link>
            </div>
            <div className="w-full m-auto text-center px-5 md:w-2/3 my-4 ">
              <h1 className="text-3xl text-[#3980BF] font-semibold mb-3 md:text-6xl">
                Parentalogi
              </h1>
              <p className="mb-5 md:text-xl ">
                Selesaikan semua masalah yang anda hadapi bersama-sama di sini.
                Forum diskusi yang umum dan bebas siap memberikan solusi untuk
                anda.
              </p>
            </div>
            {/* <div className="w-full px-4"> */}
            <div className="flex flex-col gap-10 md:flex-row self-center w-full px-4 py-4">
              <div className="w-full md:w-1/4 self-center text-center text-xl">
                <Image
                  src="/Dicky.jpg"
                  alt="parentalogi"
                  className="py-2 rounded-full"
                  width="150px"
                  height="150px"
                />
                <p className="text-center py-1 text-2xl font-bold text-[#3980BF]">
                  Project Manager
                </p>
                <p>Dicky Rahma Hermawan</p>
              </div>
              <div className="w-full md:w-1/4 self-center text-center text-xl">
                <Image
                  src="/Fahrio.jpg"
                  alt="parentalogi"
                  className="py-2 rounded-full"
                  width="150px"
                  height="150px"
                />
                <p className="text-center py-1 text-2xl font-bold text-[#3980BF]">
                  Frontend Developer
                </p>
                <p>Mohamad Fahrio Ghanial Fatihah</p>
              </div>
              <div className="w-full md:w-1/4 self-center text-center text-xl">
                <Image
                  src="/Rahman.jpg"
                  alt="parentalogi"
                  className="py-2 rounded-full"
                  width="150px"
                  height="150px"
                />
                <p className="text-center py-1 text-2xl font-bold text-[#3980BF]">
                  Backend Developer
                </p>
                <p>Aghniya Abdurrahman Mannan</p>
              </div>
              <div className="w-full md:w-1/4 self-center text-center text-xl">
                <Image
                  src="/Abim.jpg"
                  alt="parentalogi"
                  className="py-2 rounded-full"
                  width="150px"
                  height="150px"
                />
                <p className="text-center py-1 text-2xl font-bold text-[#3980BF]">
                  UI/UX Designer
                </p>
                <p>Mochamad Arya Bima Agfian</p>
              </div>
            </div>
            {/* </div> */}
            <Link href={"/dashboard"}>
              <a className="py-2 px-3 bg-blue-500 hover:bg-blue-900 text-white font-bold m-auto mt-10 rounded-xl md:text-xl">
                Kembali Ke Beranda
              </a>
            </Link>
          </div>
        </div>
      </section>
      {/* Home section end */}
      <Footer />
    </>
  );
}
