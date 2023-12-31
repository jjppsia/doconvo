import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
	server: {
		CLERK_SECRET_KEY: z.string().min(1),
		DATABASE_URL: z.string().min(1),
		OPENAI_API_KEY: z.string().min(1),
		PINECONE_API_KEY: z.string().min(1),
		PINECONE_ENVIRONMENT: z.string().min(1),
		PINECONE_INDEX_NAME: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
		NEXT_PUBLIC_S3_ACCESS_KEY_ID: z.string().min(1),
		NEXT_PUBLIC_S3_BUCKET_NAME: z.string().min(1),
		NEXT_PUBLIC_S3_SECRET_ACCESS_KEY: z.string().min(1),
		NEXT_PUBLIC_S3_REGION: z.string().min(1),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
			process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
		NEXT_PUBLIC_S3_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
		NEXT_PUBLIC_S3_BUCKET_NAME: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
		NEXT_PUBLIC_S3_SECRET_ACCESS_KEY:
			process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
		NEXT_PUBLIC_S3_REGION: process.env.NEXT_PUBLIC_S3_REGION,
	},
})
