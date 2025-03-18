import { createUploadthing } from 'uploadthing/server';
import type { FileRouter } from 'uploadthing/server';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f({
		image: {
			/**
			 * For full list of options and defaults, see the File Route API reference
			 * @see https://docs.uploadthing.com/file-routes#route-config
			 */
			maxFileSize: '16MB',
			maxFileCount: 1
		}
	})
		// Set file types for this FileRoute
		.middleware(async ({ req }) => {
			// This code runs on your server before upload

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { meta: 'Nothing really' };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			// console.log('Upload complete for userId:', metadata.userId);
			// console.log('file url', file.ufsUrl);
		})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
