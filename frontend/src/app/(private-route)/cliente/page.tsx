"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { API } from "@/service/api";

interface Client {
  id: string;
  name: string;
  email: string;
}

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    try {
      const response = await API.get("/cliente/busca");
      console.log("Dados recebidos da API:", response.data);
      setClients(response.data);
    } catch (error) {
      console.log("Erro ao buscar Clientes", error);
    }
  }

  async function register() {
    try {
      await API.post("/cliente/register", { name, email });
      setName("");
      setEmail("");
      loadClients();
    } catch (error) {
      console.error("Erro ao salvar client:", error);
    }
  }


async function updateClient() {
  if (!editingId) return;

  const updateClient = { name, email };

  try {
    await API.patch(`/cliente/busca/${editingId}`, updateClient);
    setEditingId(null);
    setName("");
    setEmail("");
    loadClients();
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
  }
}

//   async function updateClient(client: Client) {
//     const updateClient = {
//       name: name,
//       email: email,
//     };

//     if (editingId) {
//       await API.patch(`/cliente/busca/${client.id}`, updateClient);
//       setEditingId(null);
//     } else {
//       console.log("parou aqui!!!!!!");
//     }
//     loadClients();
//   }

async function excluir(id: string) {
    try {
      await API.delete(`/cliente/delete/${id}`);
      loadClients();
    } catch (error) {
      console.error("Erro ao excluir client:", error);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>CRUD de Clients</h1>

      <div className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={register}>
          {editingId ? "Atualizar" : "Adicionar"}
        </button>
      </div>

      <ul className={styles.lista}>
        {clients.map((client) => (
          <li key={client.id} className={styles.item}>
            <span className={styles.nomesC}>
              {client.name} - {client.email}
            </span>
            <div className={styles.acoes}>
              <button onClick={() => updateClient( )}
                className={styles.btnEditar}
                >
                Editar
              </button>

              <button
                onClick={() => excluir(client.id)}
                className={styles.btnExcluir}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
