import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin";

export async function GET(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const customerType = searchParams.get("customerType") || undefined;
  const serviceName = searchParams.get("serviceName") || undefined;
  const province = searchParams.get("province") || undefined;
  const cityDistrict = searchParams.get("cityDistrict") || undefined;
  const status = searchParams.get("status") || undefined;
  const format = searchParams.get("format") || "json";

  const bookings = await prisma.booking.findMany({
    where: {
      customerType: customerType ? customerType : undefined,
      serviceName: serviceName ? { contains: serviceName } : undefined,
      province: province ? { contains: province } : undefined,
      cityDistrict: cityDistrict ? { contains: cityDistrict } : undefined,
      status: status ? status : undefined
    },
    orderBy: { createdAt: "desc" }
  });

  if (format === "csv") {
    const headers = [
      "id",
      "customerType",
      "name",
      "companyName",
      "nuit",
      "phone",
      "email",
      "serviceCategory",
      "serviceName",
      "details",
      "province",
      "cityDistrict",
      "neighborhood",
      "address",
      "referencePoint",
      "mapLink",
      "preferredDate",
      "timeWindow",
      "urgency",
      "contactPreference",
      "status",
      "createdAt"
    ];
    const rows = bookings.map((booking) =>
      headers.map((header) => JSON.stringify((booking as Record<string, string>)[header] ?? "")).join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=bookings.csv"
      }
    });
  }

  return NextResponse.json({ bookings });
}
