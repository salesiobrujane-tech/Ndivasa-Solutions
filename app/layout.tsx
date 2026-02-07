import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

const siteUrl = "https://ndivasa.co.mz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ndivasa Limpeza & Manutenção | Serviços Profissionais em Moçambique",
  description:
    "Limpeza e manutenção de edifícios com equipa certificada, SLA garantido e atendimento rápido. Marque o seu serviço online.",
  openGraph: {
    title: "Ndivasa Limpeza & Manutenção",
    description:
      "Serviços profissionais de limpeza e manutenção com SLA e atendimento rápido em Moçambique.",
    url: siteUrl,
    siteName: "Ndivasa",
    locale: "pt_MZ",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Ndivasa Limpeza & Manutenção",
    description:
      "Agende serviços de limpeza e manutenção com atendimento rápido e equipa treinada."
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
