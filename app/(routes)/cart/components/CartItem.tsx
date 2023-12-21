"use client";

import { MouseEventHandler, useState } from "react";

import Image from "next/image";

import { Product } from "@/types";
import IconButton from "@/components/ui/IconButton";
import { Minus, Plus, X } from "lucide-react";
import Currency from "@/components/ui/Currency";
import useCart from "@/hooks/use-cart";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";


interface CartItemProps {
  data: Product
}

const CartItem: React.FC<CartItemProps> = ({
  data
}) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(Number(data.quantity) || 100);
  const onRemove = () => {
    cart.removeItem(data.id);
  }
  
  const onUpdateCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    let stringQuantity = quantity.toString();
    cart.updateItem({...data, quantity: stringQuantity});
  }

  const handleQuantity = (type: string) => {
      if (type === 'des') {
          quantity > 100 && setQuantity(quantity - 100)
      } else {
          quantity < 9999 
            ? setQuantity(Math.min(quantity + 100, 9999))
            : toast.error("Максимум 9999 кг одного продукту. Якщо бажаєте більше, будьласка зв'яжіться з нами");
      }
  };

  return (
    <li className="flex flex-col xs:flex-row py-6 border-b">
      <div className="relative h-24 w-36 xs:w-48 xs:h-48 rounded-md overflow-hidden">
        <Image 
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover origin-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-[-6rem] xs:top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative sm:gap-x-6 sm:pr-0 flex flex-col space-y-1">
          <div className="absolute z-10 right-0 top-[-3.5rem] xs:relative flex justify-between">
            <p className="text-lg font-semibold text-black">
              {data.name}
            </p>
          </div>
          <div className="absolute z-10 right-0 top-[-2rem] xs:relative flex flex-row">
            <Currency value={data.price} />/кг
          </div>
          <div className="flex text-sm items-center">
            <div 
              className="border p-2 rounded-full mr-2" 
              style={{ backgroundColor: data.color.value }}
            />
            <p className="text-gray-500">{data.color.name}</p>
            <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">{data.size.name}</p>
          </div>
          <div className="text-lg text-black flex flex-row items-center">
            <p className="mr-5">Кількість, кг:</p>
            <Minus color="red" className="" size={20} onClick={() => handleQuantity("des")} />
            <Input
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              step={100}
              value={quantity}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  // Ensure the value is less than or equal to the maximum value
                  Number(value) > 9999 && toast.error("Максимум 9999 кг одного продукту. Якщо бажаєте більше, будьласка зв'яжіться з нами")
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
            <Plus color="green" className="ml-0" size={20} onClick={() => handleQuantity("asc")} />
          </div>
          <div className="text-lg text-black flex flex-row space-x-2">
            <p>Всього за продукт:</p> 
            <Currency value={Number(quantity || 100) * Number(data.price)} />
            <p>грн</p>
          </div>
        </div>
        {Number(data.quantity || 100) !== quantity && 
          <div className="flex flex-row space-x-4">
            <Button 
              onClick={(e) => onUpdateCart(e)}
              className="flex bg-white text-green-500 border border-green-500 py-1 w-full justify-center "
              >
              Підтвердити
            </Button>
            <Button 
              onClick={() => setQuantity(Number(data.quantity) || 100)}
              className="flex bg-white text-red-500 border border-red-500 py-1 w-full justify-center"
              >
              Відмінити
            </Button>
          </div>
        }
      </div>
    </li>
  )
}

export default CartItem;
