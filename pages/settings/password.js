import HeadTitle from "../../components/headTitle";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "../../components/footer";
import Heading from "../../components/heading";
import Image from "next/image";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import dynamic from "next/dynamic";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const EmailPasswordAuthNoSSR = dynamic(
  new Promise((res) => res(EmailPassword.EmailPasswordAuth)),
  { ssr: false }
);

export default function PasswordProtected() {
  return (
    <EmailPasswordAuthNoSSR>
      <Password />
    </EmailPasswordAuthNoSSR>
  );
}

function Password() {
  const router = useRouter();

  const [nama_pengguna, setNamaPengguna] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [isSame, setIsSame] = useState(false);
  const [isOldPasswordWrong, setIsOldPasswordWrong] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isViewCurrentPass, setIsViewCurrentPass] = useState(false);
  const [isViewNewPass, setIsViewNewPass] = useState(false);
  const [isViewNewPassConfirm, setIsViewNewPassConfirm] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/profile`, {
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        setNamaPengguna(data.nama_pengguna);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPasswordConfirm != newPassword) {
      alert("Konfirmasi kata sandi tidak sesuai!");
    } else {
      const password = { oldPassword, newPassword };
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          body: JSON.stringify(password),
        }
      )
        .then((res) => res.text())
        .then((data) => {
          if (data.includes("salah")) {
            setIsOldPasswordWrong(true);
          } else {
            console.log("password berhasil diubah");
            setIsOldPasswordWrong(false);
            setIsPasswordChanged(true);
          }
        });
    }
  };

  const handleGoToAuth = (e) => {
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

  const viewCurrentPass = (e) => {
    e.preventDefault();
    if (isViewCurrentPass) {
      setIsViewCurrentPass(false);
    } else setIsViewCurrentPass(true);
  };
  const viewNewPass = (e) => {
    e.preventDefault();
    if (isViewNewPass) {
      setIsViewNewPass(false);
    } else setIsViewNewPass(true);
  };
  const viewNewPassConfirm = (e) => {
    e.preventDefault();
    if (isViewNewPassConfirm) {
      setIsViewNewPassConfirm(false);
    } else setIsViewNewPassConfirm(true);
  };

  let eyeCurrent;
  let eyeNew;
  let eyeNewConf;
  if (isViewCurrentPass) {
    eyeCurrent = <AiFillEyeInvisible size={32} />;
  } else {
    eyeCurrent = <AiFillEye size={32} />;
  }
  if (isViewNewPass) {
    eyeNew = <AiFillEyeInvisible size={32} />;
  } else {
    eyeNew = <AiFillEye size={32} />;
  }
  if (isViewNewPassConfirm) {
    eyeNewConf = <AiFillEyeInvisible size={32} />;
  } else {
    eyeNewConf = <AiFillEye size={32} />;
  }

  return (
    <>
      <HeadTitle />
      <Heading />

      {console.log(isOldPasswordWrong)}
      {/* Options section start */}
      <div
        className={`mt-24 p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg ${
          isOldPasswordWrong ? "visible" : "hidden"
        }`}
        role="alert"
      >
        <span className="font-medium">Kata sandi saat ini salah!</span> Masukkan
        kata sandi saat ini dengan benar!
      </div>

      <section
        id="dashboard"
        className={`${isOldPasswordWrong ? "" : "pt-32"} font-asap bg-white`}
      >
        <div className="container">
          <div className="md:ml-28 ml-5">
            <p className="font-asap text-[#3980BF] mb-4 text-3xl">
              Setelan Sandi untuk <b>@{nama_pengguna}</b>
            </p>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full self-top md:w-1/5 px-5 md:pl-10 md:ml-16">
              <div className="rounded-xl shadow-lg overflow-hidden mb-10">
                <div className="py-6 px-6 bg-[#3980BF] text-white flex flex-col gap-4 font-bold text-2xl">
                  <div
                    className={`hover:text-black ${
                      router.pathname == "/settings/profil" ? "text-black" : ""
                    }`}
                  >
                    <Link href="/settings/profil" className="font-medium">
                      Profil
                    </Link>
                  </div>
                  <div
                    className={`hover:text-black ${
                      router.pathname == "/settings/password"
                        ? "text-black"
                        : ""
                    }`}
                  >
                    <Link href="/settings/password" className="font-medium">
                      Sandi
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full self-top md:w-3/6 mx-5 md:pl-1">
              {/* Segment kata sandi starts*/}
              <form onSubmit={handleSubmit}>
                <div className="rounded-xl shadow-lg overflow-hidden mb-4">
                  <div className="py-6 px-6 bg-[#3980BF] text-white flex flex-col gap-2">
                    <div className="ml-1">
                      <p className="font-asap mb-4 text-3xl font-bold">
                        Kata Sandi
                      </p>
                    </div>
                    <p className="font-medium text-xl">Kata Sandi saat Ini</p>
                    <div className="flex gap-3 items-center">
                      <input
                        type={`${isViewCurrentPass ? "text" : "password"}`}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="p-2 rounded-md w-full text-black"
                      />
                      <button onClick={viewCurrentPass}>{eyeCurrent}</button>
                    </div>
                    <p className="font-medium text-xl">Kata Sandi Baru</p>
                    <div className="flex gap-3 items-center">
                      <input
                        type={`${isViewNewPass ? "text" : "password"}`}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="p-2 rounded-md w-full text-black"
                      />
                      <button onClick={viewNewPass}>{eyeNew}</button>
                    </div>
                    <p className="font-medium text-xl">
                      Konfirmasi Kata Sandi Baru
                    </p>
                    <div className="flex gap-3 items-center">
                      <input
                        type={`${isViewNewPassConfirm ? "text" : "password"}`}
                        value={newPasswordConfirm}
                        onChange={(e) => setNewPasswordConfirm(e.target.value)}
                        className="p-2 rounded-md w-full text-black"
                      />
                      <button onClick={viewNewPassConfirm}>{eyeNewConf}</button>
                    </div>
                    <p className="text-red-200 font-semibold">
                      {newPasswordConfirm != newPassword
                        ? "Masukkan konfirmasi kata sandi baru yang sesuai!"
                        : ""}
                    </p>
                    <button
                      className="border-blue-500 w-2/5 mt-2 border-2 rounded-lg py-2 px-4 font-bold bg-white bold text-[#3980BF]"
                      type="submit"
                    >
                      Simpan Kata Sandi Baru
                    </button>
                  </div>
                </div>
              </form>
              {/* Segment kata sandi ends*/}
            </div>
          </div>
        </div>
      </section>
      {/* Options section end */}
      <section
        className={`bg-black/60 pt-36 fixed inset-0 z-[9999] 
        ${isPasswordChanged ? "visible" : "hidden"}`}
      >
        <div className="p-10 md:w-1/3 bg-white shadow-lg rounded-lg m-auto">
          <div className="flex flex-col">
            <p className="md:text-2xl text-xl font bold">
              Berhasil Mengedit Kata Sandi!
            </p>
            <p className="md:text-2xl text-xl font bold mb-5">
              Silakan Masuk Kembali
            </p>
            <button
              className="py-2 px-3 bg-green-500 text-white hover:bg-green-700 text-md rounded-lg"
              onClick={handleGoToAuth}
            >
              OK
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
