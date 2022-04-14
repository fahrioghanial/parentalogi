import React, { useEffect } from "react";
import styles from "../../styles/Home.module.css";
import dynamic from "next/dynamic";
import SuperTokens from "supertokens-auth-react";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import HeadTitle from "../../components/headTitle";
import Image from 'next/image';

const SuperTokensComponentNoSSR = dynamic(
  new Promise((res) => res(SuperTokens.getRoutingComponent)),
  { ssr: false }
);

export default function Auth() {
  useEffect(() => {
    if (SuperTokens.canHandleRoute() === false) {
      redirectToAuth();
    }

    // document.getElementById("supertokens-root").innerHTML = "Masuk";
    // document.shadowRoot.querySelectorAll("monkey")[0].innerHTML =
    //   "change by class";
    // document.shadow;
  }, []);

  return (
    <div className={styles.container}>
      <HeadTitle title="Auth"></HeadTitle>
      <main className={styles.main}>
        <div className="container flex flex-col gap-4 ">
          <Image
            className="w-[120px] m-auto"
            src="/favicon.ico"
            alt="Parentalogi"
          />
          <h1 className="text-[#3980BF] text-center font-semibold text-5xl font-asap">
            Parentalogi
          </h1>
        </div>
        <SuperTokensComponentNoSSR />
      </main>
    </div>
  );
}
