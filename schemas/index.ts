import * as z from "zod";


const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const CustomerDetailsSchema = z.object({
  name: z.string().min(1, {
    message: "Необхідно вказати ім'я.",
  }),
  phone: z.string().regex(phoneRegex, {
    message: "Невірний номер.",
  }),
  email: z.string().email({
    message: "Необхідно вказати адресу електронної пошти."
  }),
  address: z.string().min(1, {
    message: "Необхідно вказати адресу."
  })
});