
import React from 'react';
import { toast } from 'sonner';
import { CheckIcon, InfoIcon, AlertTriangleIcon, XIcon } from 'lucide-react';

interface ToastProps {
  title: string;
  description?: string;
}

export const useAlertToast = () => {
  const successToast = ({ title, description }: ToastProps) => {
    toast.success(
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        {description && <div className="text-sm text-muted-foreground">{description}</div>}
      </div>,
      {
        icon: <CheckIcon className="h-4 w-4 text-green-500" />,
        className: "bg-green-50 border-green-200",
      }
    );
  };

  const errorToast = ({ title, description }: ToastProps) => {
    toast.error(
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        {description && <div className="text-sm text-muted-foreground">{description}</div>}
      </div>,
      {
        icon: <XIcon className="h-4 w-4 text-red-500" />,
        className: "bg-red-50 border-red-200",
      }
    );
  };

  const infoToast = ({ title, description }: ToastProps) => {
    toast.info(
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        {description && <div className="text-sm text-muted-foreground">{description}</div>}
      </div>,
      {
        icon: <InfoIcon className="h-4 w-4 text-blue-500" />,
        className: "bg-blue-50 border-blue-200",
      }
    );
  };

  const warningToast = ({ title, description }: ToastProps) => {
    toast.warning(
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        {description && <div className="text-sm text-muted-foreground">{description}</div>}
      </div>,
      {
        icon: <AlertTriangleIcon className="h-4 w-4 text-yellow-500" />,
        className: "bg-yellow-50 border-yellow-200",
      }
    );
  };

  return {
    success: successToast,
    error: errorToast,
    info: infoToast,
    warning: warningToast
  };
};
