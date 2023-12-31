"use client";
import React, { useEffect, useState } from 'react'
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';

interface AlertModalProps {
    isOpen: boolean,
    onClose: () => void,
    onConfirm: () => void,
    loading: boolean;
}
const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading
}) => {

const [isMounted, setIsMounted] = useState(false);
useEffect(() => {
    setIsMounted(true);
}, []);

if(!isMounted) {
    return null;
}
  return (
    <Modal
    title='Are you sure?'
    description={`The action can't be undone.`}
    isOpen={isOpen}
    onClose={onClose}
    >
        <div className='w-full pt-6 space-x-2 flex items-center justify-end'>
            <Button disabled={loading} variant="outline" onClick={onClose}>
                Cancel
            </Button>
            <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                Delete
            </Button>
        </div>
    </Modal>
  )
}

export default AlertModal