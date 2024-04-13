import { ModalProvider } from '@/components/modals/providers/modal-provider';
import { QueryProvider } from '@/components/modals/providers/query-provider';
import { ClerkProvider } from '@clerk/nextjs';
import React from 'react'
import { Toaster } from 'sonner';

type Props = {
    children: React.ReactNode;
}

const PlatformLayout = ({ children }: Props) => {
    return (
        <ClerkProvider>
            <QueryProvider>
                <ModalProvider />
                <Toaster />
                {children}
            </QueryProvider>
        </ClerkProvider>
    )
}

export default PlatformLayout;