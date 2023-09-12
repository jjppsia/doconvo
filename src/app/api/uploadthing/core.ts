/* eslint-disable no-console */

import { auth } from '@clerk/nextjs'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing({
	errorFormatter: (error) => {
		return { message: error.message }
	},
})

const handleAuth = () => {
	const { userId } = auth()

	if (!userId) {
		throw new Error('Unauthorized')
	}

	return { userId }
}

export const ourFileRouter = {
	pdfUploader: f(['pdf'])
		.middleware(() => handleAuth())
		.onUploadComplete(async ({ metadata, file }) => {
			console.log('Upload complete for userId:', metadata.userId)
			console.log('file url', file.url)
		}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
