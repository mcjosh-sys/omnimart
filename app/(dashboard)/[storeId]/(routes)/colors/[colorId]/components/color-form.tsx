'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

import { AlertModal } from "@/components/modals/alert-modal"
import { Heading } from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Size } from "@prisma/client"
import { Loader2, Trash } from "lucide-react"
import { useState } from "react"



const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
})

type ColorFormValues = z.infer<typeof formSchema>

interface ColorFormProps {
    initialData: Size | null
}

export const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const params = useParams()
    const router = useRouter()

    const title = initialData ? 'Edit color' : 'Create color'
    const description = initialData ? 'Edit color' : 'Add a new color'
    const toastMessage = initialData ? 'Color updated.' : 'Color created.'
    const action = initialData ? 'Save Changes' : 'Create'

    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: ''
        }
    })

    const onSubmit = async (data: ColorFormValues) => {
        try {
            setLoading(true)

            if (initialData)
                await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data)
            else
                await axios.post(`/api/${params.storeId}/colors`, data)
            toast.success(toastMessage)
        } catch (error) {
            toast.error('Something went wrong.')
        } finally {
            setLoading(false)
        }
        router.push(`/${params.storeId}/colors`)
        router.refresh()
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)
            toast.success('Color deleted.')
        } catch (error) {
            toast.error('Make sure your\'ve removed all products using this color first')
        } finally {
            setLoading(false)
            setOpen(false)
        }
        router.push(`/${params.storeId}/colors`)
        router.refresh()
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (<Button
                    disabled={loading}
                    variant='destructive'
                    size='sm'
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4" />
                </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField control={form.control} name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Color name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control} name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input disabled={loading} placeholder="Color value" {...field} />
                                            <div
                                                className="p-4 rounded-full border"
                                                style={{ backgroundColor: field.value }}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="text-xs ml-auto gap-1" type="submit">
                        {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : null}
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    )
}
