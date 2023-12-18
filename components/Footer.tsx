import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import paymentPicture from '../app/pictures/payment.png';


const Footer = () => {
  return (
    <footer className='bg-white border-t'>
      <div className="space-y-4 p-4">
        <div>
          <h3 className='font-bold text-md pb-2 text-center'>Виноград Бессарабії</h3>
          <p className='flex text-sm text-justify'>
            &quot;Виноград Бессарабії&quot; є невеликим сімейним бізнесом, який спеціалізується на вирощуванні винограду в українській Бессарабії. Ми вирощуємо різні сорти винограду, включаючи Мерло, Одеський Чорний та Ізабелла, які збирають вручну для відбору плодів найвищої якості для виробництва вина. Після цього виноград транспортується до виноробної лабораторії, де проводяться всі необхідні процеси для виробництва вина. Усі процеси виконуються з великою увагою до деталей та використовують традиційні методи виноградарства, щоб забезпечити високу якість та смак винограду та вина. Хоча "Виноград Бессарабії" не виробляє вино, пропонуються дегустаційні тури для відвідувачів, щоб відчути унікальний смак місцевого винограду.
          </p>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex items-center text-md'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center justify-center ml-3'>
                <Phone className='h-5 w-5 mr-3' /> 
                <a href='tel:+380961040713'>+38 (096) 104 07 13</a>
              </div>
              <div className='flex items-center justify-center ml-3'>
                <Mail className='h-5 w-5 mr-3' />
                <a href='mailto:ivanzlatoff@gmail.com'>ivanzlatoff@gmail.com</a>
              </div>
            </div>
          </div>
          <div className='flex justify-center'>
            <Image
              src={paymentPicture}
              width={200}
              height={24}
              alt="payment_cards"
              />
          </div>
        </div>
      </div>
      <hr />
      <div className='mx-auto py-8'>
        <p className='text-center text-xs text-black'>
          &copy; 2023 Vinogradnik Bessarabii Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer;
