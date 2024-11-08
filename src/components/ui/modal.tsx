import React from 'react';
import { Sheet, SheetContent, SheetHeader } from './sheet';

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
  onClose,
}: IModalProps) => {
  return (
    <Sheet defaultOpen modal>
      <SheetContent onClose={onClose} size={size}>
        <SheetHeader>
          <header className='flex items-center justify-between px-6 py-4'>
            <div>
              <h1 className='text-xl font-semibold'>{title}</h1>
              <p className='text-sm text-gray-500'>{description}</p>
            </div>
          </header>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default Modal;
