"use client";

import * as z from "zod";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import Button from "@/components/ui/Button";
import Currency from "@/components/ui/Currency";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import useCart from "@/hooks/use-cart";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CustomerDetailsSchema } from "@/schemas";
import FormSuccess from "@/components/ui/FormSuccess";
import FormError from "@/components/ui/FormError";
import ReactInputMask from "react-input-mask";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [loading, setLoading] = useState(items.length === 0)

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  console.log({
    isPending,
    loading
  })

  const form = useForm<z.infer<typeof CustomerDetailsSchema>>({
    resolver: zodResolver(CustomerDetailsSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: ""
    }
  });

  const onSubmit = (values: z.infer<typeof CustomerDetailsSchema>) => {
    setError("");
    setSuccess("");
    const validatedFields = CustomerDetailsSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Невірно заповнені поля!" };
    }

    startTransition(() => {
      onSendOrder(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        })
        .catch(() => {
          setError('Щось пішло не так!');
          setLoading(false);
        });
    })
  }

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Заявку прийнято!");
      removeAll();
      setLoading(true);
      redirect("/success");
    }

    if (searchParams.get("cancelled")) {
      setLoading(true);
      toast.error("Щось пішло не так!");
      setLoading(false);
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price) * Number(item.quantity || 100)
  }, 0);

  const onCheckout = async () => {
    setLoading(true);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      cartItems: items,
    });
    window.location = response.data.url;
  }

  const onSendOrder = async (values: z.infer<typeof CustomerDetailsSchema>) => {
    setLoading(true);
    try {

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        cartItems: items,
        name: values.name,
        phone: values.phone, 
        email: values.email,
        address: values.address
      });
      window.location = response.data.url;
      return { success: "Лист із підтвердженням надіслано." };
    } catch(err) {
      setLoading(false);
      return { error: "Щось пішло не так." }
    }
  }

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">
        Підсумок Замовлення
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">
            Загальне замовлення
          </div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={loading} className="w-full mt-6">Відіслати заявку</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ваші дані</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form 
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ім&apos;я</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              disabled={isPending} 
                              placeholder="Микола Петренко"
                              className="focus-visible:ring-offset-[-2] focus:border-black font-bold text-black border-solid border-2 border-slate-500"
                            />
                          </FormControl>
                          <FormMessage className="mt-2" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col">
                            <FormLabel>Телефон</FormLabel>
                            <FormControl>
                              <ReactInputMask
                                // mask options
                                mask={"+38 099 999 99 99"}
                                alwaysShowMask={false}
                                maskPlaceholder=''
                                // input options
                                type="tel"
                                placeholder="+38 098 123 45 67"
                                {...field}
                                disabled={isPending}
                                className="focus-visible:ring-offset-[-2] focus:border-black px-2 py-2 mt-2 rounded-lg font-bold text-black border-solid border-2 border-slate-500"
                                />
                            </FormControl>
                            <FormMessage className="mt-2" />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Електронна пошта</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              disabled={isPending} 
                              placeholder="email@mail.com"
                              type="email" 
                              className="focus-visible:ring-offset-[-2] focus:border-black font-bold text-black border-solid border-2 border-slate-500"
                            />
                          </FormControl>
                          <FormMessage className="mt-2" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Адреса</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field}
                              disabled={isPending} 
                              placeholder="Місце проживання..."
                              className="focus-visible:ring-offset-[-2] focus:border-black font-bold text-black border-solid border-2 border-slate-500"
                            />
                          </FormControl>
                          <FormMessage className="mt-2" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormError message={error} />
                  <FormSuccess message={success} />
                  <Button
                    disabled={loading || isPending}
                    type="submit"
                    className="w-full"
                  >
                    Відіслати заявку
                  </Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
};

export default Summary;
