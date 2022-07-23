import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { SyntheticEvent, useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [inputText, setInputText] = useState("")

  function handleInputTest(e: React.ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
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
        <label htmlFor="">{inputText}</label>
      </main>
    </div>
  )
}

export default Home
