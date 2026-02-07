"use client";

import { useEffect, useState } from "react";
import { STATUS_OPTIONS } from "@/lib/constants";

export type Booking = {
  id: string;
  customerType: string;
  name: string;
  companyName?: string | null;
  phone: string;
  email?: string | null;
  serviceCategory: string;
  serviceName: string;
  province: string;
  cityDistrict: string;
  neighborhood: string;
  mapLink?: string | null;
  preferredDate: string;
  timeWindow: string;
  urgency: string;
  status: string;
  createdAt: string;
};

type Filters = {
  customerType: string;
  serviceName: string;
  province: string;
  cityDistrict: string;
  status: string;
};

export default function AdminClient({ initialBookings }: { initialBookings: Booking[] }) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [filters, setFilters] = useState<Filters>({
    customerType: "",
    serviceName: "",
    province: "",
    cityDistrict: "",
    status: ""
  });
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    const response = await fetch(`/api/admin/bookings?${params.toString()}`);
    const data = await response.json();
    setBookings(data.bookings ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleExport = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    params.append("format", "csv");
    window.open(`/api/admin/bookings?${params.toString()}`, "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="card p-4">
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <div>
            <label className="label">Tipo</label>
            <select
              className="input"
              value={filters.customerType}
              onChange={(e) => setFilters((prev) => ({ ...prev, customerType: e.target.value }))}
            >
              <option value="">Todos</option>
              <option value="company">Empresa/Condomínio</option>
              <option value="individual">Particular</option>
            </select>
          </div>
          <div>
            <label className="label">Serviço</label>
            <input
              className="input"
              value={filters.serviceName}
              onChange={(e) => setFilters((prev) => ({ ...prev, serviceName: e.target.value }))}
            />
          </div>
          <div>
            <label className="label">Província</label>
            <input
              className="input"
              value={filters.province}
              onChange={(e) => setFilters((prev) => ({ ...prev, province: e.target.value }))}
            />
          </div>
          <div>
            <label className="label">Cidade</label>
            <input
              className="input"
              value={filters.cityDistrict}
              onChange={(e) => setFilters((prev) => ({ ...prev, cityDistrict: e.target.value }))}
            />
          </div>
          <div>
            <label className="label">Estado</label>
            <select
              className="input"
              value={filters.status}
              onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
            >
              <option value="">Todos</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button type="button" className="button-primary" onClick={fetchBookings} disabled={loading}>
            {loading ? "A carregar..." : "Filtrar"}
          </button>
          <button type="button" className="button-secondary" onClick={handleExport}>
            Exportar CSV
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Serviço</th>
                <th className="px-4 py-3">Localização</th>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-800">{booking.name}</p>
                    <p className="text-xs text-slate-500">{booking.customerType === "company" ? booking.companyName : "Particular"}</p>
                    <p className="text-xs text-slate-500">{booking.phone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-800">{booking.serviceName}</p>
                    <p className="text-xs text-slate-500">{booking.serviceCategory}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-700">{booking.neighborhood}, {booking.cityDistrict}</p>
                    <p className="text-xs text-slate-500">{booking.province}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-700">{booking.preferredDate}</p>
                    <p className="text-xs text-slate-500">{booking.timeWindow}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="badge">{booking.status}</span>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-500">
                    Nenhuma marcação encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
