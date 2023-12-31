import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'

import { db } from '@/lib/db'
import { chats } from '@/lib/db/schema'
import Chat from '@/components/chat'
import PdfViewer from '@/components/pdf-viewer'
import Sidebar from '@/components/side-bar'

export const metadata: Metadata = {
	title: 'Chats',
}

type ChatPageProps = {
	params: { chatId: string }
}

export default async function ChatPage({ params: { chatId } }: ChatPageProps) {
	const { userId } = auth()
	const isAuthenticated = !!userId

	if (!isAuthenticated) {
		redirect('/sign-in')
	}

	const userChats = await db
		.select()
		.from(chats)
		.where(eq(chats.userId, userId))

	const currentChat = userChats.find((chat) => chat.id === parseInt(chatId))

	if (!userChats || !currentChat) {
		redirect('/')
	}

	return (
		<>
			<Sidebar chatId={parseInt(chatId)} chats={userChats.reverse()} />
			<Chat chatId={parseInt(chatId)} />
			<PdfViewer pdfUrl={currentChat.pdfUrl} />
		</>
	)
}
