<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();

	const time = new Date().getTime();
	const DAY_IN_MS = 1000 * 60 * 60 * 24;

	type Plant = {
		id: number;
		name: string;
		userId: string;
		image: string | null;
		desc: string | null;
		cycle: number;
		nextCycleTimestamp: Date;
	};

	function getTimeDiff(plant: Plant) {
		return (new Date(plant.nextCycleTimestamp).getTime() - time) / DAY_IN_MS;
	}

	function getTimeText(plant: Plant) {
		const timeInHours = Math.round(getTimeDiff(plant) * 24);
		if (timeInHours < 24) return `in ${timeInHours} hours`;
		else return `in ${Math.round(timeInHours / 24)} days`;
	}
</script>

<h1 class="block">Username: {data.user.username}</h1>
<p class="block">ID: {data.user.id}</p>
<form method="post" action="?/logout" use:enhance>
	<button class="rounded-md bg-red-500 px-2 py-1">Sign out</button>
</form>

<div class="my-8 grid w-full grid-cols-4 gap-3">
	<a
		href="/new"
		class="flex min-h-12 items-center justify-center rounded-md bg-neutral-950 text-neutral-50"
		>NEW</a
	>

	{#each data.plants as plant}
		<div class="relative z-0 w-full rounded-md bg-neutral-50 hover:bg-neutral-100">
			<img
				src={plant.image}
				alt={'Image of the plant'}
				class="h-52 w-full rounded-t-md object-cover"
			/>
			<div class="px-4 pb-6 pt-2">
				<p class="text-xl font-bold uppercase">{plant.name}</p>
				<p class="line-clamp-2">{plant.desc}</p>
				<div class="absolute inset-x-0 bottom-0 rounded-md bg-gray-200">
					<div
						class="rounded-md bg-gradient-to-r from-blue-500 to-blue-600 p-0.5 text-center text-xs font-medium leading-none text-blue-100"
						style={'width: ' + (getTimeDiff(plant) / plant.cycle) * 100 + '%'}
					>
						{getTimeText(plant)}
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
