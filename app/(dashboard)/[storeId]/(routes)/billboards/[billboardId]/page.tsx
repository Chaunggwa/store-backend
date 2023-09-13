
import prismadb from '@/lib/prismadb';

import BillboardForm from './components/billboard-form';
import { toast } from 'react-hot-toast';

const BillboardPage = async ({
  params
}: {
  params: {billboardId: string, storeId: string}
}) => {
  let billboard = null;
  try {
      billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId
      }
     });
    
   } catch (error) {
     return (
      <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
         <BillboardForm initialData={null} />
      </div>
  </div>
     );
   }
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <BillboardForm initialData={billboard}/>
        </div>
    </div>
  )
}

export default BillboardPage;
