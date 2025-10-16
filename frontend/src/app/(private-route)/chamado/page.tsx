"use client";

import { API } from "@/service/api";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface Chamado {
  id: string;
  titulo: string;
  descricao: string;
  status: string;
  client: string;
}

export default function Chamados() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("aberto");
  const [clientId, setClientId] = useState("");
  const [manutencao, setManutencao] = useState("");
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadChamados();
  }, []);

  async function loadChamados() {
    try {
      const response = await API.get("/chamado/busca");
      setChamados(response.data);
    } catch (error) {
      console.error("Erro ao buscar chamados:", error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        titulo,
        descricao,
        status,
        clientId,
        manutencao,
      };

      await API.post("/chamado/register", payload);
      setShowModal(false);
      await loadChamados();

      setTitulo("");
      setDescricao("");
      setStatus("aberto");
      setClientId("");
      setManutencao("");
    } catch (error) {
      console.error("Erro ao criar chamado:", error);
      alert("Erro ao criar chamado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.barraButton}>
        <button className={styles.buttonChamado} onClick={() => setShowModal(true)}>
          Abrir Chamado
        </button>
      </div>

      <h2 className={styles.title}>Lista de Chamados</h2>

      <div className={styles.grid}>
        {chamados.length === 0 ? (
          <p>Nenhum chamado encontrado.</p>
        ) : (
          chamados.map((item) => (
            <div key={item.id} className={styles.card}>
              <h3 className={styles.cardTitle}>#{item.id.slice(0, 4)}</h3>
              <p className={styles.cardDescription}>{item.descricao}</p>
              <p className={styles.cardDescription}>{item.status}</p>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.title}>Novo Chamado</h2>

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

              <label>
                Status:
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={styles.input}
                >
                  <option value="aberto">Aberto</option>
                  <option value="em_andamento">Em Andamento</option>
                  <option value="finalizado">Finalizado</option>
                </select>
              </label>

              <label>
                Client ID:
                <input
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className={styles.input}
                  required
                />
              </label>

              <label>
                Tipo de Manutenção:
                <select
                  value={manutencao}
                  onChange={(e) => setManutencao(e.target.value)}
                  className={styles.input}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="Corretiva">Corretiva</option>
                  <option value="Preventiva">Preventiva</option>
                  <option value="Preditiva">Preditiva</option>
                  <option value="Adaptativa">Adaptativa</option>
                </select>
              </label>

              <div className={styles.modalActions}>
                <button type="submit" className={styles.button} disabled={loading}>
                  {loading ? "Criando..." : "Criar Chamado"}
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowModal(false)}
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
}