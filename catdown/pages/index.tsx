import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { Title } from "../components/Title";
import { Display } from "../components/Display";
import { Markdown } from "../utils/markdown";
import { Editor } from "../components/Editor";

const Home: NextPage = () => {

  return (
    <div>
      <Head>
        <title>Catdown</title>
        <meta name="description" content="Catdown - A markdown editor." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col">
        <div className="w-full m-4 h-1/5">
          <Title />
        </div>

        <Editor></Editor>
      </main>
    </div>
  );
};

export default Home;
