export function buildWhatsAppLink(message: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+258840000000";
  const cleaned = number.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${encodedMessage}`;
}

export function buildBookingMessage(data: {
  customerType: string;
  serviceName: string;
  location: string;
  preferredDate: string;
  timeWindow: string;
  phone: string;
}) {
  return `Olá! Gostaria de confirmar a minha marcação.\n` +
    `Tipo de cliente: ${data.customerType}\n` +
    `Serviço: ${data.serviceName}\n` +
    `Localização: ${data.location}\n` +
    `Data/Hora: ${data.preferredDate} - ${data.timeWindow}\n` +
    `Contacto: ${data.phone}`;
}
