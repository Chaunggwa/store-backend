
import prismadb from '@/lib/prismadb';


import { toast } from 'react-hot-toast';
import ColorForm from './components/color-form';

const ColorPage = async ({
  params
}: {
  params: {colorId: string, storeId: string}
}) => {
  let color = null;
  try {
      color = await prismadb.color.findUnique({
      where: {
        id: params.colorId
      }
     });
    
   } catch (error) {
     return (
      <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
         <ColorForm initialData={null} />
      </div>
  </div>
     );
   }
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <ColorForm initialData={color}/>
        </div>
    </div>
  )
}

export default ColorPage;
