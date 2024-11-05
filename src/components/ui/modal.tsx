import React from 'react';
import { Sheet, SheetContent, SheetHeader } from './sheet';
import { Separator } from './separator';

type IModalProps = {
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  title?: string;
  description?: string;
  onClose?: () => void;
};

const Modal = ({
  size = 'lg',
  children,
  title,
  description,
  onClose
}: IModalProps) => {
  return (
    <Sheet defaultOpen modal >
      <SheetContent onClose={onClose} size={size}>
        <SheetHeader>
          <div className='space-y-0.5'>
            <h2 className='text-2xl font-bold tracking-tight'>
              {title}
            </h2>
            <p className='text-muted-foreground'>{description}</p>
          </div>
        </SheetHeader>
        <Separator className='my-4' />
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default Modal;
