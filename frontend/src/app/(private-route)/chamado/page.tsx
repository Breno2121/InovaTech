
"use client"; // <- adiciona essa linha no topo

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // no app router usa navigation
import styles from "./styles.module.css";

export default function ChamadoPage() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const chamadoUrl = "http://localhost:3000/chamado";

      const response = await fetch(chamadoUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ titulo, descricao }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar chamado");
      }

      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
      }

      router.push("/dashboard"); // redireciona após criar o chamado
    } catch (error) {
      console.error("Erro ao criar chamado:", error);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Abrir Chamado</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className={styles.input}
            required
          />
        </label>

        <label>
          Descrição:
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className={styles.textarea}
            required
          />
        </label>

        <button type="submit" className={styles.button}>
          Criar Chamado
        </button>
      </form>
    </div>
  );
}