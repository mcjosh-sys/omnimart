"use client"
import { UserButton } from '@clerk/nextjs'
import { Store } from '@prisma/client'
import { MenuIcon, OrbitIcon, Settings, X } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { MainNav } from './main-nav'
import { StoreSwitcher } from './store-switcher'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
import { useState } from 'react'
import SidePanel from './side-panel'

interface NavbarProps {
    stores: Store[]
}

export const Navbar: React.FC<NavbarProps> = ({ stores }) => {

    const [isOpen, setIsOpen] = useState(false)

    const pathname = usePathname()
    const params = useParams()


    return (
        <>
            <div className='border-b flex justify-center w-full'>
                <div className='flex h-16 items-center w-full max-w-6xl mx-8 ml-4'>
                    <div className='flex items-center justify-between'>
                        <Button
                            onClick={() => setIsOpen(true)}
                            variant="ghost"
                            className='m-0 p-4 xl:hidden'>
                            <MenuIcon />
                        </Button>
                        <h1 className='font-bold text-xl pr-2 hidden sm:block'>OmniMart</h1>
                        <OrbitIcon />
                    </div>
                    <div className='px-8 hidden md:block'>
                        <StoreSwitcher items={stores} />
                    </div>
                    <MainNav className='hidden xl:block' />
                    <div className=' flex items-center space-x-4 ml-auto'>
                        <Button
                            variant="ghost"
                            className='ml-2 p-2'>
                            <Link href={`/${params.storeId}/settings`}>
                                <Settings className={pathname === `/${params.storeId}/settings` ? '' : 'text-muted-foreground'} />
                            </Link>
                        </Button>
                        <ThemeToggle />
                        <UserButton afterSignOutUrl='/' />
                    </div>
                </div>
            </div>
            <SidePanel
                className={isOpen ? 'block' : 'hidden'}
                onClose={() => setIsOpen(false)}
                stores={stores}
            />
        </>
    )
}

