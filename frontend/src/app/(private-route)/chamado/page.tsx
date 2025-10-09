"use client"; // <- adiciona essa linha no topo

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { API } from "@/service/api";

interface Chamado {
  id: string;
  titulo: string;
  descricao: string;
  status: string;
  client: string;
}

export default function ChamadoPage() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [chamados, setChamados] = useState<Chamado[]>([]);

  useEffect(() => {
    loadChamados();
  }, []);

  async function loadChamados() {
    try {
      const response = await API.get("/chamado/busca");
      console.log("Dados recebidos da API:", response.data);
      setChamados(response.data);
    } catch (error) {
      console.error("Erro ao buscar Chamados:", error);
    }
  }

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

      // Atualiza lista de chamados e limpa campos
      await loadChamados();
      setTitulo("");
      setDescricao("");

      // router.push("/dashboard"); // opcional, se quiser redirecionar
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

      <h2 className={styles.title}>Lista de Chamados</h2>

      <div className={styles.grid}>
        {chamados.map((item) => (
          <div key={item.id} className={styles.card}>
            {/* Ajustar ID para 4 caracteres */}
            <h3 className={styles.cardTitle}>#{item.id.slice(0, 4)}</h3>
            <p className={styles.cardDescription}>{item.descricao}</p>
            <p className={styles.cardDescription}>{item.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
