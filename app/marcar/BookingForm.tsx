"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CONTACT_PREFERENCES,
  PROVINCES,
  SERVICE_CATEGORIES,
  TIME_WINDOWS,
  URGENCY_LEVELS
} from "@/lib/constants";

const steps = ["Dados", "Serviço", "Localização", "Data & Confirmação"] as const;

type FormState = {
  customerType: "company" | "individual" | "";
  name: string;
  companyName: string;
  nuit: string;
  phone: string;
  email: string;
  serviceCategory: string;
  serviceName: string;
  details: string;
  province: string;
  cityDistrict: string;
  neighborhood: string;
  address: string;
  referencePoint: string;
  mapLink: string;
  preferredDate: string;
  timeWindow: string;
  urgency: string;
  contactPreference: string;
};

const initialState: FormState = {
  customerType: "",
  name: "",
  companyName: "",
  nuit: "",
  phone: "",
  email: "",
  serviceCategory: "",
  serviceName: "",
  details: "",
  province: "",
  cityDistrict: "",
  neighborhood: "",
  address: "",
  referencePoint: "",
  mapLink: "",
  preferredDate: "",
  timeWindow: "",
  urgency: "",
  contactPreference: ""
};

export default function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") ?? "";
  const matchedCategory = useMemo(() => {
    return SERVICE_CATEGORIES.find((category) =>
      category.services.some((service) => service.toLowerCase() === serviceParam.toLowerCase())
    );
  }, [serviceParam]);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    ...initialState,
    serviceName: serviceParam,
    serviceCategory: matchedCategory?.category ?? ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cities = form.province ? PROVINCES[form.province as keyof typeof PROVINCES] ?? [] : [];

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    const nextErrors: Record<string, string> = {};

    if (step === 0) {
      if (!form.customerType) nextErrors.customerType = "Selecione o tipo de cliente.";
      if (!form.name) nextErrors.name = "Informe o nome completo.";
      if (form.customerType === "company" && !form.companyName) {
        nextErrors.companyName = "Informe a empresa ou condomínio.";
      }
      if (!form.phone) nextErrors.phone = "Informe o telefone/WhatsApp.";
    }

    if (step === 1) {
      if (!form.serviceCategory) nextErrors.serviceCategory = "Escolha a categoria.";
      if (!form.serviceName) nextErrors.serviceName = "Escolha o serviço.";
    }

    if (step === 2) {
      if (!form.province) nextErrors.province = "Escolha a província.";
      if (!form.cityDistrict) nextErrors.cityDistrict = "Escolha a cidade/distrito.";
      if (!form.neighborhood) nextErrors.neighborhood = "Informe o bairro/zona.";
      if (!form.address) nextErrors.address = "Informe o endereço.";
    }

    if (step === 3) {
      if (!form.preferredDate) nextErrors.preferredDate = "Escolha a data.";
      if (!form.timeWindow) nextErrors.timeWindow = "Escolha o horário.";
      if (!form.urgency) nextErrors.urgency = "Escolha a urgência.";
      if (!form.contactPreference) nextErrors.contactPreference = "Selecione o contacto preferido.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setIsSubmitting(true);

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    setIsSubmitting(false);

    if (response.ok) {
      router.push(`/marcar/sucesso?message=${encodeURIComponent(data.whatsappMessage)}`);
      return;
    }

    setErrors({ form: data.error ?? "Não foi possível enviar. Tente novamente." });
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="step-indicator">Passo {step + 1} de {steps.length}</p>
          <h2 className="text-lg font-semibold text-slate-900">{steps[step]}</h2>
        </div>
        <div className="hidden text-sm text-slate-500 sm:block">Preenchimento rápido · 2 minutos</div>
      </div>

      {errors.form && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errors.form}
        </div>
      )}

      <div className="mt-6 space-y-6">
        {step === 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <p className="label">Tipo de cliente *</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                {[{ label: "Empresa / Condomínio", value: "company" }, { label: "Cliente Particular", value: "individual" }].map(
                  (option) => (
                    <label key={option.value} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm">
                      <input
                        type="radio"
                        name="customerType"
                        value={option.value}
                        checked={form.customerType === option.value}
                        onChange={() => handleChange("customerType", option.value)}
                      />
                      {option.label}
                    </label>
                  )
                )}
              </div>
              {errors.customerType && <p className="text-xs text-red-500">{errors.customerType}</p>}
            </div>

            <div>
              <label className="label">Nome completo *</label>
              <input className="input" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            {form.customerType === "company" && (
              <div>
                <label className="label">Empresa / Condomínio *</label>
                <input className="input" value={form.companyName} onChange={(e) => handleChange("companyName", e.target.value)} />
                {errors.companyName && <p className="text-xs text-red-500">{errors.companyName}</p>}
              </div>
            )}

            {form.customerType === "company" && (
              <div>
                <label className="label">NUIT (opcional)</label>
                <input className="input" value={form.nuit} onChange={(e) => handleChange("nuit", e.target.value)} />
              </div>
            )}

            <div>
              <label className="label">Telefone / WhatsApp *</label>
              <input className="input" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
            </div>
            <div>
              <label className="label">Email (opcional)</label>
              <input className="input" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Categoria *</label>
              <select
                className="input"
                value={form.serviceCategory}
                onChange={(e) => {
                  handleChange("serviceCategory", e.target.value);
                  handleChange("serviceName", "");
                }}
              >
                <option value="">Selecione</option>
                {SERVICE_CATEGORIES.map((category) => (
                  <option key={category.category} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </select>
              {errors.serviceCategory && <p className="text-xs text-red-500">{errors.serviceCategory}</p>}
            </div>
            <div>
              <label className="label">Serviço *</label>
              <select
                className="input"
                value={form.serviceName}
                onChange={(e) => handleChange("serviceName", e.target.value)}
              >
                <option value="">Selecione</option>
                {SERVICE_CATEGORIES.find((c) => c.category === form.serviceCategory)?.services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              {errors.serviceName && <p className="text-xs text-red-500">{errors.serviceName}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="label">Detalhes do pedido</label>
              <textarea
                className="input min-h-[120px]"
                value={form.details}
                onChange={(e) => handleChange("details", e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Província *</label>
              <select
                className="input"
                value={form.province}
                onChange={(e) => {
                  handleChange("province", e.target.value);
                  handleChange("cityDistrict", "");
                }}
              >
                <option value="">Selecione</option>
                {Object.keys(PROVINCES).map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
              {errors.province && <p className="text-xs text-red-500">{errors.province}</p>}
            </div>
            <div>
              <label className="label">Cidade/Distrito *</label>
              <select
                className="input"
                value={form.cityDistrict}
                onChange={(e) => handleChange("cityDistrict", e.target.value)}
              >
                <option value="">Selecione</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.cityDistrict && <p className="text-xs text-red-500">{errors.cityDistrict}</p>}
            </div>
            <div>
              <label className="label">Bairro/Zona *</label>
              <input className="input" value={form.neighborhood} onChange={(e) => handleChange("neighborhood", e.target.value)} />
              {errors.neighborhood && <p className="text-xs text-red-500">{errors.neighborhood}</p>}
            </div>
            <div>
              <label className="label">Endereço detalhado *</label>
              <input className="input" value={form.address} onChange={(e) => handleChange("address", e.target.value)} />
              {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
            </div>
            <div>
              <label className="label">Ponto de referência</label>
              <input className="input" value={form.referencePoint} onChange={(e) => handleChange("referencePoint", e.target.value)} />
            </div>
            <div>
              <label className="label">Link Google Maps / Coordenadas</label>
              <input className="input" value={form.mapLink} onChange={(e) => handleChange("mapLink", e.target.value)} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Data preferida *</label>
              <input
                type="date"
                className="input"
                value={form.preferredDate}
                onChange={(e) => handleChange("preferredDate", e.target.value)}
              />
              {errors.preferredDate && <p className="text-xs text-red-500">{errors.preferredDate}</p>}
            </div>
            <div>
              <label className="label">Janela de horário *</label>
              <select
                className="input"
                value={form.timeWindow}
                onChange={(e) => handleChange("timeWindow", e.target.value)}
              >
                <option value="">Selecione</option>
                {TIME_WINDOWS.map((window) => (
                  <option key={window} value={window}>
                    {window}
                  </option>
                ))}
              </select>
              {errors.timeWindow && <p className="text-xs text-red-500">{errors.timeWindow}</p>}
            </div>
            <div>
              <label className="label">Urgência *</label>
              <select
                className="input"
                value={form.urgency}
                onChange={(e) => handleChange("urgency", e.target.value)}
              >
                <option value="">Selecione</option>
                {URGENCY_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.urgency && <p className="text-xs text-red-500">{errors.urgency}</p>}
            </div>
            <div>
              <label className="label">Preferência de contacto *</label>
              <select
                className="input"
                value={form.contactPreference}
                onChange={(e) => handleChange("contactPreference", e.target.value)}
              >
                <option value="">Selecione</option>
                {CONTACT_PREFERENCES.map((preference) => (
                  <option key={preference} value={preference}>
                    {preference}
                  </option>
                ))}
              </select>
              {errors.contactPreference && <p className="text-xs text-red-500">{errors.contactPreference}</p>}
            </div>

            <div className="sm:col-span-2 rounded-xl border border-primary-100 bg-primary-50 p-4 text-sm text-primary-700">
              Confirme os dados e envie. A nossa equipa irá validar o agendamento e responder por {form.contactPreference || "WhatsApp"}.
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col justify-between gap-3 sm:flex-row">
        <button
          type="button"
          className="button-secondary"
          onClick={handlePrev}
          disabled={step === 0}
        >
          Voltar
        </button>
        {step < steps.length - 1 ? (
          <button type="button" className="button-primary" onClick={handleNext}>
            Continuar
          </button>
        ) : (
          <button type="button" className="button-primary" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "A enviar..." : "Enviar pedido"}
          </button>
        )}
      </div>
    </div>
  );
}
