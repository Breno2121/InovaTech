'use client';
import { useState } from "react";
import styles from "./styles.module.css";

export default function ClientesPage() {
    const [clientes, setClientes] = useState<any[]>([]);


    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [editandoId, setEditandoId] = useState<number | null>(null);

    function salvar() {
        if (editandoId) {
            setClientes(clientes.map(cliente =>
                cliente.id === editandoId ? { id: cliente.id, nome, email } : cliente
            ));
            setEditandoId(null);
        } else {
            const novo = { id: Date.now(), nome, email };
            setClientes([...clientes, novo]);
        }
        setNome("");
        setEmail("");
    }

    function editar(cliente: any) {
        setNome(cliente.nome);
        setEmail(cliente.email);
        setEditandoId(cliente.id);
    }

    function excluir(id: number) {
        setClientes(clientes.filter(cliente => cliente.id !== id));
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>CRUD de Clientes</h1>

            <div className={styles.form}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={salvar}>
                    {editandoId ? "Atualizar" : "Adicionar"}
                </button>
            </div>

            <ul className={styles.lista}>
                {clientes.map((cliente) => (
                    <li key={cliente.id} className={styles.item}>
                        <span className={styles.nomesC}>{cliente.nome} - {cliente.email}</span>
                        <div className={styles.acoes}>
                            <button onClick={() => editar(cliente)} className={styles.btnEditar}>
                                Editar
                            </button>
                            <button onClick={() => excluir(cliente.id)} className={styles.btnExcluir}>
                                Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}