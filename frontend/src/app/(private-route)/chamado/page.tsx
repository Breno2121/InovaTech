"use client";
import { API } from "@/service/api";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

interface Chamado {
  id: string;
  titulo: string;
  descricao: string;
  status: string;
  client: string;
}

export default function Chamados() {
  const [chamado, setChamado] = useState<chamado[]>([]);
  const [newChamado, setNewChamado] = useState<chamado[]>([]);
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

      await loadChamados();
      setTitulo("");
      setDescricao("");

      // router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao criar chamado:", error);
    }
  }

  async function createChamado() {
    const newChamado: chamado = {
      titulo: titulo,
      descricao: descricao,
    }
    try {
      
    } catch (error) {
      console.log("Erro ao criar novo chamado", error)
    }
  }
  async function createUser() {
    const newUser: User = {
      name: nome,
      email: email,
      password: senha,
      birthDate: dataNascimento,
    };
    console.log(newUser);
    try {
      await API.post("/user/register", newUser);
      alert("Usuário cadastrado com sucesso!");
      router.push("/Login");
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      alert("Erro ao cadastrar. Verifique os dados.");
    }

  return (
    <div className={styles.container}>
      <div className={styles.barrabutton}>
      <h2 className={styles.title}>Lista de Chamados</h2>
      <button className={styles.buttonchamado}>Abrir Chamado</button>
      </div>

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
            <h3 className={styles.cardTitle}>#{item.id.slice(0, 4)}</h3>
            <p className={styles.cardDescription}>{item.descricao}</p>
            <p className={styles.cardDescription}>{item.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
}