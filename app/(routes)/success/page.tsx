import Button from '@/components/ui/Button';
import { PackageCheck } from 'lucide-react';
import Link from 'next/link';
import EmailCopy from './components/EmailCopy';
import getOrder from '@/actions/getOrder';


interface SuccessPageProps {
    params: {
        orderId: string;
    }
}

const Success: React.FC<SuccessPageProps> = async ({
    params
}) => {
    // const order = await getOrder(params.orderId);
    return (
      <div className='p-10'>
        <div className='flex justify-center mt-20 items-center'>
            <PackageCheck className='mr-2' size={100} strokeWidth={1} color='green' />
            <h1 className='text-5xl font-bold'>Дякуємо за заявку!</h1>
        </div>
        <div className='mt-10'>
            <h2 className='text-4xl text-center'>Будь ласка, перевірте вашу електронну пошту</h2>
            <div className='text-3xl text-center my-10'>
                <h3>Якщо у вас є якісь питання, будь ласка, надішліть нам листа за електронною поштою нижче:</h3>
                <div className='flex justify-center items-center'>
                    <a href="mailto:vinogradnik.bessarabii@gmail.com">
                        <code className="relative rounded px-[0.5rem] py-[0.5rem] font-mono text-sm sm:text-2xl font-semibold">vinogradnik.bessarabii@gmail.com</code>
                    </a> 
                    <EmailCopy emailAddress={'vinogradnik.bessarabii@gmail.com'} />
                </div>
            </div>
        </div>
        <div>
            <div className='text-3xl text-center'>
                {params.orderId
                ? `Номер замовлення ${params.orderId.slice(-6)}`
                : `Ваш замовлення в процесі обробки`}
            </div>
            <Link href="/" className='flex justify-center my-10'>
                <Button>
                    Перейти на головну сторінку
                </Button>
            </Link>
        </div>
      </div>
    )
}

export default Success;
