import React, { useState } from "react";
import { Markdown } from "../utils/markdown";
import { Display } from "./Display";

export function Editor(): JSX.Element {
  const [inputText, setInputText] = useState("");

  function handleInputText(e: React.ChangeEvent<HTMLInputElement>) {
    let markdown: Markdown = new Markdown();
    let inputText: string = e.target.value;
    let markdownOutput = markdown.toHTML(inputText);
    setInputText(markdownOutput);
  }

  return (
    <div className="flex flex-row w-full h-screen gap-8">
      <div className="h-5/6 w-1/2">
        <textarea
          className="w-full h-full m-4 p-4 focus:outline-none rounded border border-stone-500"
          onChange={handleInputText}
        ></textarea>
      </div>

      <Display text={inputText}></Display>
    </div>
  );
}
