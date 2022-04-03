import Layout from "../components/layout";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import styles from "../styles/Home.module.css";

export default function Home() {
  async function masukClicked() {
    redirectToAuth("signin");
  }

  async function daftarClicked() {
    redirectToAuth("signup");
  }

  return (
    <div className="bg-gradient-to-b from-[#3E85C5]">
      <Layout />
      <div className="grid grid-cols-8 gap-2">
        <div className="col-span-5">
          <img
            className="w-52 mt-6 ml-10"
            src="/logo-landing.png"
            alt="parentalogi"
          />
        </div>
        <div className="col-span-2 text-right text-white">
          <button className="text-2xl font-semibold font-sans p-2 m-3">
            Tentang Kami
          </button>
        </div>
        <div className="text-center">
          <button
            onClick={masukClicked}
            className="rounded-md bg-white text-[#3980BF] text-2xl font-semibold font-sans p-2 m-3"
          >
            Masuk
          </button>
        </div>
      </div>
      <main className={styles.main}>
        <div className="grid grid-cols-8 gap-2">
          <div className="col-span-5">
            <img
              className="mx-auto"
              src="/Couple bicycle-bro.png"
              alt="parentalogi"
            />
          </div>
          <div className="col-span-3 m-auto pr-10">
            <p className="text-5xl font-bold text-[#3980BF]">Helping Parents</p>
            <br />
            <p className="text-justify font-normal text-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptatem eaque optio eos molestiae atque, eveniet itaque quidem,
              ipsum hic quaerat aut ratione dignissimos cum ducimus? Similique
              provident ullam unde nam?
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
