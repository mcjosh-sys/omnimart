"use client"
import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Store } from '@prisma/client'
import { useStoreModal } from '@/hooks/use-store-modal'
import { useParams, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[]
}

export const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
    const storeModal = useStoreModal()
    const params = useParams()
    const router = useRouter()

    const [open, setOpen] = useState(false)

    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id
    }))

    const currentStore = formattedItems.find(({ value }) => value === params.storeId)

    const onStoreSelect = (store: typeof formattedItems[number]) => {
        setOpen(false)
        router.push(`/${store.value}`)
    }
    return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant='outline'
                        size='sm'
                        role='combobox'
                        aria-expanded={open}
                        aria-label='select a store'
                        className={cn('w-[200px] justify-between', className)}
                    >
                        <StoreIcon className='mr-2 h-4 w-4' />
                        {currentStore?.label}
                        <ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                    <Command>
                        <CommandList>
                            <CommandInput placeholder='search store...' />
                            <CommandEmpty>No store found.</CommandEmpty>
                            <CommandGroup heading='Stores'>
                                {formattedItems.map(({ label, value }) => (
                                    <CommandItem
                                        key={value}
                                        onSelect={() => onStoreSelect({ label, value })}
                                        className='text-sm'
                                    >
                                        <StoreIcon className='mr-2 h-4 w-4' />
                                        {label}
                                        <Check className={cn('ml-auto h-4 w-4', currentStore?.value === value ? "opacity-100" : "opacity-0")} />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                        <CommandSeparator />
                        <CommandList>
                            <CommandGroup>
                                <CommandItem onSelect={() => {
                                    setOpen(false)
                                    storeModal.onOpen()
                                }}>
                                    <PlusCircle className='mr-2 h-5 w-5' />
                                    Create Store
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>

            </Popover>
    )
}
