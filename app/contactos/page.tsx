import Link from "next/link";

export default function ContactosPage() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2">
        <div>
          <span className="badge">Contactos</span>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">Vamos falar sobre o seu edifício</h1>
          <p className="mt-3 text-base text-slate-600">
            Estamos disponíveis para visitas técnicas, orçamentos e contratos mensais.
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <p><strong>Telefone:</strong> +258 84 000 0000</p>
            <p><strong>WhatsApp:</strong> +258 84 000 0000</p>
            <p><strong>Email:</strong> comercial@ndivasa.co.mz</p>
            <p><strong>Endereço:</strong> Av. 24 de Julho, Maputo</p>
          </div>
          <Link href="/marcar" className="button-primary mt-6 inline-flex">Ir para marcação</Link>
        </div>
        <form className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900">Mensagem rápida</h2>
          <p className="mt-2 text-sm text-slate-600">Para agendar um serviço, use o formulário de marcação.</p>
          <div className="mt-4 space-y-4">
            <div>
              <label className="label">Nome</label>
              <input className="input" placeholder="Seu nome" />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" placeholder="email@exemplo.com" />
            </div>
            <div>
              <label className="label">Mensagem</label>
              <textarea className="input min-h-[120px]" placeholder="Como podemos ajudar?" />
            </div>
            <button type="button" className="button-secondary w-full">
              Enviar mensagem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
