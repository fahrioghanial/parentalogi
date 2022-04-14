import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";

export default function NavbarLanding(props) {
  async function masukClicked() {
    redirectToAuth("signin");
  }

  const router = useRouter();

  const aboutClicked = () => {
    router.push("/about");
  };

  async function logoutClicked() {
    await EmailPassword.signOut();
    router.push("/");
    // EmailPassword.redirectToAuth();
  }

  return (
    <>
      {/* Navbar start */}
      <header className="bg-black absolute top-0 left-0 w-full flex items-center z-10 font-asap">
        <div className="container">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center px-4 md:px-16 ">
              <div className="mr-8 flex-none">
                <img
                  src="favicon.svg"
                  alt="parentalogi"
                  className="py-2 md:p-0"
                />
              </div>
              <form action="" className="invisible md:visible">
                <input
                  type="text"
                  name="search-box"
                  id="search-box"
                  placeholder="Cari..."
                  className="p-2 rounded-md md:w-80 w-0"
                />
              </form>
            </div>
            <div className="flex items-center px-4 ">
              <nav
                id="nav-menu"
                className="py-5 block static bg-transparent max-w-full "
              >
                <ul className="flex md:text-xl">
                  <li className="group">
                    <button
                      className="invisible md:visible text-white font-semibold md:py-2 md:mx-8 flex group-hover:bg-[#9CA3AF] md:bg-[#3980BF] md:rounded-lg md:px-3"
                      // onClick={}
                    >
                      Buat Post
                    </button>
                  </li>
                  <li className="group">
                    <button className="mr-8 md:hidden">
                      <svg
                        width="45"
                        height="45"
                        viewBox="0 0 88 88"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M86.829 81.172L64.128 58.471C69.2357 52.0964 72.013 44.1685 72 36C72 16.118 55.883 0 36 0C16.118 0 0 16.118 0 36C0 55.882 16.118 72 36 72C44.5 72 52.312 69.054 58.471 64.127L81.172 86.828C81.543 87.2 81.9838 87.495 82.4691 87.6962C82.9544 87.8973 83.4747 88.0005 84 88C84.7911 88 85.5644 87.7655 86.2222 87.326C86.88 86.8866 87.3927 86.2619 87.6955 85.5311C87.9983 84.8002 88.0776 83.996 87.9234 83.2201C87.7691 82.4442 87.3883 81.7315 86.829 81.172ZM36 64C20.536 64 8 51.464 8 36C8 20.536 20.536 8 36 8C51.465 8 64 20.536 64 36C64 51.464 51.465 64 36 64Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </li>
                  <li className="group">
                    <button className="">
                      <svg
                        width="45"
                        height="45"
                        viewBox="0 0 60 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M54.7502 46.8834L54.1835 46.3834C52.5759 44.951 51.1688 43.3085 50.0002 41.5C48.7239 39.0043 47.9589 36.2788 47.7502 33.4834V25.25C47.7612 20.8594 46.1685 16.6158 43.2714 13.3167C40.3743 10.0175 36.3721 7.88981 32.0168 7.33337V5.18337C32.0168 4.59327 31.7824 4.02733 31.3651 3.61006C30.9479 3.19279 30.3819 2.95837 29.7918 2.95837C29.2017 2.95837 28.6358 3.19279 28.2185 3.61006C27.8012 4.02733 27.5668 4.59327 27.5668 5.18337V7.36671C23.2506 7.96325 19.2968 10.1038 16.4377 13.3919C13.5786 16.68 12.008 20.8928 12.0168 25.25V33.4834C11.8081 36.2788 11.0431 39.0043 9.76683 41.5C8.6183 43.304 7.23382 44.9463 5.65016 46.3834L5.0835 46.8834V51.5834H54.7502V46.8834Z"
                          fill="white"
                        />
                        <path
                          d="M25.5332 53.3334C25.6794 54.3898 26.2029 55.3577 27.007 56.0583C27.8112 56.7589 28.8417 57.1448 29.9082 57.1448C30.9747 57.1448 32.0052 56.7589 32.8094 56.0583C33.6136 55.3577 34.1371 54.3898 34.2832 53.3334H25.5332Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </li>
                  <li className="group">
                    <button
                      id="profile-picture"
                      className="bg-[url('/test.png')] bg-center rounded-full w-12 h-12 ml-8 "
                    ></button>
                  </li>
                  <li className="">
                    <nav
                      id="nav-menu-inside"
                      className="hidden absolute py-5 bg-black w-full right-4 top-full rounded-lg shadow-lg max-w-[250px]"
                    >
                      <ul className="block">
                        <li className="group">
                          <button
                            className="text-white font-semibold py-2 mx-8 flex group-hover:text-[#9CA3AF]"
                            // onClick={}
                          >
                            @fahrioghanial
                          </button>
                        </li>
                        <li className="group">
                          <hr className="bg-white my-4" />
                        </li>
                        <li className="group">
                          <button
                            className="text-white font-semibold py-4 mx-8 flex group-hover:text-[#9CA3AF]"
                            // onClick={}
                          >
                            Buat Post
                          </button>
                        </li>
                        <li className="group">
                          <button
                            className="text-white font-semibold py-4 mx-8 flex group-hover:text-[#9CA3AF]"
                            // onClick={}
                          >
                            Pengaturan
                          </button>
                        </li>
                        <li className="group">
                          <hr className="bg-white my-4" />
                        </li>
                        <li className="group">
                          <button
                            className="text-white font-semibold py-4 mx-8 flex group-hover:text-[#9CA3AF]"
                            onClick={logoutClicked}
                          >
                            Keluar
                          </button>
                        </li>
                      </ul>
                    </nav>
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
