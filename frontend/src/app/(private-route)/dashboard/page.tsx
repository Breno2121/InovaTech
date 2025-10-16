"use client";

import styles from "./styles.module.css";
import React from "react";
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

const data = [
  { tipo: "Corretiva", quantidade: 35 },
  { tipo: "Preventiva", quantidade: 50 },
  { tipo: "Preditiva", quantidade: 20 },
  { tipo: "Adaptativa", quantidade: 15 },
];

const COLORS = ["#ef4444", "#22c55e", "#3b82f6", "#eab308"];

const Dashboard = () => {
  const total = data.reduce((sum, d) => sum + d.quantidade, 0);

  return (
    <div className="p-8 min-h-screen bg-gray-50 space-y-10">
      <h1 className="text-4xl font-bold text-gray-800 text-center">
        Dashboard de Manutenção
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {item.tipo}
            </h2>
            <p className="text-3xl font-bold text-gray-800 text-center">
              {item.quantidade}
            </p>
          </motion.div>
        ))}
      </div>

      
      <div className={styles.chartsGrid}>  
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Distribuição por Tipo</h2>
          <BarChart width={400} height={300} data={data} className="mx-auto">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tipo" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantidade" fill="#3b82f6">
              {data.map((entry, index) => (
                <Cell key={`cell-bar-${index}`} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </div>

        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Percentual de Manutenções</h2>
          <PieChart width={400} height={300} className="mx-auto">
            <Pie
              data={data}
              dataKey="quantidade"
              nameKey="tipo"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ tipo, quantidade }) =>
                `${tipo} (${((total) * 100).toFixed(1)}%)`
              }
            >
              {data.map((entry, index) => (
                <Cell key={`cell-pie-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
