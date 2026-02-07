import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold text-slate-900">
          Ndivasa Limpeza & Manutenção
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
          <Link href="/servicos" className="hover:text-primary-600">Serviços</Link>
          <Link href="/marcar" className="hover:text-primary-600">Marcar</Link>
          <Link href="/contratos" className="hover:text-primary-600">Contratos & SLA</Link>
          <Link href="/contactos" className="hover:text-primary-600">Contactos</Link>
        </nav>
        <Link href="/marcar" className="button-primary text-xs sm:text-sm">
          Marcar Serviço
        </Link>
      </div>
    </header>
  );
}
