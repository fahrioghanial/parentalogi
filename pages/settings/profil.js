import HeadTitle from "../../components/headTitle";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Footer from "../../components/footer";
import Heading from "../../components/heading";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import dynamic from "next/dynamic";
import ReactCrop from "react-image-crop";
import { makeAspectCrop, centerCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const EmailPasswordAuthNoSSR = dynamic(
  new Promise((res) => res(EmailPassword.EmailPasswordAuth)),
  { ssr: false }
);

export default function ProfilProtected() {
  return (
    <EmailPasswordAuthNoSSR>
      <Profil />
    </EmailPasswordAuthNoSSR>
  );
}

function Profil() {
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
  const [oldFotoProfil, setOldFotoProfil] = useState("");
  const [isUsed, setIsUsed] = useState(false);
  // let isUsed = false;
  let namaPengguna = "";

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/profile`, {
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
        setOldFotoProfil(data.foto_profil);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUsed) {
      alert("Username sudah diambil, silakan gunakan username yang lain");
    } else {
      if (foto_profil == "") {
        convertFromUrlToBase64String(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/avatar/${oldFotoProfil}`,
          function (dataUrl) {
            console.log("RESULT:", dataUrl);
            let foto_profil = dataUrl;
            const profile = {
              nama_pengguna,
              nama,
              bio,
              tanggal_lahir,
              domisili,
              pekerjaan,
              foto_profil,
            };

            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/edit-profile`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "same-origin",
                body: JSON.stringify(profile),
              }
            ).then(() => {
              console.log("Profile Changed");
              router.reload(window.location.pathname);
            });
          }
        );
      } else {
        const profile = {
          nama_pengguna,
          nama,
          bio,
          tanggal_lahir,
          domisili,
          pekerjaan,
          foto_profil,
        };

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/edit-profile`, {
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
      }
    }
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

  function convertFromUrlToBase64String(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result.replace("data:", "").replace(/^.+,/, ""));
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  function checkUsername(username) {
    setNamaPengguna(username);
    // namaPengguna = e.target.event;
    if (username != oldUsername) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${username}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.nama_pengguna);
          if (data.nama_pengguna == username) {
            setIsUsed(true);
            console.log(isUsed);
          } else setIsUsed(false);
        });
    }
  }

  const [src, selectFile] = useState(null);

  const handleFileChange = (e) => {
    selectFile(URL.createObjectURL(e.target.files[0]));
  };

  const [crop, setCrop] = useState({
    unit: "%",
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  });
  const [result, setResult] = useState(null);

  function getCroppedImg(e) {
    e.preventDefault();
    const canvas = document.createElement("canvas");
    const scaleX = selectImg.current.naturalWidth / selectImg.current.width;
    const scaleY = selectImg.current.naturalHeight / selectImg.current.height;
    canvas.width = (crop.width * selectImg.current.width) / 100;
    canvas.height = (crop.height * selectImg.current.height) / 100;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      selectImg.current,
      ((crop.x * selectImg.current.width) / 100) * scaleX,
      ((crop.y * selectImg.current.height) / 100) * scaleY,
      ((crop.width * selectImg.current.width) / 100) * scaleX,
      ((crop.height * selectImg.current.height) / 100) * scaleY,
      0,
      0,
      (crop.width * selectImg.current.width) / 100,
      (crop.height * selectImg.current.height) / 100
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    const base64ImageString = canvas
      .toDataURL("image/jpeg")
      .replace("data:", "")
      .replace(/^.+,/, "");

    setResult(base64Image);
    setFotoProfil(base64ImageString);
  }

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;

    const crop = centerCrop(
      makeAspectCrop(
        {
          // You don't need to pass a complete crop into
          // makeAspectCrop or centerCrop.
          unit: "%",
          width: 90,
        },
        1,
        width,
        height
      ),
      width,
      height
    );

    setCrop(crop);
  }

  const selectImg = useRef(null);

  return (
    <>
      <HeadTitle />
      <Heading />

      {/* Options section start */}
      <section id="dashboard" className="pt-32 font-asap bg-white">
        <div className="container">
          <div className="md:ml-28 ml-5">
            <p className="font-asap text-[#3980BF] mb-4 text-3xl">
              Setelan Profil untuk <b>@{oldUsername}</b>
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
                      onChange={(e) => checkUsername(e.target.value)}
                      placeholder="Username"
                      className="p-2 rounded-md w-full text-black"
                    />

                    <p className="text-red-200 font-semibold">
                      {isUsed ? "Username sudah diambil!" : ""}
                    </p>
                    <p className="font-medium text-xl">Tanggal Lahir</p>
                    <input
                      type="date"
                      value={tanggal_lahir}
                      onChange={(e) => setTanggalLahir(e.target.value)}
                      placeholder="date"
                      className="p-2 rounded-md w-full text-black"
                    />
                    <p className="font-medium text-xl">Foto Profil</p>
                    {src && (
                      <div className="flex flex-col gap-2">
                        <div className="w-fit">
                          <ReactCrop
                            crop={crop}
                            onChange={(crop, percentCrop) =>
                              setCrop(percentCrop)
                            }
                            aspect={1}
                            // className="w-full"
                          >
                            <img
                              src={src}
                              ref={selectImg}
                              onLoad={onImageLoad}
                            />
                          </ReactCrop>
                        </div>
                        <button
                          className="py-2 px-3 bg-green-500 text-white rounded-lg w-fit"
                          onClick={getCroppedImg}
                        >
                          Potong Gambar
                        </button>
                      </div>
                    )}
                    <div className="flex flex-row">
                      <img
                        src={
                          result == null
                            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/avatar/${oldFotoProfil}`
                            : result
                        }
                        className="rounded-full"
                        width="150px"
                        height="150px"
                      />
                      {/* <div className="flex flex-col gap-2"> */}
                      <input
                        type="file"
                        className="p-2 rounded-md ml-3 border-2 w-full bg-white my-auto"
                        accept="image/*"
                        // onChange={(e) => uploadImage(e)}
                        onChange={handleFileChange}
                      />
                    </div>

                    {/* </div> */}
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
                  className="border-blue-500 border-2 rounded-lg py-2 px-4 float-right hover:bg-blue-800 hover:text-white"
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
