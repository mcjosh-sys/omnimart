import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import {SettingsForm} from './components/settings-form'
import Container from '@/components/ui/container'

interface SettingsPageProps {
    params: { storeId: string }
}

const SettingsPage = async ({ params }: SettingsPageProps) => {
    const { userId } = auth()

    if (!userId) redirect('/sign-in')

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    if(!store) redirect('/')

    return (
        <Container>
            <SettingsForm initialData={store} />
        </Container>
    )
}

export default SettingsPage