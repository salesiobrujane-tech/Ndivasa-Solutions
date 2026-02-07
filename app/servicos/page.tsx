import Link from "next/link";
import { SERVICE_CATEGORIES } from "@/lib/constants";

export default function ServicosPage() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3">
          <span className="badge">Serviços</span>
          <h1 className="text-3xl font-semibold text-slate-900">Limpeza & manutenção para empresas e residências</h1>
          <p className="text-base text-slate-600">
            Escolha o serviço ideal e marque diretamente. Adaptamos equipas, frequência e materiais ao seu edifício.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {SERVICE_CATEGORIES.map((category) => (
            <div key={category.category} className="card p-6">
              <h2 className="text-xl font-semibold text-slate-900">{category.category}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {category.services.map((service) => (
                  <div key={service} className="rounded-xl border border-slate-200 p-4">
                    <p className="text-sm font-semibold text-slate-800">{service}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      Equipa especializada, materiais certificados e supervisão constante.
                    </p>
                    <Link
                      href={`/marcar?service=${encodeURIComponent(service)}`}
                      className="mt-3 inline-flex text-xs font-semibold text-primary-600"
                    >
                      Marcar este serviço →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
