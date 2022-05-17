import HeadTitle from "../../components/headTitle";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Image from "next/image";
import imageCompression from "browser-image-compression";

export default function Profil() {
  async function daftarClicked() {
    redirectToAuth("signup");
  }

  const router = useRouter();

  const [nama_pengguna, setNamaPengguna] = useState("");
  const [oldUsername, setOldUsername] = useState("");
  const [nama, setNama] = useState("");
  const [bio, setBio] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("");
  const [domisili, setDomisili] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [email, setEmail] = useState("");
  const [foto_profil, setFotoProfil] = useState("");

  useEffect(() => {
    fetch("https://parentalogi.me/api/users/profile", {
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        setNamaPengguna(data.nama_pengguna);
        setOldUsername(data.nama_pengguna);
        setNama(data.nama);
        setBio(data.bio);
        setTanggalLahir(data.tanggal_lahir);
        setDomisili(data.domisili);
        setPekerjaan(data.pekerjaan);
        setEmail(data.email);
        setFotoProfil(data.foto_profil);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const profile = {
      nama_pengguna,
      nama,
      bio,
      tanggal_lahir,
      domisili,
      pekerjaan,
      foto_profil,
    };

    fetch(`https://parentalogi.me/api/users/edit-profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(profile),
    }).then(() => {
      console.log("Profile Changed");
      router.reload(window.location.pathname);
    });
  };

  const [baseImage, setBaseImage] = useState("");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    console.log("originalFile instanceof Blob", file instanceof Blob); // true
    console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);
    console.log(
      "compressedFile instanceof Blob",
      compressedFile instanceof Blob
    ); // true
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    const base64 = await convertBase64(compressedFile);
    const base64string = await convertBase64String(compressedFile);
    setBaseImage(base64);
    setFotoProfil(base64string);
    console.log(base64string);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const convertBase64String = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        const base64String = fileReader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        resolve(base64String);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
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
              Setelan untuk <b>@ {oldUsername}</b>
            </p>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full self-top md:w-1/5 px-5 md:pl-10 md:ml-16">
              <div className="rounded-xl shadow-lg overflow-hidden mb-10">
                <div className="py-6 px-6 bg-[#3980BF] text-white flex flex-col gap-2">
                  <Link href="/settings/profil" className="font-medium">
                    Profil
                  </Link>
                  <Link href="/settings/kustomisasi" className="font-medium">
                    Kustomisasi
                  </Link>
                  <Link href="/settings/notifikasi" className="font-medium">
                    Notifikasi
                  </Link>
                  <Link href="/settings/akun" className="font-medium">
                    Akun
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full self-top md:w-3/6 px-5 md:pl-1">
              {/* Segment pengguna starts*/}
              <form onSubmit={handleSubmit}>
                <div className="rounded-xl shadow-lg overflow-hidden mb-10">
                  <div className="py-6 px-6 bg-[#3980BF] text-white flex flex-col gap-2">
                    <div className="ml-1">
                      <p className="font-asap mb-4 text-3xl font-bold">
                        Pengguna
                      </p>
                    </div>
                    <p className="font-medium text-xl">Nama</p>
                    <input
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder="Nama"
                      className="p-2 rounded-md w-full text-black"
                    />
                    <p className="font-medium text-xl">Email</p>
                    <input
                      type="text"
                      value={email}
                      placeholder="Email"
                      className="p-2 rounded-md w-full text-black bg-slate-400"
                      readOnly
                    />
                    <p className="font-medium text-xl">Username</p>
                    <input
                      type="text"
                      value={nama_pengguna}
                      onChange={(e) => setNamaPengguna(e.target.value)}
                      placeholder="Username"
                      className="p-2 rounded-md w-full text-black"
                    />
                    <p className="font-medium text-xl">Tanggal Lahir</p>
                    <input
                      type="date"
                      value={tanggal_lahir}
                      onChange={(e) => setTanggalLahir(e.target.value)}
                      placeholder="date"
                      className="p-2 rounded-md w-full text-black"
                    />
                    <p className="font-medium text-xl">Foto Profil</p>
                    <div className="flex flex-row">
                      <img
                        src={
                          // baseImage == ""
                          //   ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cover/${foto_profil}`
                          //   :
                          baseImage
                        }
                        alt="parentalogi"
                        className="py-2 md:p-0"
                        width="60px"
                        height="60px"
                      />
                      <input
                        type="file"
                        onChange={(e) => uploadImage(e)}
                        placeholder="Foto"
                        className="ml-4 p-2 rounded-md w-full text-black bg-white"
                      />
                    </div>
                  </div>
                </div>
                {/* Segment pengguna ends*/}

                {/* Segment umum starts*/}
                <div className="rounded-xl shadow-lg overflow-hidden mb-4">
                  <div className="py-6 px-6 bg-[#3980BF] text-white flex flex-col gap-2">
                    <div className="ml-1">
                      <p className="font-asap mb-4 text-3xl font-bold">Umum</p>
                    </div>
                    <p className="font-medium text-xl">Lokasi</p>
                    <input
                      type="text"
                      value={domisili}
                      onChange={(e) => setDomisili(e.target.value)}
                      placeholder="Lokasi"
                      className="p-2 rounded-md w-full text-black"
                    />
                    <p className="font-medium text-xl">Bio</p>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Bio"
                      cols="4"
                      maxLength="200"
                      className="p-2 rounded-md w-full text-black"
                    />
                    <p className="font-medium text-xl">Pekerjaan</p>
                    <input
                      type="text"
                      value={pekerjaan}
                      onChange={(e) => setPekerjaan(e.target.value)}
                      placeholder="Pekerjaan"
                      className="p-2 rounded-md w-full text-black"
                    />
                  </div>
                </div>

                {/* Segment umum ends*/}
                <button
                  className="border-blue-500 border-2 rounded-lg py-2 px-4 float-right"
                  type="submit"
                >
                  Simpan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Options section end */}
      <Footer />
    </>
  );
}
