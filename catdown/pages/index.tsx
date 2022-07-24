import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { Title } from "../components/title";
import { Display } from "../components/Display";
import { Markdown } from "../utils/markdown";
import { Editor } from "../components/Editor";
import Link from "next/link";
import { Nav } from "../components/nav";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Catdown</title>
        <meta name="description" content="Catdown - A markdown editor." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col h-screen">
        <div className="flex w-full m-4 h-20 items-end gap-4">
          <Title />
          <Nav />
        </div>

        <Editor></Editor>
      </main>
    </div>
  );
};

export default Home;
