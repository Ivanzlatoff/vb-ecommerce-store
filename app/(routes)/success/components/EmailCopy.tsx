"use client";

import { Check, Copy } from 'lucide-react';
import { useState } from 'react'
import toast from 'react-hot-toast';


interface SuccessPageProps {
    emailAddress: string;

}

const EmailCopy: React.FC<SuccessPageProps> = ({
    emailAddress
}) => {
    const [copied, setCopied] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(emailAddress);
        toast.success("Адреса електронної пошти скопійовано");
        setCopied(true) 
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }
  return (
    <div onClick={onCopy} className="h-8 w-8 m-2 flex items-center">
        {!copied ? <Copy className="h-6 w-6"/> : <Check className="h-6 w-6"/>}
    </div>  
  )
}

export default EmailCopy
