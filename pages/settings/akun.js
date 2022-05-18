import HeadTitle from "../../components/headTitle";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Image from "next/image";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import dynamic from "next/dynamic";

const EmailPasswordAuthNoSSR = dynamic(
  new Promise((res) => res(EmailPassword.EmailPasswordAuth)),
  { ssr: false }
);

export default function AkunProtected() {
  return (
    <EmailPasswordAuthNoSSR>
      <Akun />
    </EmailPasswordAuthNoSSR>
  );
}

function Akun() {
  async function daftarClicked() {
    redirectToAuth("signup");
  }

  const router = useRouter();

  const [nama_pengguna, setNamaPengguna] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [isSame, setIsSame] = useState(false);

  useEffect(() => {
    fetch("https://parentalogi.me/api/users/profile", {
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
      fetch(`https://parentalogi.me/api/users/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify(password),
      }).then((response) => {
        console.log("Password Changed");
        console.log(response.message);
      });
    }
  };

  return (
    <>
      <HeadTitle />
      <Navbar />

      {/* Options section start */}
      <section id="dashboard" className="pt-32 font-asap bg-white">
        <div className="container">
          <div className="md:ml-28 ml-5">
            <p className="font-asap text-[#3980BF] mb-4 text-3xl">
              Setelan Akun untuk <b>@{nama_pengguna}</b>
            </p>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full self-top md:w-1/5 px-5 md:pl-10 md:ml-16">
              <div className="rounded-xl shadow-lg overflow-hidden mb-10">
                <div className="py-6 px-6 bg-[#3980BF] text-white flex flex-col gap-4 font-bold text-2xl">
                  <Link href="/settings/profil" className="font-medium">
                    Profil
                  </Link>
                  <Link href="/settings/akun" className="font-medium">
                    Akun
                  </Link>
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
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="p-2 rounded-md w-full text-black"
                    />
                    <p className="font-medium text-xl">Kata Sandi Baru</p>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="p-2 rounded-md w-full text-black"
                    />
                    <p className="font-medium text-xl">
                      Konfirmasi Kata Sandi Baru
                    </p>
                    <input
                      type="password"
                      value={newPasswordConfirm}
                      onChange={(e) => setNewPasswordConfirm(e.target.value)}
                      className="p-2 rounded-md w-full text-black"
                    />
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
      <Footer />
    </>
  );
}
