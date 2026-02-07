"use client";

import { useState } from "react";

export default function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    setLoading(false);

    if (!response.ok) {
      setError("Senha inválida.");
      return;
    }

    window.location.reload();
  };

  return (
    <form className="card p-6 max-w-md" onSubmit={handleSubmit}>
      <h1 className="text-xl font-semibold text-slate-900">Administração</h1>
      <p className="mt-2 text-sm text-slate-600">Introduza a senha para aceder às marcações.</p>
      <div className="mt-4">
        <label className="label">Senha</label>
        <input
          type="password"
          className="input"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      <button type="submit" className="button-primary mt-4 w-full" disabled={loading}>
        {loading ? "A validar..." : "Entrar"}
      </button>
    </form>
  );
}
