
import { toast } from "react-toastify";
import type { ToastContentProps } from "react-toastify";

export const ToastNotify = {
    success: (msg: string) => toast.success(msg),
    error: (msg: string) => toast.error(msg),
    info: (msg: string) => toast.info(msg),
    warn: (msg: string) => toast.warn(msg),

    confirm: (message: string, onConfirm: () => void) => toast.info(({ closeToast }: ToastContentProps) => (
        <div className="toast-confirm">
            <p className="toast-confirm__message">{message}</p>
                <div className="toast-confirm__actions">
                    <button
                        className="toast-confirm__button toast-confirm__button--confirm"
                        onClick= {() => { onConfirm(); closeToast();}}
                    >
                        Sim
                    </button>

                    <button 
                        className="toast-confirm__button toast-confirm__button--cancel"
                        onClick = {closeToast}>
                        Cancelar
                    </button>
                </div>
        </div>
      ), {autoClose: false, theme: "light" }
    )
};
