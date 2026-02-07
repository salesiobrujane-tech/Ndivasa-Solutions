import Link from "next/link";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function HomePage() {
  return (
    <div>
      <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="badge">Limpeza & Manutenção Profissional</span>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              Edifícios impecáveis, equipa treinada e SLA garantido em todo Moçambique.
            </h1>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Atendemos empresas, condomínios e clientes particulares com planos flexíveis, relatórios de qualidade e resposta rápida.
              Marque o serviço online em menos de 2 minutos.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/marcar" className="button-primary">Marcar Serviço</Link>
              <Link
                href={buildWhatsAppLink("Olá! Gostaria de pedir um orçamento de limpeza/manutenção.")}
                className="button-whatsapp"
                target="_blank"
                rel="noreferrer"
              >
                Pedir Orçamento no WhatsApp
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-600 sm:grid-cols-4">
              <div>
                <p className="text-lg font-semibold text-primary-700">SST</p>
                <p>Segurança certificada</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-primary-700">Equipa</p>
                <p>Treinada e uniformizada</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-primary-700">Relatórios</p>
                <p>Qualidade e auditoria</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-primary-700">SLA</p>
                <p>Resposta em 24h</p>
              </div>
            </div>
          </div>
          <div className="card p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-slate-900">Pedido rápido</h2>
            <p className="mt-2 text-sm text-slate-600">
              Escolha o serviço e marque agora. A nossa equipa entra em contacto em até 2 horas úteis.
            </p>
            <div className="mt-4 space-y-3">
              {SERVICE_CATEGORIES.map((category) => (
                <div key={category.category} className="rounded-xl border border-slate-200 p-4">
                  <p className="text-sm font-semibold text-slate-800">{category.category}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {category.services.slice(0, 3).join(" · ")}...
                  </p>
                  <Link
                    href={`/marcar?service=${encodeURIComponent(category.services[0])}`}
                    className="mt-3 inline-flex text-sm font-semibold text-primary-600"
                  >
                    Marcar agora →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Serviços em destaque</h2>
            <Link href="/servicos" className="text-sm font-semibold text-primary-600">
              Ver todos
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_CATEGORIES.flatMap((category) =>
              category.services.slice(0, 3).map((service) => (
                <div key={service} className="card card-hover p-6">
                  <p className="text-xs font-semibold uppercase text-primary-600">{category.category}</p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">{service}</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Soluções completas para manter o seu edifício limpo, seguro e valorizado.
                  </p>
                  <Link
                    href={`/marcar?service=${encodeURIComponent(service)}`}
                    className="mt-4 inline-flex text-sm font-semibold text-primary-600"
                  >
                    Marcar este serviço →
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold text-slate-900">Como trabalhamos</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              "Recebemos o pedido",
              "Ligamos para validar detalhes",
              "Agendamos a visita técnica",
              "Executamos com equipa dedicada",
              "Entregamos relatório e follow-up"
            ].map((step, index) => (
              <div key={step} className="card p-4 text-center">
                <p className="text-sm font-semibold text-primary-700">Passo {index + 1}</p>
                <p className="mt-2 text-sm text-slate-600">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Testemunhos</h2>
            <div className="mt-6 space-y-4">
              {["Empresa Logística X", "Condomínio Jardim", "Banco Y"].map((client) => (
                <div key={client} className="card p-4">
                  <p className="text-sm font-semibold text-slate-800">{client}</p>
                  <p className="mt-2 text-sm text-slate-600">
                    “Serviço impecável, relatórios completos e atendimento sempre disponível.”
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Antes & Depois</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="card flex h-32 items-center justify-center bg-slate-100 text-sm text-slate-500">
                  Placeholder {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold text-slate-900">Perguntas frequentes</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                q: "Atendem em todo o país?",
                a: "Sim, temos equipas móveis e parceiros nas principais províncias."
              },
              {
                q: "Quanto tempo demora a resposta?",
                a: "Respondemos em até 2 horas úteis e agendamos conforme a urgência."
              },
              {
                q: "Podem enviar relatório?",
                a: "Sim, enviamos relatório de execução e recomendações de manutenção."
              },
              {
                q: "Têm contratos mensais?",
                a: "Sim, oferecemos planos com SLA e visitas preventivas agendadas."
              }
            ].map((item) => (
              <div key={item.q} className="card p-4">
                <p className="text-sm font-semibold text-slate-800">{item.q}</p>
                <p className="mt-2 text-sm text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
