import AdminLoginForm from "./AdminLoginForm";
import AdminClient from "./AdminClient";
import { isAdminAuthenticated } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const authenticated = isAdminAuthenticated();

  if (!authenticated) {
    return (
      <div className="section-padding">
        <div className="mx-auto max-w-4xl">
          <AdminLoginForm />
        </div>
      </div>
    );
  }

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    take: 50
  });

  const serializableBookings = bookings.map((booking) => ({
    ...booking,
    createdAt: booking.createdAt.toISOString()
  }));

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-semibold text-slate-900">Marcações recebidas</h1>
        <p className="mt-2 text-sm text-slate-600">Use os filtros para encontrar pedidos específicos.</p>
        <div className="mt-6">
          <AdminClient initialBookings={serializableBookings} />
        </div>
      </div>
    </div>
  );
}
