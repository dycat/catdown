import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [inputText, setInputText] = useState("")
  
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

        <textarea name="" id="" cols="30" rows="10">{inputText}</textarea>
        <label htmlFor=""></label>
      </main>
    </div>
  )
}

export default Home
