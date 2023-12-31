"use client";


import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import React from 'react'
import { OrdersColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

interface OrderClientProps {
  data: OrdersColumn[]
}
export const OrderClient: React.FC<OrderClientProps> = ({data}) => {
    
  return (
    <>
    <div className='flex items-center justify-between'>
    <Heading
    title={`Orders (${data.length})`}
    description='Manage orders for your store'
    />
    
    </div>
    <Separator />
    <DataTable columns={columns} data={data} searchKey="products"/>
    </>
  )
}
