import Head from "next/head";

export default function HeadTitle(props) {
  return (
    <div>
      <Head>
        <title>
          Parentalogi {props.title != null ? " - " + props.title : ""}
        </title>
      </Head>
    </div>
  );
}
