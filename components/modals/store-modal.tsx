"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import toast from "react-hot-toast"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    name: z.string().min(1)
})

export const StoreModal = () => {
    const storeModal = useStoreModal()

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        let res
        try {
            setLoading(true)
            res = await axios.post('/api/stores', values)
            window.location.assign(`/${res!.data.id}`)
        } catch (error) {
            toast.error('Something went wrong.')
            console.log('[STORE_MODAL]', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title="Create Store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="E-Commerce" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button
                                    disabled={loading}
                                    variant='outline'
                                    onClick={storeModal.onClose}>Cancel</Button>
                                <Button disabled={loading} type="submit" className="gap-1">
                                    {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin"/>
                                ): null } Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}