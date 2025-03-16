<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	import { createUploadThing } from '$lib/utils/uploadthing';

	let url = $state('');

	const { startUpload } = createUploadThing('imageUploader', {
		onClientUploadComplete: (res) => {
			url = res[0].ufsUrl;
			console.log('upload completed! res:', res[0]);
		}
	});

	let { data }: { data: PageServerData } = $props();
</script>

<form
	class="flex flex-col gap-8 rounded-md bg-neutral-50 p-4"
	method="post"
	action="?/new"
	use:enhance={({ formData }) => {
		formData.append('image', url);
	}}
>
	<label>
		Name of the plant:
		<input name="name" type="text" autocomplete="off" required />
	</label>
	<label>
		Picture:
		<input
			type="file"
			onchange={async (e) => {
				const file = e.currentTarget.files?.[0];
				if (!file) return;

				// Start the upload
				await startUpload([file]);
			}}
		/>
	</label>
	<label>
		Notes:
		<textarea name="desc"></textarea>
	</label>
	<label>
		Watering cycle (in days):
		<input name="cycle" type="number" min="1" value="1" required />
	</label>

	<button>Submit</button>
</form>
