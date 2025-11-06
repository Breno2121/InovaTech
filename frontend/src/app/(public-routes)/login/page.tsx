"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { TbPhoneRinging } from "react-icons/tb";
import { GiArchiveRegister } from "react-icons/gi";
import { API } from "@/service/api";

export default function LoginPage() {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [birthDate, setBirthdate] = useState("");
  const [conteudo, setConteudo] = useState<"login" | "cadastro">("login");
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
      alert("Credenciais invalidas.");
      console.error(error);
    }
  }

  async function registerUser(e: React.FormEvent) {
    e.preventDefault();
    try {
      const payload = { name, email, password: senha, birthDate };
      await API.post("/user/register", payload);
      setName("");
      setEmail("");
      setSenha("");
      setBirthdate("");
      alert("Usuário cadastrado com sucesso!");
    } catch (error) {
      alert("Email ja cadastrado no banco de dados.");
      console.error("Error email usuario:", error);
    }
  }

  return (
    <div className={styles.grid}>
      {conteudo === "login" ? (
        <div className={styles.wrapper}>
          <form onSubmit={handleSubmit}>
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

          <div className={styles.cadastro}>
            <button onClick={() => setConteudo("cadastro")}>Cadastre-se</button>
          </div>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <h1 className={styles.heading}>
            Cadastro <GiArchiveRegister />
          </h1>
          <form className={styles.form} onSubmit={registerUser}>
            <label>
              Nome:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                required
              />
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
              Senha:
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className={styles.input}
                required
              />
            </label>

            <label>
              Data de nascimento:
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthdate(e.target.value)}
                className={styles.input}
                required
              />
            </label>

            <button type="submit" className={styles.buttonCadastrar}>
              Cadastrar
            </button>

            <div className={styles.cadastro}>
              <button type="button" onClick={() => setConteudo("login")}>
                Voltar ao login
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
