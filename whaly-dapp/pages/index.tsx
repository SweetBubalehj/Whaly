import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Threads from "./threads";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Whaly</title>
        <meta content="Generated with Whale love!" name="Whaly dApp" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Threads />
    </div>
  );
};

export default Home;
