import Layout from "../components/layout";
import styles from "../styles/Home.module.css";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";

export default function Home() {
  async function masukClicked() {
    redirectToAuth("signin");
  }

  async function daftarClicked() {
    redirectToAuth("signup");
  }

  return (
    <div className={styles.container}>
      <Layout />
      <main className={styles.main}>
        <h1 className="font-asap text-5xl">Welcome to Parentalogi</h1>
        <br />
        <button
          onClick={masukClicked}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Masuk
        </button>
        <br />
        <button
          onClick={daftarClicked}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Daftar
        </button>
      </main>
    </div>
  );
}
