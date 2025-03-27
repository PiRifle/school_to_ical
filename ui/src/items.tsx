import { motion } from "framer-motion";
import { forwardRef, useEffect, useState, KeyboardEventHandler, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string | null;
    onVerify?: (isValid: boolean) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>();

    useEffect(() => {
        setErrorMessage(props.errorMessage!);
    }, [props.errorMessage]);

    const checkPattern: KeyboardEventHandler<HTMLInputElement> = (evt) => {
        const regex = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gm;
        
        const isValid = regex.test((evt.target as HTMLInputElement).value);
        setErrorMessage(isValid ? undefined : "niewłaściwy link :c");
        if (props.onVerify) props.onVerify(isValid);
    };

    return (
        <div className="relative flex flex-col items-center">
            <input 
                {...props} 
                onKeyUp={checkPattern} 
                ref={ref} 
                className="px-10 min-w-96 py-3 block rounded-full outline-none bg-transparent backdrop:blur-3xl border-primary shadow-primary border-2" 
                style={{ boxShadow: "0px 0px 40px -10px var(--tw-shadow-color)" }} 
                type="text" 
            />
            <motion.div 
                animate={errorMessage ? {} : { opacity: 0, y: -20 }} 
                className="relative top-4 min-w-max -z-10"
            >
                <div 
                    className="absolute -translate-x-1/2 px-4 min-w-max py-2 border-2 border-danger rounded-full bg-danger bg-opacity-55 border-opacity-75 backdrop-blur-xl shadow-danger" 
                    style={{ boxShadow: "0px 0px 40px -10px var(--tw-shadow-color)" }}
                >
                    {errorMessage}
                </div>
            </motion.div>
        </div>
    );
});
