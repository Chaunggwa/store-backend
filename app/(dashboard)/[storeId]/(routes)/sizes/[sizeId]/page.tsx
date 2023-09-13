
import prismadb from '@/lib/prismadb';


import { toast } from 'react-hot-toast';
import SizeForm from './components/size-form';

const SizePage = async ({
  params
}: {
  params: {sizeId: string, storeId: string}
}) => {
  let size = null;
  try {
      size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId
      }
     });
    
   } catch (error) {
     return (
      <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
         <SizeForm initialData={null} />
      </div>
  </div>
     );
   }
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <SizeForm initialData={size}/>
        </div>
    </div>
  )
}

export default SizePage;
