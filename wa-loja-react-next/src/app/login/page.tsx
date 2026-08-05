"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../contexts/AuthContext";

interface LoginFormValues {
  email: string;
  senha: string;
}

export default function Login() {
  const { login } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  function onSubmit(data: LoginFormValues) {
    login(data.email);
  }

  return (
    <main className="container py-4 flex-1">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <h1 className="mb-4">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                {...register("email", { required: "O email é obrigatório" })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="senha" className="form-label">
                Senha
              </label>
              <input
                id="senha"
                type="password"
                className={`form-control ${errors.senha ? "is-invalid" : ""}`}
                {...register("senha", {
                  required: "A senha é obrigatória",
                  minLength: {
                    value: 6,
                    message: "A senha deve ter no mínimo 6 caracteres",
                  },
                })}
              />
              {errors.senha && (
                <div className="invalid-feedback">{errors.senha.message}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Entrar
            </button>
            <p className="text-center mb-0">
              Não tem uma conta?{" "}
              <Link href="/cadastro">Cadastre-se</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
