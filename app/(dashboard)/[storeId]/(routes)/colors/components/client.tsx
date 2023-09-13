"use client";

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Color } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import { ColorColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

interface ColorClientProps {
  data: ColorColumn[]
}
export const ColorClient: React.FC<ColorClientProps> = ({data}) => {
    const router = useRouter();
    const params = useParams();
  return (
    <>
    <div className='flex items-center justify-between'>
    <Heading
    title={`Colors (${data.length})`}
    description='Manage Colors for your store'
    />
    <Button onClick={() => router.push(`/${params.storeId}/colors/new`)} className='flex items-center justify-center'>
        <Plus className='h-4 w-4' />
        <span className='hidden sm:block'>Add new</span>
    </Button>
    </div>
    <Separator />
    <DataTable columns={columns} data={data} searchKey="name"/>
    </>
  )
}
