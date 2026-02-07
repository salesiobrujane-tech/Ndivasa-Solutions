import Link from "next/link";

export default function ContratosPage() {
  const plans = [
    {
      title: "Plano Essencial",
      price: "Sob consulta",
      features: [
        "Visitas semanais",
        "Relatório mensal",
        "SLA 48h"
      ]
    },
    {
      title: "Plano Profissional",
      price: "Sob consulta",
      features: [
        "Equipa dedicada",
        "Relatório quinzenal",
        "SLA 24h",
        "Canal WhatsApp directo"
      ]
    },
    {
      title: "Plano Corporativo",
      price: "Sob consulta",
      features: [
        "Gestor de conta",
        "Visitas preventivas",
        "SLA 12h",
        "Relatórios KPI"
      ]
    }
  ];

  return (
    <div className="section-padding bg-slate-50">
      <div className="mx-auto max-w-6xl">
        <span className="badge">Contratos & SLA</span>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900">Planos mensais com SLA dedicado</h1>
        <p className="mt-3 text-base text-slate-600">
          Contratos flexíveis para manter a operação limpa, segura e eficiente. Agende uma visita técnica para diagnóstico completo.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.title} className="card p-6">
              <h2 className="text-lg font-semibold text-slate-900">{plan.title}</h2>
              <p className="mt-2 text-sm text-slate-500">{plan.price}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <Link href="/marcar" className="button-primary mt-6 inline-flex w-full justify-center">
                Agendar visita técnica
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
