
import { toast } from "react-toastify";
import type { ToastContentProps } from "react-toastify";

export const ToastNotify = {
    success: (msg: string) => toast.success(msg),
    error: (msg: string) => toast.error(msg),
    info: (msg: string) => toast.info(msg),
    warn: (msg: string) => toast.warn(msg),

    confirm: (message: string, onConfirm: () => void) => toast.info(({ closeToast }: ToastContentProps) => (
        <div>
            <p>{message}</p>
                <div>
                    <button
                        onClick= {() => { onConfirm(); closeToast();}}
                    >
                        Sim
                    </button>

                    <button onClick = {closeToast}>
                        Cancelar
                    </button>
                </div>
        </div>
      ), {autoClose: false }
    )
};
