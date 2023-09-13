"use client";


import { Button } from "./button";
import { 
  Dialog,
  DialogContent, 
  DialogDescription,
  DialogFooter,
  DialogHeader, 
  DialogTitle, 
  DialogTrigger } from "./dialog";

interface ModalProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
    title,
    description,
    isOpen,
    onClose,
    children
}) => {
    const onChange = (open: boolean) => {
        if(!open) {
           onClose();
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">စတိုးဆိုင်ဆောက်မည်</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div>
         {children}
        </div>
       
      </DialogContent>
    </Dialog>
    )
}