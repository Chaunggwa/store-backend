"use client";

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Billboard } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import { BillboardColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

interface BillboardClientProps {
  data: BillboardColumn[]
}
export const BillboardClient: React.FC<BillboardClientProps> = ({data}) => {
    const router = useRouter();
    const params = useParams();
  return (
    <>
    <div className='flex items-center justify-between'>
    <Heading
    title={`Billboards (${data.length})`}
    description='Manage billboards for your store'
    />
    <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)} className='flex items-center justify-center'>
        <Plus className='h-4 w-4' />
        <span className='hidden sm:block'>Add new</span>
    </Button>
    </div>
    <Separator />
    <DataTable columns={columns} data={data} searchKey="label"/>
    </>
  )
}
