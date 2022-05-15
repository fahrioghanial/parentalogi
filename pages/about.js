import styles from "../styles/Home.module.css";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import Footer from "../components/footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <>
      {/* Home section start */}
      <section
        id="home"
        className="font-asap"
      >
        <div className="container">
          <div className="flex flex-col">
            <div className="w-full self-center md:w-max mt-8">
              <Link href="/" passHref>
                <Image
                  src="/LogoParentalogi.png"
                  alt="parentalogi"
                  className="py-2"
                  width="250px"
                  height="250px"
                />
              </Link>
            </div>
            <div className="w-full self-center px-5 md:w-2/3 mb-4">
              <h1 className="text-3xl text-center text-[#3980BF] font-semibold mb-3 md:text-6xl">
                Parentalogi
              </h1>
              <p className="mb-5 md:text-xl text-center">
                Selesaikan semua masalah yang anda hadapi bersama-sama di sini.
                Forum diskusi yang umum dan bebas siap memberikan solusi untuk
                anda.
              </p>
            </div>
            <div className="w-full px-4">
              <div className="flex flex-wrap items-center">
                <div className="w-1/4 self-center text-center text-xl">
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
                  <p>
                    Dicky Rahma Hermawan
                  </p>
                </div>
                <div className="w-1/4 self-center text-center text-xl">
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
                  <p>
                    Mohamad Fahrio Ghanial Fatihah
                  </p>
                </div>
                <div className="w-1/4 self-center text-center text-xl">
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
                  <p>
                    Aghniya Abdurrahman Mannan
                  </p>
                </div>
                <div className="w-1/4 self-center text-center text-xl">
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
                  <p>
                    Mochamad Arya Bima Agfian
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Home section end */}
      <Footer />
    </>
  );
}
