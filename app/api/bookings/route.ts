import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBookingEmail } from "@/lib/email";
import { buildBookingMessage } from "@/lib/whatsapp";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const requiredFields = [
      "customerType",
      "name",
      "phone",
      "serviceCategory",
      "serviceName",
      "province",
      "cityDistrict",
      "neighborhood",
      "address",
      "preferredDate",
      "timeWindow",
      "urgency",
      "contactPreference"
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Campo obrigatório: ${field}` }, { status: 400 });
      }
    }

    const booking = await prisma.booking.create({
      data: {
        customerType: body.customerType,
        name: body.name,
        companyName: body.companyName || null,
        nuit: body.nuit || null,
        phone: body.phone,
        email: body.email || null,
        serviceCategory: body.serviceCategory,
        serviceName: body.serviceName,
        details: body.details || null,
        province: body.province,
        cityDistrict: body.cityDistrict,
        neighborhood: body.neighborhood,
        address: body.address,
        referencePoint: body.referencePoint || null,
        mapLink: body.mapLink || null,
        preferredDate: body.preferredDate,
        timeWindow: body.timeWindow,
        urgency: body.urgency,
        contactPreference: body.contactPreference,
        status: "Novo"
      }
    });

    const location = `${booking.neighborhood}, ${booking.cityDistrict}, ${booking.province}`;

    const whatsappMessage = buildBookingMessage({
      customerType: booking.customerType === "company" ? "Empresa/Condomínio" : "Cliente Particular",
      serviceName: booking.serviceName,
      location,
      preferredDate: booking.preferredDate,
      timeWindow: booking.timeWindow,
      phone: booking.phone
    });

    const emailHtml = `
      <h2>Nova marcação recebida</h2>
      <p><strong>Cliente:</strong> ${booking.name}</p>
      <p><strong>Tipo:</strong> ${booking.customerType}</p>
      <p><strong>Empresa:</strong> ${booking.companyName ?? "-"}</p>
      <p><strong>Telefone:</strong> ${booking.phone}</p>
      <p><strong>Email:</strong> ${booking.email ?? "-"}</p>
      <p><strong>Serviço:</strong> ${booking.serviceCategory} - ${booking.serviceName}</p>
      <p><strong>Detalhes:</strong> ${booking.details ?? "-"}</p>
      <p><strong>Localização:</strong> ${location}</p>
      <p><strong>Endereço:</strong> ${booking.address}</p>
      <p><strong>Referência:</strong> ${booking.referencePoint ?? "-"}</p>
      <p><strong>Mapa:</strong> ${booking.mapLink ?? "-"}</p>
      <p><strong>Data:</strong> ${booking.preferredDate}</p>
      <p><strong>Horário:</strong> ${booking.timeWindow}</p>
      <p><strong>Urgência:</strong> ${booking.urgency}</p>
      <p><strong>Preferência de contacto:</strong> ${booking.contactPreference}</p>
    `;

    await sendBookingEmail({
      subject: `Nova marcação - ${booking.serviceName}`,
      html: emailHtml
    });

    return NextResponse.json({ bookingId: booking.id, whatsappMessage });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao processar pedido." }, { status: 500 });
  }
}
