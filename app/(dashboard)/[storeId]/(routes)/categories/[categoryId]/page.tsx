
import prismadb from '@/lib/prismadb';

import CategoryForm from './components/category-form';
import { toast } from 'react-hot-toast';

const CategoryPage = async ({
  params
}: {
  params: {categoryId: string, storeId: string}
}) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    }
  })

  let category;
  try {
    category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId
      }
    })
  } catch (error) {
    category = null;
  }
  console.log(billboards);
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <CategoryForm billboards={billboards} initialData={category}/>
        </div>
    </div>
  )
}

export default CategoryPage;
