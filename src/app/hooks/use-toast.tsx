import { toast as sonnerToast } from "sonner";

// Tipos para compatibilidade com a API anterior
type ToastProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive" | "success";
  action?: React.ReactNode;
  duration?: number;
};

// Função toast ajustada para a API do Shadcn
function toast({
  title,
  description,
  variant,
  action,
  duration = 5000,
}: ToastProps) {
  const id = sonnerToast.custom(
    (t) => (
      <div className="flex items-start gap-3 rounded-md bg-popover border border-border p-4 shadow-sm w-full max-w-sm">
        <div className="flex-1">
          {title && (
            <h3
              className={`font-medium ${
                variant === "destructive"
                  ? "text-destructive"
                  : "text-foreground"
              }`}
            >
              {title}
            </h3>
          )}
          {description && (
            <p
              className={`text-sm ${
                variant === "destructive"
                  ? "text-destructive/80"
                  : "text-muted-foreground"
              } mt-1`}
            >
              {description}
            </p>
          )}
        </div>
        {action}
      </div>
    ),
    {
      duration,
      className: variant === "destructive" ? "border-destructive" : "",
      onDismiss: (t) => sonnerToast.dismiss(t),
    }
  );

  return {
    id,
    dismiss: () => sonnerToast.dismiss(id),
    update: (props: ToastProps) => {
      sonnerToast.custom(
        (t) => (
          <div className="flex items-start gap-3 rounded-md bg-popover border border-border p-4 shadow-sm w-full max-w-sm">
            <div className="flex-1">
              {props.title && (
                <h3
                  className={`font-medium ${
                    props.variant === "destructive"
                      ? "text-destructive"
                      : "text-foreground"
                  }`}
                >
                  {props.title}
                </h3>
              )}
              {props.description && (
                <p
                  className={`text-sm ${
                    props.variant === "destructive"
                      ? "text-destructive/80"
                      : "text-muted-foreground"
                  } mt-1`}
                >
                  {props.description}
                </p>
              )}
            </div>
            {props.action}
          </div>
        ),
        {
          id,
          duration: props.duration || duration,
          className:
            props.variant === "destructive" ? "border-destructive" : "",
        }
      );
    },
  };
}

function useToast() {
  return {
    toast,
    dismiss: (toastId?: string) => sonnerToast.dismiss(toastId),
  };
}

export { useToast, toast };
