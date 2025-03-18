<script lang="ts">
	import { Droplets, Pencil, Trash2 } from 'lucide-svelte';
	import type { PageServerData } from './$types';
	import { enhance } from '$app/forms';

	let { data }: { data: PageServerData } = $props();
</script>

<div class="grid grid-cols-3 gap-4">
	<div class="rounded-md bg-neutral-50 p-4">
		<img class="w-full rounded-md object-cover" src={data.plant.image} alt="Plant" />
		<p class="mb-2 mt-4 text-2xl font-bold">{data.plant.name}</p>
		<p class="text-neutral-600">{data.plant.desc}</p>
		<form method="post" action="?/water" use:enhance>
			<button
				class="mt-4 flex w-full items-center justify-center rounded-md border border-blue-600 bg-blue-600 p-4 text-white transition duration-75 hover:bg-white hover:text-black"
			>
				<Droplets size={16} />
				<span class="ml-2">ZALÍT</span>
			</button>
		</form>
		<div class="mt-2 grid grid-cols-3 gap-2">
			<a
				href={'/e/' + data.plant.id}
				class="col-span-2 flex items-center justify-center rounded-md border border-yellow-500 p-4 text-black transition duration-75 hover:bg-yellow-500"
			>
				<Pencil size={16} />
				<span class="ml-2">EDITOVAT</span>
			</a>
			<form method="post" action="?/delete" use:enhance>
				<button
					class="flex w-full items-center justify-center rounded-md border border-red-500 p-4 text-black transition duration-75 hover:bg-red-500 hover:text-white"
				>
					<Trash2 size={16} />
					<span class="ml-2">SMAZAT</span>
				</button>
			</form>
		</div>
	</div>
	<div class="col-span-2 w-full">
		<!-- schedule of the next watering? -->
		{data.plant.nextCycleTimestamp}
	</div>
</div>
