'use client'

import React from "react"
import Head from "next/head"
import styles from "./styles.module.css"


export default function Home() {
  return (
    <>
    <Head>
      <>Tela de Login</>
    <link
    href="https://unkpg.com/boxicons@2.1.4/css/boxicons.min.css"
    rel="stylesheet"
    />
    </Head>

    <div className="wrapper">
      <form action="">
        <h1>Login</h1>

        <div className="input-box">
          <input type="text"  placeholder="Username" required/>
          <i className="bx bxs-lock-alt"></i>
        </div>

        <div className="input-box">
          <input type="password" placeholder="Password" required/>
          <i className="bx bxs-lock-alt"></i>
        </div>

        
      </form>
    </div>
    </>
  );
}
