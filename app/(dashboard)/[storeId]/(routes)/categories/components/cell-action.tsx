'use client'
import axios from "axios"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { CategoryColumn } from "./columns"
import { AlertModal } from "@/components/modals/alert-modal"

interface CellActionProps{
    data: CategoryColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const router = useRouter()
    const params = useParams()

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success('Category Id copied to the clipboard.')
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/categories/${data.id}`)
            router.refresh()
            toast.success('Billboard deleted.')
        } catch (error) {
            toast.error('Make sure your\'ve removed all categories first using this billboard')
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }


    return (
      <>
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <Button
                  variant='ghost'
                  className="h-8 w-8 p-0"
              >
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
              </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-sm">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onCopy(data.id)} className="flex flex-row items-center py-0.5 cursor-pointer">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Id
              </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/categories/${data.id}`)} className="flex flex-row items-center py-0.5 cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" />
                  Update
              </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)} className="flex flex-row items-center py-0.5 cursor-pointer">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
              </DropdownMenuItem>
          </DropdownMenuContent>
            </DropdownMenu>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
      </>
  )
}
