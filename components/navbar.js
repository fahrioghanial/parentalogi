import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

export default function Navbar() {
  const [keyword, setKeyword] = useState("");
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/profile`, {
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  async function masukClicked() {
    redirectToAuth("signin");
  }

  const router = useRouter();

  const aboutClicked = () => {
    router.push("/about");
  };

  const settingsClicked = () => {
    router.push("/settings/profil");
  };

  const profileClicked = () => {
    router.push("/profile");
  };

  const createPostClicked = () => {
    router.push("/post/createpost");
  };

  const logoutClicked = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      // body: JSON.stringify(comment),
    }).then(() => {
      console.log("berhasil logout");
      EmailPassword.redirectToAuth();
    });
  };

  useEffect(() => {
    const profilePicture = document.querySelector("#profile-picture");
    const navMenu = document.querySelector("#nav-menu");
    const navMenuInside = document.querySelector("#nav-menu-inside");
    document.body.addEventListener("click", function () {
      profilePicture.classList.remove("border-white");
      profilePicture.classList.remove("border-4");
      navMenuInside.classList.add("hidden");
    });
    profilePicture.addEventListener("click", function (ev) {
      profilePicture.classList.toggle("border-white");
      profilePicture.classList.toggle("border-4");
      profilePicture.classList.toggle("rounded-full");
      navMenuInside.classList.toggle("hidden");
      ev.stopPropagation();
    });

    // window.onscroll = function () {
    //   const header = document.querySelector("header");
    //   const fixedNav = header.offsetTop;

    //   if (window.pageYOffset > fixedNav) {
    //     header.classList.add("navbar-fixed");
    //   } else header.classList.remove("navbar-fixed");
    // };
  }, []);

  return (
    <>
      {/* Navbar start */}
      <header className="bg-black top-0 left-0 w-full flex items-center font-asap fixed z-[9999]">
        <div className="container">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center px-4 md:px-16 ">
              <Link href="/dashboard">
                <a>
                  <div className="mr-8 flex-none rounded-full hover:border-blue-400 hover:border-4">
                    <img src="/favicon.ico" alt="parentalogi" className="" />
                  </div>
                </a>
              </Link>
            </div>
            <div className="flex items-center px-4 ">
              <nav
                id="nav-menu"
                className="pt-3 block static bg-transparent max-w-full"
              >
                <ul className="flex md:text-xl">
                  <li className="group">
                    <button
                      className="invisible md:visible text-white font-semibold md:py-2 md:mx-8 flex group-hover:bg-blue-900 md:bg-blue-500 md:rounded-lg md:px-3"
                      onClick={createPostClicked}
                    >
                      Buat Post
                    </button>
                  </li>
                  <li className="group">
                    <button id="profile-picture">
                      <div
                        className="bg-contain bg-center bg-no-repeat rounded-full w-12 flex-none h-12"
                        style={{
                          backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/api/avatar/${user.foto_profil})`,
                        }}
                      ></div>
                    </button>
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
                            onClick={profileClicked}
                          >
                            @{user.nama_pengguna}
                          </button>
                        </li>
                        <li className="group">
                          <hr className="bg-white my-4" />
                        </li>
                        <li className="group">
                          <button
                            className="text-white font-semibold py-4 mx-8 flex group-hover:text-[#9CA3AF]"
                            onClick={createPostClicked}
                          >
                            Buat Post
                          </button>
                        </li>
                        <li className="group">
                          <button
                            className="text-white font-semibold py-4 mx-8 flex group-hover:text-[#9CA3AF]"
                            onClick={settingsClicked}
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
