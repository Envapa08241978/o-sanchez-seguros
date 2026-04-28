import { z } from "zod";

const insuranceTypes = [
  "vida",
  "gmm",
  "auto",
  "vida-ahorro",
  "empresarial",
  "fronterizo",
  "otro",
] as const;

export const leadSchema = z.object({
  fullName: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre es demasiado largo"),
  email: z.string().email("Ingresa un correo electrónico válido"),
  phone: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .max(15, "El teléfono es demasiado largo"),
  insuranceType: z.enum(insuranceTypes),
  message: z.string().max(1000).optional(),
  privacyConsent: z.boolean(),
});

export type LeadFormData = z.infer<typeof leadSchema>;

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Ingresa un correo electrónico válido"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  birthDate: z.string().min(1, "La fecha de nacimiento es obligatoria"),
  gender: z.enum(["Masculino", "Femenino", "Otro", "Prefiero no decirlo"], {
    invalid_type_error: "Selecciona una opción de sexo",
    required_error: "Selecciona una opción de sexo",
  }),
  zipCode: z.string().min(4, "Ingresa un código postal válido").max(10, "El código postal es demasiado largo"),
  insuranceType: z.enum(insuranceTypes),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje es demasiado largo"),
  privacyConsent: z.boolean(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
