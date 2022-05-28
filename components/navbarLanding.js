import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function NavbarLanding(props) {
  async function masukClicked() {
    redirectToAuth("signin");
  }

  async function daftarClicked() {
    redirectToAuth("signup");
  }

  const router = useRouter();

  const aboutClicked = () => {
    router.push("/about");
  };

  useEffect(() => {
    const hamburger = document.querySelector("#hamburger");
    const navMenu = document.querySelector("#nav-menu");
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("hamburger-active");
      navMenu.classList.toggle("hidden");
    });

    // window.onscroll = function () {
    //   const header = document.querySelector("header");
    //   const fixedNav = header.offsetTop;

    //   if (window.pageYOffset > fixedNav) {
    //     header.classList.add("navbar-landing-fixed");
    //   } else header.classList.remove("navbar-landing-fixed");
    // };
  }, []);

  return (
    <>
      {/* Navbar start */}
      <header className="bg-transparent absolute top-0 left-0 w-full flex items-center z-10 font-asap">
        <div className="container">
          <div className="flex items-center justify-between relative">
            <div className="px-4 md:px-16">
              <h1 className="text-lg text-white font-josefin font-bold py-3 block md:text-3xl">
                PARENTALOGI
              </h1>
            </div>
            <div className="flex items-center px-4">
              <button
                id="hamburger"
                name="hamburger"
                type="button"
                className="block absolute right-4 md:hidden"
              >
                <span className="w-[30px] h-[2px] my-2 block bg-white"></span>
                <span className="w-[30px] h-[2px] my-2 block bg-white"></span>
                <span className="w-[30px] h-[2px] my-2 block bg-white"></span>
              </button>
              <div
                id="nav-menu"
                className="hidden absolute py-3 bg-[#3E85C5] w-full right-4 top-full rounded-lg shadow-lg max-w-[250px] md:block md:static md:bg-transparent md:max-w-full md:shadow-none md:rounded-none"
              >
                <div className="block md:flex md:text-xl">
                  <div className="group">
                    <button
                      className="text-white font-bold py-2 mx-8 flex group-hover:text-[#9CA3AF] text-2xl"
                      onClick={aboutClicked}
                    >
                      Tentang Kami
                    </button>
                  </div>
                  <div className="group">
                    <button
                      className="text-white font-bold py-2 mx-8 md:m-0 flex group-hover:bg-[#9CA3AF] md:text-[#3980BF] md:bg-white md:rounded-lg md:px-3"
                      onClick={masukClicked}
                    >
                      Masuk
                    </button>
                  </div>
                  <div className="group">
                    <button
                      className="text-white font-bold py-2 mx-8 flex group-hover:bg-[#9CA3AF] md:text-[#3980BF] md:bg-white md:rounded-lg md:px-3"
                      onClick={daftarClicked}
                    >
                      Daftar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Navbar end */}
    </>
  );
}
