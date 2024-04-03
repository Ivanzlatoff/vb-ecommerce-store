"use client";

import { MouseEventHandler, useState } from "react";

import { Minus, Plus, ShoppingCart } from "lucide-react";

import { Product } from "@/types";
import Currency from "@/components/ui/Currency";
import Button from "./ui/Button";
import useCart from "@/hooks/use-cart";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";
import { useRouter } from "next/navigation";
import Link from "next/link";
import usePreviewModal from "@/hooks/use-preview-modal";


interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({
  data
}) => {
  const [quantity, setQuantity] = useState(100);
  const cart = useCart();
  const router = useRouter();
  const previewModal = usePreviewModal();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    let stringQuantity = quantity.toString();
    cart.addItem({...data, quantity: stringQuantity});
  }

  const handleQuantity = (type: string) => {
      if (type === 'des') {
          quantity > 100 && setQuantity(quantity - 100)
      } else {
          quantity < 9999 
            ? setQuantity(Math.min(quantity + 100, 9999))
            : toast.error("Максимум 9999 кг одного продукту. Якщо бажаєте більше, будь ласка зв'яжіться з нами");
      }
  };

  const onAskOrder: MouseEventHandler<HTMLButtonElement> = (event) => {
    router.push("/cart");
    previewModal.onClose();
  }

  const onContinueShopping: MouseEventHandler<HTMLButtonElement> = (event) => {
    router.push("/");
    previewModal.onClose();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-row justify-between">
        <div className="flex">
          <div>
            <div className="flex items-center gap-x-4">
              <h3 className="font-semibold text-black">Розмір:</h3>
              <div>
                {data?.size?.name}
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <h3 className="font-semibold text-black">Колір:</h3>
              <div 
                className="h-5 w-5 rounded-full border-gray-600" 
                style={{ backgroundColor: data?.color?.value }}
                />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="flex items-center gap-x-2"
                onClick={onAddToCart}
                disabled={quantity < 100}
              >
                Додати до кошику
                <ShoppingCart />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <Button onClick={onAskOrder}>
                  Оформити замовлення
                </Button>
              </DialogHeader>
              <DialogHeader>
                <Button onClick={onContinueShopping}>
                  Продовжити покупки
                </Button>               
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-row justify-between font-bold text-xl">
        <div className="flex items-center">
          <Minus color="red" className="mr-2" size={20} onClick={() => handleQuantity("des")} />
          <Input
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            min={100}
            step={100}
            value={quantity}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                // Ensure the value is less than or equal to the maximum value
                Number(value) > 9999 && toast.error("Максимум 9999 кг одного продукту. Якщо бажаєте більше, будь ласка зв'яжіться з нами")
                const newValue = Math.min(Number(value), 9999);
                setQuantity(newValue);
              }
            }}
            onKeyDown={(e) => {
              if (!((e.key >= '0' && e.key <= '9') || e.key === 'Backspace' || e.key === 'Delete')) {
                e.preventDefault();
              }
            }}
            style={{ 
              width: '70px', 
              border: 'none', 
              fontSize:'20px', 
            }}
          />
          <Plus color="green" className="ml-2" size={20} onClick={() => handleQuantity("asc")} />
        </div>
        <div>
          Всього, грн: 
          <Currency value={data && quantity * Number(data.price)} />
        </div>
      </div>
      {quantity < 100 && <p className="text-center bg-red-200 text-red-500 mt-1 p-1 rounded-lg">Оформити замовлення можна від 100 кг</p>}
      <hr className="my-4" />
      <div className="flex text-justify">
        {data?.description}
      </div>
    </div>
  )
}

export default Info;
