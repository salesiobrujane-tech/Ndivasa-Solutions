import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function SucessoPage({
  searchParams
}: {
  searchParams: { message?: string };
}) {
  const message = searchParams.message ? decodeURIComponent(searchParams.message) : "Olá! Gostaria de confirmar a minha marcação.";
  const whatsappLink = buildWhatsAppLink(message);

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">✅</div>
        <h1 className="mt-6 text-3xl font-semibold text-slate-900">Pedido enviado com sucesso!</h1>
        <p className="mt-3 text-base text-slate-600">
          Obrigado por confiar na Ndivasa. A nossa equipa irá entrar em contacto em breve para confirmar o agendamento.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={whatsappLink} className="button-whatsapp" target="_blank" rel="noreferrer">
            Enviar também por WhatsApp
          </Link>
          <Link href="/" className="button-secondary">Voltar à página inicial</Link>
        </div>
      </div>
    </div>
  );
}
