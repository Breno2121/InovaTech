"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { API } from "@/service/api";

interface Client {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

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
      const payload = {
        name,
        email,
        cpf,
        phone,
      };
      await API.post("/cliente/register", payload);
      setShowModal(false);
      await loadClients();
      setName("");
      setEmail("");
      setCpf("");
      setPhone("");
    } catch (error) {
      console.error("Erro ao salvar client:", error);
    }
  }

  async function updateClient() {
    if (!editingId) return;
    setShowModal(true);

    const updatedClient = { name, email, cpf, phone };
    try {
      await API.patch(`/cliente/update/${editingId}`, updatedClient);
      setEditingId(null);
      setName("");
      setEmail("");
      setCpf("");
      setPhone("");
      setShowModal(false);
      loadClients();
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    }
  }

  function startEditing(client: Client) {
    setEditingId(client.id);
    setName(client.name);
    setEmail(client.email);
    setCpf(client.cpf);
    setPhone(client.phone);
  }

  async function excluir(id: string) {
    try {
      await API.delete(`/cliente/delete/${id}`);
      loadClients();
    } catch (error) {
      window.alert("Cliente possui chamados vinculados.");
      console.error("Erro ao excluir client:", error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonbarra}>
        <button
          className={styles.buttonClient}
          onClick={() => setShowModal(true)}
        >
          Novo Cliente
        </button>
      </div>
      <h2 className={styles.titulo}>Clientes</h2>

      <div className={styles.grid}>
        {clients.length === 0 ? (
          <p>Nenhum chamado encontrado.</p>
        ) : (
          clients.map((client) => (
            <div key={client.id} className={styles.card}>
              <h3 className={styles.cardTitle}>#{client.id.slice(0, 6)}</h3>
              <p className={styles.cardDescription}>Nome: {client.name}</p>
              <p className={styles.cardDescription}>Email: {client.email}</p>
              <p className={styles.cardDescription}>Cpf: {client.cpf}</p>
              <p className={styles.cardDescription}>Telefone: {client.phone}</p>
              <div className={styles.acoes}>
                <button
                  onClick={() => {
                    startEditing(client);
                    setShowModal(true);
                  }}
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
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(true)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.title}>Novo Cliente</h2>

            <form className={styles.form} onSubmit={register}>
              <label>
                Nome:
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
              </label>
              <label>
                CPF:
                <input
                  type="cpf"
                  placeholder="Cpf"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className={styles.input}
                />
              </label>
              <label>
                Telefone:
                <input
                  type="phone"
                  placeholder="Telefone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.input}
                />
              </label>

              <div className={styles.modalActions}>
                <button
                  onClick={editingId ? updateClient : register}
                  className={styles.button}
                  disabled={!name || !email || !cpf || !phone}
                >
                  Salvar
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => {
                    setShowModal(false);
                    setName("");
                    setEmail("");
                    setCpf("");
                    setPhone("");
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
