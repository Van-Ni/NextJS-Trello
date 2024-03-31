import { ClerkProvider } from '@clerk/nextjs';
import React from 'react'

type Props = {
    children: React.ReactNode;
}

const PlatformLayout = ({ children }: Props) => {
    return (
        <ClerkProvider>
            {children}
        </ClerkProvider>
    )
}

export default PlatformLayout;