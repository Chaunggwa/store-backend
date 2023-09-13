"use client";

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import { ProductColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

interface ProductClientProps {
  data: ProductColumn[]
}
export const ProductClient: React.FC<ProductClientProps> = ({data}) => {
    const router = useRouter();
    const params = useParams();
  return (
    <>
    <div className='flex items-center justify-between'>
    <Heading
    title={`Products (${data.length})`}
    description='Manage Products for your store'
    />
    <Button onClick={() => router.push(`/${params.storeId}/products/new`)} className='flex items-center justify-center'>
        <Plus className='h-4 w-4' />
        <span className='hidden sm:block'>Add new</span>
    </Button>
    </div>
    <Separator />
    <DataTable columns={columns} data={data} searchKey="name"/>
    </>
  )
}
