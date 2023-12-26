"use client";

import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import Button from "@/components/ui/Button";
import Currency from "@/components/ui/Currency";
import useCart from "@/hooks/use-cart";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [loading, setLoading] = useState(items.length === 0)

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
      setLoading(true);
      redirect("/success");
    }

    if (searchParams.get("cancelled")) {
      setLoading(true)
      toast.error("Something went wrong.")
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
      <Button disabled={loading} onClick={onCheckout} className="w-full mt-6">
        Здійснити покупку
      </Button>
    </div>
  )
};

export default Summary;
