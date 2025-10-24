"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { TbPhoneRinging } from "react-icons/tb";

export default function LoginPage() {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const loginUrl = "http://localhost:3333/user/login";

      const response = await axios.post(loginUrl, {
        email: user,
        password: password,
      });

      localStorage.setItem("access_token", response.data.access_token);
      router.push("/dashboard");
    } catch (error) {
      alert("Erro ao fazer login");
      console.error(error);
    }
  }
  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        {" "}
        { }
        <h1 className={styles.heading}>
          InovaTech <TbPhoneRinging />
        </h1>
        <div className={styles.inputBox}>
          <input
            type="text"
            placeholder="Username"
            required
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <i className="bx bxs-user"></i>
        </div>
        <div className={styles.inputBox}>
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="bx bxs-lock-alt"></i>
        </div>
        <button type="submit" className={styles.btn}>
          Login
        </button>
      </form>
    </div>
  );
}
