"use client";
import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import { GrConfigure } from "react-icons/gr";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { API } from "@/service/api";

interface Dados {
  tipo: string;
  quantidade: number;
}

export default function DashboardPage() {
  const [dadosGrafico, setDadosGrafico] = useState<Dados[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGraficos();
  }, []);

  async function loadGraficos() {
    try {
      const response = await API.get("/dashboard/manutencoes");
      console.log("Dados recebidos da API:", response.data);
      setDadosGrafico(response.data);
    } catch (error) {
      console.log("Erro ao buscar informações dos gráficos:", error);
    } finally {
      setLoading(false);
    }
  }

  const COLORS = ["#ef4444", "#22c55e", "#3b82f6", "#eab308"];
  const total = dadosGrafico.reduce((sum, d) => sum + d.quantidade, 0);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <p className={styles.loadingText}>Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardsGrid}>
        {dadosGrafico.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={styles.card}
          >
            <h2 className={styles.cardTitle}><GrConfigure size={24} /> {item.tipo}</h2>
            <p className={styles.cardValue}>{item.quantidade}</p>
          </motion.div>
        ))}
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Distribuição por Tipo</h2>
          <BarChart width={850} height={400} data={dadosGrafico}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tipo" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantidade">
              {dadosGrafico.map((_, index) => (
                <Cell
                  key={`bar-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </div>

        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Percentual de Manutenções</h2>
          <PieChart width={900} height={400}>
            <Pie
              data={dadosGrafico as any}
              dataKey="quantidade"
              nameKey="tipo"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={(props) => {
                const { name, value } = props;
                const percent =
                  total > 0 ? ((Number(value) / total) * 100).toFixed(1) : "0";
                return `${name} (${percent}%)`;
              }}
            >
              {dadosGrafico.map((_, index) => (
                <Cell
                  key={`pie-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
