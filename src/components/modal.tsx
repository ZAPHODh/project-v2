import React, { Fragment } from "react";
import {
  Dialog,
  TransitionChild,
  Transition,
  DialogPanel,
} from "@headlessui/react";
import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  close: () => void;
  size?: "small" | "medium" | "large";
  search?: boolean;
  children: React.ReactNode;
  "data-testid"?: string;
};

const Modal = ({
  isOpen,
  close,
  size = "medium",
  search = false,
  children,
  "data-testid": dataTestId,
}: ModalProps) => {
  const sizeClasses = {
    small: "max-w-md",
    medium: "max-w-xl",
    large: "max-w-3xl",
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[75]" onClose={close}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-md" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className={`flex min-h-full h-full justify-center p-4 ${
              search ? "items-start" : "items-center"
            }`}
          >
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                data-testid={dataTestId}
                className={` overflow-x-auto flex flex-col justify-start w-full transform p-5 text-left align-middle transition-all h-fit ${
                  sizeClasses[size]
                } ${
                  search
                    ? "bg-transparent shadow-none"
                    : "bg-white dark:bg-black shadow-xl border rounded-lg"
                }`}
              >
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const Title: React.FC<{ children: React.ReactNode; close: () => void }> = ({
  children,
  close,
}) => (
  <div className="flex items-center justify-between ">
    <h2 className="text-lg font-semibold">{children}</h2>
    <button
      onClick={close}
      data-testid="close-modal-button"
      className="text-gray-500 hover:text-gray-700"
    >
      <X size={20} />
    </button>
  </div>
);

const Description: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm text-gray-600 mt-2">{children}</p>
);

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mt-4 ">{children}</div>
);

const Footer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mt-4 flex justify-end gap-4">{children}</div>
);

Modal.Title = Title;
Modal.Description = Description;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
