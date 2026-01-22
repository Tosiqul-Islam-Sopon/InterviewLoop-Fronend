'use client'


import { Footer } from "@/components/custom/footer";
import { Navbar } from "@/components/custom/navbar";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    const isAdmin = pathname.startsWith('/admin')   
    return (
        <div>
            {!isAdmin && <Navbar />}
            <main className={`${isAdmin ? '' : 'pt-20'}`}>{children}</main>
            {!isAdmin && <Footer />}
        </div>
    )
}   