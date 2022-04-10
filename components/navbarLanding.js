import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";

export default function NavbarLanding(props) {
  async function masukClicked() {
    redirectToAuth("signin");
  }

  const router = useRouter();

  const aboutClicked = () => {
    router.push("/about");
  };

  return (
    <>
      {/* Navbar start */}
      <header className="bg-transparent absolute top-0 left-0 w-full flex items-center z-10 font-asap">
        <div className="container">
          <div className="flex items-center justify-between relative">
            <div className="px-4 md:px-16">
              <h1 className="text-lg text-white font-josefin font-bold py-6 block md:text-3xl">
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
              <nav
                id="nav-menu"
                className="hidden absolute py-5 bg-[#3E85C5] w-full right-4 top-full rounded-lg shadow-lg max-w-[250px] md:block md:static md:bg-transparent md:max-w-full md:shadow-none md:rounded-none"
              >
                <ul className="block md:flex md:text-xl">
                  <li className="group">
                    <button
                      className="text-white font-bold py-2 mx-8 flex group-hover:text-[#9CA3AF]"
                      onClick={aboutClicked}
                    >
                      Tentang Kami
                    </button>
                  </li>
                  <li className="group">
                    <button
                      className="text-white font-bold py-2 mx-8 flex group-hover:bg-[#9CA3AF] md:text-[#3980BF] md:bg-white md:rounded-lg md:px-3"
                      onClick={masukClicked}
                    >
                      Masuk
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      {/* Navbar end */}
    </>
  );
}
