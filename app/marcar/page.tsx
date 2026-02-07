import BookingForm from "./BookingForm";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function MarcarPage() {
  return (
    <div className="section-padding bg-slate-50" id="whatsapp">
      <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="badge">Marcação online</span>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">Agende o seu serviço em minutos</h1>
          <p className="mt-3 text-base text-slate-600">
            Preencha o formulário passo a passo. Assim que recebermos, entraremos em contacto para confirmar detalhes e enviar orçamento.
          </p>
          <div className="mt-6 space-y-4 text-sm text-slate-600">
            <div className="card p-4">
              <p className="font-semibold text-slate-800">Precisa de resposta imediata?</p>
              <p className="mt-2">
                Fale connosco no WhatsApp para atendimento prioritário.
              </p>
              <Link
                href={buildWhatsAppLink("Olá! Gostaria de atendimento prioritário para limpeza/manutenção.")}
                className="mt-3 inline-flex text-sm font-semibold text-green-600"
                target="_blank"
                rel="noreferrer"
              >
                Abrir WhatsApp →
              </Link>
            </div>
            <div className="card p-4">
              <p className="font-semibold text-slate-800">SLA garantido</p>
              <p className="mt-2">
                Temos equipas de resposta rápida em Maputo, Matola, Beira e Nampula.
              </p>
            </div>
          </div>
        </div>
        <BookingForm />
      </div>
    </div>
  );
}
