"use client";
import { API } from "@/service/api";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface chamado {
  id: string;
  titulo: string;
  descricao: string;
  status: string;
  client: string;
}

export default function Chamados() {
  const [chamado, setChamado] = useState<chamado[]>([]);
  const [newChamado, setNewChamado] = useState<chamado[]>([]);
  useEffect(() => {
    loadChamados();
  }, []);

  async function loadChamados() {
    try {
      const response = await API.get("/chamado/busca");

      console.log("Dados recebidos da API:", response.data);
      setChamado(response.data);
    } catch (error) {
      console.log("Erro ao buscar Chamados", error);
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
      <div className={styles.grid}>
        {chamado.map((item) => (
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
