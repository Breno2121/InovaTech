"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { API } from "@/service/api";

interface Chamado {
  id: string;
  titulo: string;
  descricao: string;
  status: string;
  email: string;
  manutencao: string;
}

interface Comentario {
  id: string;
  chamadoId: string;
  content: string;
  emailClient: string;
  created_at: Date;
  updated_at: Date;
}

export default function Chamados() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("aberto");
  const [emailClient, setEmailClient] = useState("");
  const [manutencao, setManutencao] = useState("");
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalComentario, setModalComentario] = useState(false);
  const [comentario, setComentario] = useState("");
  const [comentarioDetalhado, setComentarioDetalhado] = useState<Comentario[]>([]);
  // const [comentarioLoad, setLoadComentarios] = useState<Comentario[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [conteudo, setConteudo] = useState<"chamados" | "detalhes">("chamados");
  const [chamadoDetalhado, setChamadoDetalhado] = useState<Chamado>();

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
      const payload = { titulo, descricao, status, email, manutencao };
      await API.post("/chamado/register", payload);
      setShowModal(false);
      await loadChamados();

      setTitulo("");
      setDescricao("");
      setStatus("aberto");
      setEmail("");
      setManutencao("");
    } catch (error) {
      console.error("Erro ao criar chamado:", error);
      alert("Email não cadastrado a nenhum cliente.");
    } finally {
      setLoading(false);
    }
  }

   async function getChamadoId(id: string) {
    try {
      const response = await API.get(`/chamado/busca/${id}`);
      setChamadoDetalhado(response.data);
    } catch (error) {
      console.error("Erro ao buscar chamado:", error);
    }
  }

    async function updateStatusChamado(id: string) {
    const updateChamado = {
      titulo,
      descricao,
      status: "Em andamento",
      emailClient,
      manutencao,
    };
    try {
      await API.patch(`/chamado/update/${id}`, updateChamado);
    } catch (error) {
      console.error("Erro ao atualizar status chamado:", error);
    }
  }

  async function comentar(e: React.FormEvent) {
    e.preventDefault();
    if (!chamadoDetalhado) {
      console.log("Nenhum chamado encontrado");
      return;
    }
    try {
      const payload = {
        chamadoId: chamadoDetalhado.id,
        content: comentario,
        emailClient: emailClient,
      };
      await API.post("/comentario/register", payload);
      setComentario("");
      setEmailClient("");
      loadComentariosId(payload.chamadoId);
      setModalComentario(false);
    } catch (error) {
      console.log("Erro ao criar comentario", error);
    }
  }

  async function loadComentariosId(chamadoId: string) {
    try {
      const response = await API.get(`/comentario/getAll/${chamadoId}`);
      setComentarioDetalhado(response.data);
    } catch (error) {
      console.error("Erro ao buscar comentarios:", error);
    }
  }

  // async function getComentariosId(id: string) {
  //   try {
  //     const response = await API.get(`/comentario/busca/${id}`);
  //     console.log(response.data);
  //     setComentarioDetalhado(response.data);
  //   } catch (error) {
  //     console.error("Erro ao buscar comentarios:", error);
  //   }
  // }

  async function deleteComentario(id: string, chamadoId:string) {
    try {
      await API.delete(`/comentario/delete/${id}`);
      loadComentariosId(chamadoId);
    } catch (error) {
      console.log("erro ao deletar comentario:", error);
    }
  }

  return (
    <div className={styles.container}>
      {conteudo === "chamados" ? (
        <>
          <div className={styles.barraButton}>
            <button
              className={styles.buttonChamado}
              onClick={() => setShowModal(true)}
            >
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
                  <p className={styles.cardDescription}>{item.titulo}</p>
                  <p className={styles.cardDescription}>{item.descricao}</p>
                  <p className={styles.cardDescription}>{item.status}</p>
                  <p className={styles.cardDescription}>{item.manutencao}</p>
                  <div className={styles.barraButtonDetalhes}>
                    <button
                      className={styles.buttonDetalhes}
                      onClick={() => {
                        updateStatusChamado(item.id);
                        getChamadoId(item.id);
                        loadComentariosId(item.id);
                        setConteudo("detalhes");
                      }}
                    >
                      detalhes
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {showModal && (
            <div
              className={styles.modalOverlay}
              onClick={() => setShowModal(false)}
            >
              <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
              >
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
                    Email:
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                    <button
                      type="submit"
                      className={styles.button}
                      disabled={loading}
                    >
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
        </>
      ) : (
        <>
          {chamadoDetalhado ? (
            <div className={styles.detalhesContainer}>
              <h2 className={styles.detalheTitulo}>Detalhes do Chamado</h2>

              <div className={styles.detalheInfo}>
                <p>
                  <strong>ID:</strong> #{chamadoDetalhado.id}
                </p>
                <p>
                  <strong>Título:</strong> {chamadoDetalhado.titulo}
                </p>
                <p>
                  <strong>Descrição:</strong> {chamadoDetalhado.descricao}
                </p>
                <p>
                  <strong>Status:</strong> {chamadoDetalhado.status}
                </p>
                <p>
                  <strong>Manutenção:</strong> {chamadoDetalhado.manutencao}
                </p>
                <p>
                  <strong>Email Cliente:</strong> {chamadoDetalhado.email}
                </p>
              </div>
              <h2 className={styles.title}>Comentarios</h2>
              <div className={styles.grid}>
                {comentarioDetalhado.length === 0 ? (
                  <p>Nenhum comentario encontrado.</p>
                ) : (
                  <>
                    {comentarioDetalhado.map((item) => (
                      <div key={item.id} className={styles.card}>
                        <h3 className={styles.cardTitle}>
                          #{item.id.slice(0, 4)}
                        </h3>
                        <p>
                          <strong>Descrição:</strong>
                          {item.content}
                        </p>
                        <p>
                          <strong>Cliente: </strong>
                          {item.emailClient}
                        </p>
                        <button
                          onClick={() => deleteComentario(item.id, item.chamadoId)}
                          className={styles.btnExcluir}
                        >
                          Excluir
                        </button>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <footer className={styles.footer}>
                <button
                  className={styles.buttonsComentario}
                >
                  Finalizar Chamado
                </button>
                <button
                  className={styles.buttonsComentario}
                  onClick={() => setModalComentario(true)}
                >
                  Comentar
                </button>
                <button
                  className={styles.buttonsComentario}
                  onClick={() => {
                    setConteudo("chamados");
                    loadChamados();
                  }}
                >
                  Voltar
                </button>
              </footer>
            </div>
          ) : (
            <p>Carregando detalhes...</p>
          )}

          {modalComentario && (
            <div
              className={styles.modalOverlay}
              onClick={() => setModalComentario(false)}
            >
              <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className={styles.title}>Comentário</h2>

                <form className={styles.form} onSubmit={comentar}>
                  <label>
                    Conteúdo:
                    <textarea
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                      className={styles.textarea}
                      required
                    />
                  </label>
                  <label>
                    Email:
                    <textarea
                      value={emailClient}
                      onChange={(e) => setEmailClient(e.target.value)}
                      className={styles.textarea}
                      required
                    />
                  </label>

                  <div className={styles.modalActions}>
                    <button type="submit" className={styles.button}>
                      Salvar Comentário
                    </button>

                    <button
                      type="button"
                      className={styles.cancelButton}
                      onClick={() => setModalComentario(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
