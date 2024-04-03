import getBillboard from "@/actions/getBillboard";
import Container from "@/components/ui/Container";
import Billboard from "@/components/Billboard";
import getProducts from "@/actions/getProducts";
import ProductList from "@/components/ProductList";


export const revalidate = 0;

const Home = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("cef44fc4-cc9c-4a98-84aa-a11aef477cbd");

  return (
    <Container>
      <div className="space-y-1">
        <div className="px-5 mt-5">
          <h3 className='font-bold text-md pb-2 text-center'>Виноград Бессарабії</h3>
          <p className='flex text-justify mb-2'>
            &quot;Виноград Бессарабії&quot; є невеликим сімейним бізнесом, який спеціалізується на вирощуванні винограду в українській Бессарабії. 
            Ми вирощуємо різні сорти винограду, включаючи Мерло, Одеський Чорний та Ізабелла, які збирають вручну для відбору плодів найвищої якості для виробництва вина. 
          </p>
          <p className='flex text-justify mb-2'>
            Після цього виноград транспортується до виноробної лабораторії, де проводяться всі необхідні процеси для виробництва вина. 
            Усі процеси виконуються з великою увагою до деталей та використовують традиційні методи виноградарства, щоб забезпечити високу якість та смак винограду та вина. 
          </p>
          <p className='flex text-justify'>
            Хоча &quot;Виноград Бессарабії&quot; не виробляє вино, пропонуються дегустаційні тури для відвідувачів, щоб відчути унікальний смак місцевого винограду.
          </p>
        </div>
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Рекомендовані Продукти" items={products} />
        </div>
      </div>
    </Container>
  )
}

export default Home;
