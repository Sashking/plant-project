<script lang="ts">
	import { enhance } from '$app/forms';
	import { createUploader } from '$lib/utils/uploadthing';
	import { UploadDropzone } from '@uploadthing/svelte';

	let url = $state('');
	let imageName = $state('');

	const uploader = createUploader('imageUploader', {
		onClientUploadComplete: (res) => {
			url = res[0].ufsUrl;
			imageName = res[0].name
		},
		onUploadError: (error: Error) => {
			alert(`NASTALA CHYBA! ${error.message}`);
		}
	});
</script>

<form
	class="mx-auto max-w-2xl pb-12 pt-10"
	method="post"
	action="?/new"
	use:enhance={({ formData }) => {
		formData.append('image', url);
	}}
>
	<h2 class="text-base/7 font-semibold text-gray-900">Rostlina</h2>
	<p class="mt-1 text-sm/6 text-gray-600">
		Přidejte do své sbírky novou rostlinu vyplněním následujícího formuláře.
	</p>

	<div
		class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 border-b border-gray-900/10 pb-12 sm:grid-cols-6"
	>
		<div class="sm:col-span-4">
			<label for="name" class="block text-sm/6 font-medium text-gray-900">Název rostliny <span class="text-red-500">*</span></label>
			<div class="mt-2">
				<div
					class="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-green-600"
				>
					<input
						id="name"
						name="name"
						type="text"
						autocomplete="off"
						required
						class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
						placeholder="Květinka"
					/>
				</div>
			</div>
		</div>

		<div class="col-span-full">
			<label for="uploader" class="block text-sm/6 font-medium text-gray-900">Obrázek</label>
			<UploadDropzone
			{uploader}
			class="ut-upload-icon:size-12 ut-label:text-lg ut-button:text-gray-600"
			> </UploadDropzone>
			{#if url}
				<div class="mt-2">
					Nahrán obrázek <span class="text-green-500">{imageName}</span>
				</div>
			{/if}
		</div>

		<div class="col-span-full">
			<label for="desc" class="block text-sm/6 font-medium text-gray-900">Poznámky</label>
			<div class="mt-2">
				<textarea
					id="desc"
					name="desc"
					rows="3"
					class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
				></textarea>
				<p class="mt-3 text-sm/6 text-gray-600">Napište pár vět o vaší rostlině.</p>
			</div>
		</div>

		<div class="sm:col-span-4">
			<label for="cycle" class="block text-sm/6 font-medium text-gray-900"
				>Zavlažovací cyklus (ve dnech) <span class="text-red-500">*</span></label
			>
			<div class="mt-2">
				<div
					class="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-green-600"
				>
					<input
						id="cycle"
						name="cycle"
						type="number"
						min="1"
						value="1"
						required
						class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
						placeholder="Květinka"
					/>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-6 flex items-center justify-end gap-x-6">
		<a href="/" class="text-sm/6 font-semibold text-gray-900">Zrušit</a>
		<button
			type="submit"
			class="shadow-xs rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
			>Uložit</button
		>
	</div>
</form>
