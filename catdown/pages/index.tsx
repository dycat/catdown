import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { Markdown } from "../utils/markdown";

const Home: NextPage = () => {
  const [inputText, setInputText] = useState("");

  function handleInputTest(e: React.ChangeEvent<HTMLInputElement>) {
    let markdown: Markdown = new Markdown();
    let inputText: string = e.target.value;
    let markdownOutput = markdown.toHTML(inputText);
    setInputText(markdownOutput);
  }

  return (
    <div>
      <Head>
        <title>Catdown</title>
        <meta name="description" content="Catdown - A markdown editor." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col">
        <h1 className="w-full m-4 h-1/5 font-sans font-medium text-2xl">
          Cat Down
        </h1>
        <div className="flex flex-row w-full h-screen gap-8">
          <div className="h-5/6 w-1/2">
            <textarea
              name=""
              id=""
              className="w-full h-full m-4 p-4 focus:outline-none rounded border border-stone-500"
              onChange={handleInputTest}
            ></textarea>
          </div>
          <div
            className="w-1/2 h-full m-4 p-4"
            dangerouslySetInnerHTML={{ __html: inputText }}
          ></div>
        </div>
      </main>
    </div>
  );
};

export default Home;
