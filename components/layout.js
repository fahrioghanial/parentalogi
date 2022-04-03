import Head from "next/head";

export default function Layout(props) {
  return (
    <div>
      <Head>
        <title>
          Parentalogi {props.title != null ? " - " + props.title : ""}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
