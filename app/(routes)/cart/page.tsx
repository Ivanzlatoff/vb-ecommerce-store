"use client";

import { useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import useCart from "@/hooks/use-cart";
import CartItem from "./components/CartItem";
import Summary from "./components/Summary";
import { AlertCircle } from 'lucide-react';


const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  };

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py16 sm:px-6 lg:px-8">
          <div className="mt-6">
            <Alert className="relative bg-orange-100">
              <AlertCircle color="orange" className="h-4 w-4" />
              <AlertTitle className="text-xl">Увага!</AlertTitle>
              <AlertDescription className="text-lg">
                Будь ласка, зателефонуйте нам перед замовленням для уточнення наявної кількості товару.
              </AlertDescription>
            </Alert>
          </div>
          <h1 className="text-3xl font-bold text-black my-5">Кошик</h1>
          <div className="lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && <p className="text-neutral-500">У кошик не додано жодного товару</p>}
              <ul>
                {cart.items.slice().sort((a, b) =>  a.name.localeCompare(b.name)).map((item) => (
                  <CartItem
                    key={item.id}
                    data={item}
                  />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CartPage;
