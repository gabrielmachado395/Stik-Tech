import React, { useState, ReactNode, useRef, useEffect } from 'react';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

interface CollapsibleMenuProps {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
}
// Função para o menu colapsável
export const CollapsibleMenu: React.FC<CollapsibleMenuProps> = ({ title, children, defaultOpen = false }) => {
    const [open, setOpen] = useState(defaultOpen);
    const [height, setHeight] = useState(open ? 'auto' : '0px');
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            setHeight(`${contentRef.current?.scrollHeight}px`);
            // Após a animação, libera para auto para permitir redimensionamento interno
            const timeout = setTimeout(() => setHeight('auto'), 300);
            return () => clearTimeout(timeout);
        }
        else {
            if (contentRef.current) {
                setHeight(`${contentRef.current.scrollHeight}px`);
                setTimeout(() => setHeight('0px'), 10); // Pequeno delay para permitir a transição
            }
    }
    }, [open]);

    return (
        <div>
        <button 
        className="font-semibold py-4 mb-2 flex items-center w-full justify-between border-b border-solid focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`collapsible-${title}`}
        type='button'
        >
        {title}
        <span className="ml-2">{open ? <SlArrowUp /> : <SlArrowDown />}</span>
        </button>
        <div 
        ref={contentRef}
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{
            maxHeight: height,
            opacity: open ? 1 : 0,
        }}
        id={`collapsible-${title}`}
        >
        <div className="mt-2">
            {children}
            </div>
        </div>
        </div>
    );
};