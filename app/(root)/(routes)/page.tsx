"use client";
import { Button } from '@/components/ui/button'

import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Modal } from '@/components/ui/modal'
import React, { useEffect } from 'react'
import { useStoreModal } from '@/hooks/use-store-modal';

const Root = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if(!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return null;
}

export default Root  