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
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Рекомендовані Продукти" items={products} />
        </div>
      </div>
    </Container>
  )
}

export default Home;
