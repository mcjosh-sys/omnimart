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
import { ImageUpload } from "@/components/ui/image-upload"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useOrigin } from "@/hooks/use-origin"
import { Billboard } from "@prisma/client"
import { Loader2, Trash } from "lucide-react"
import { useState } from "react"



const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1)
})

type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormProps {
    initialData: Billboard | null
}

export const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const params = useParams()
    const router = useRouter()

    const origin = useOrigin()

    const title = initialData ? 'Edit billboard' : 'Create billboard'
    const description = initialData ? 'Edit billboard' : 'Add a new billboard'
    const toastMessage = initialData ? 'Billboard updated.' : 'Billboard created.'
    const action = initialData ? 'Save Changes' : 'Create'

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        }
    })

    const onSubmit = async (data: BillboardFormValues) => {
        try {
            setLoading(true)

            if (initialData)
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
            else
                await axios.post(`/api/${params.storeId}/billboards`, data)
            toast.success(toastMessage)
        } catch (error) {
            toast.error('Something went wrong.')
        } finally {
            setLoading(false)
        }
        router.push(`/${params.storeId}/billboards`)
        router.refresh()
    }
    
    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            toast.success('Billboard deleted.')
        } catch (error) {
            toast.error('Make sure your\'ve removed all categories first using this billboard')
        } finally {
            setLoading(false)
            setOpen(false)
        }
        router.push(`/${params.storeId}/billboards`)
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
                    <FormField control={form.control} name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Background Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange('')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField control={form.control} name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Billboard label" {...field} />
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
