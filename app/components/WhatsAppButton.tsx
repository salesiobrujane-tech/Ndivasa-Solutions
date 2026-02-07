import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const DEFAULT_MESSAGE = "Olá! Gostaria de solicitar um orçamento de limpeza/manutenção.";

export default function WhatsAppButton() {
  const link = buildWhatsAppLink(DEFAULT_MESSAGE);

  return (
    <Link
      href={link}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-600"
    >
      <span className="text-lg">💬</span>
      WhatsApp
    </Link>
  );
}
