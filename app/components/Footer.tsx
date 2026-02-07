import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-base font-semibold text-slate-900">Ndivasa Limpeza & Manutenção</p>
          <p className="mt-3 text-sm text-slate-600">
            Serviços profissionais de limpeza e manutenção de edifícios em todo o território de Moçambique.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Links rápidos</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link href="/servicos" className="hover:text-primary-600">Serviços</Link></li>
            <li><Link href="/marcar" className="hover:text-primary-600">Marcação</Link></li>
            <li><Link href="/contratos" className="hover:text-primary-600">Contratos & SLA</Link></li>
            <li><Link href="/contactos" className="hover:text-primary-600">Contactos</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Contactos</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Maputo, Moçambique</li>
            <li>Telefone: +258 84 000 0000</li>
            <li>Email: comercial@ndivasa.co.mz</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Ndivasa Solutions. Todos os direitos reservados.
      </div>
    </footer>
  );
}
