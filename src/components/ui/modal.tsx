import React from "react";
import { Sheet, SheetContent, SheetHeader } from "./sheet";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogProps } from "vaul";

type IModalProps = {
  size: "sm" | "md" | "lg";
  children: React.ReactNode;
  title?: string;
  description?: string;
  open?: DialogProps["open"];
  onClose?: () => void;
  onOpenChange?: DialogProps["onOpenChange"];
};

const Modal = ({
  size = "lg",
  children,
  title,
  description,
  onOpenChange,
  open,
  onClose,
}: IModalProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal>
      <DialogTitle></DialogTitle>
      <DialogDescription></DialogDescription>
      <SheetContent onClose={onClose} size={size}>
        <SheetHeader>
          <header className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-xl font-semibold">{title}</h1>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </header>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default Modal;
