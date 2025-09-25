import { getProducts } from '@/components/fetch';
import ProductsPage from '@/components/ProductsPage';

export const revalidate = 3600;

type PageProps = {
  searchParams?: { query?: string };
};

export default async function Home({ searchParams }: PageProps) {
  const products = await getProducts();

  const query = (searchParams?.query ?? '').trim().toLowerCase();

  return <ProductsPage initialProducts={products} initialQuery={query} />;
}