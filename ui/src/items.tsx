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
        <div className="relative flex flex-col items-center max-lg:w-full max-lg:px-4">
            <input 
                {...props} 
                onKeyUp={checkPattern} 
                ref={ref} 
                className="block px-10 py-3 bg-transparent border-2 rounded-full outline-none lg:min-w-96 max-lg:min-w-full backdrop:blur-3xl border-primary shadow-primary" 
                style={{ boxShadow: "0px 0px 40px -10px var(--tw-shadow-color)" }} 
                type="text" 
            />
            <motion.div 
                animate={errorMessage ? {} : { opacity: 0, y: -20 }} 
                className="relative lg:top-4 max-lg:absolute max-lg:-top-20 min-w-max -z-10"
            >
                <div 
                    className="absolute px-4 py-2 -translate-x-1/2 border-2 border-opacity-75 rounded-full min-w-max border-danger bg-danger bg-opacity-55 backdrop-blur-xl shadow-danger" 
                    style={{ boxShadow: "0px 0px 40px -10px var(--tw-shadow-color)" }}
                >
                    {errorMessage}
                </div>
            </motion.div>
        </div>
    );
});
