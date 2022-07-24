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
    <div className="flex flex-row w-5/6 h-5/6 gap-8">
        <textarea
          className="w-1/2 h-5/6 m-4 p-4 focus:outline-none rounded border border-stone-500"
          onChange={handleInputText}
        ></textarea>

      <Display text={inputText}></Display>
    </div>
  );
}
