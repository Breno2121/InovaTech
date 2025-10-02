'use client'

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
    useEffect(() => {
        loadChamados();
    },[]);

    async function loadChamados() {
        try {
            const response = await API.get("/chamado/busca");

            console.log("Dados recebidos da API:", response.data);
            setChamado(response.data);
        } catch (error) {
            console.log("Erro ao buscar Chamados", error)
        }
    }

    return (
            <div className={styles.container}>
        <h2 className={styles.title}>Lista de Chamados</h2>
        <div className={styles.grid}>
            {chamado.map((item) => (
                <div key={item.id} className={styles.card}>
                {/* Ajustar ID para 4 caracteres */}
                    <h3 className={styles.cardTitle}>#{item.id}</h3>
                    <p className={styles.cardDescription}>{item.descricao}</p>
                    <p className={styles.cardDescription}>{item.status}</p>
                </div>
            ))}
        </div>
    </div>
    )
}
