import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { SyntheticEvent, useState } from 'react'
import styles from '../styles/Home.module.css'
import { Markdown } from '../utils/markdown'

const Home: NextPage = () => {
  const [inputText, setInputText] = useState("")

  function handleInputTest(e: React.ChangeEvent<HTMLInputElement>) {
    let markdown: Markdown = new Markdown()
    let inputText: string = e.target.value;
    let markdownOutput = markdown.toHTML(inputText);
    setInputText(markdownOutput);
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Catdown</title>
        <meta name="description" content="Catdown - editing markdown text." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          CatDown - A markdown editor
        </h1>

        <textarea name="" id="" cols="30" rows="10" onChange={handleInputTest}></textarea>
        <div dangerouslySetInnerHTML={{__html: inputText}}></div>
      </main>
    </div>
  )
}

export default Home
