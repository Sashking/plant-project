<script lang="ts">
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
		if (timeInHours < 24) {
			// hodiny
			return `in ${timeInHours} hours`;
		} else {
			const days = Math.round(timeInHours / 24);
			// 1 den
			if (days == 1) return `za ${days} den`;
			// 2-4 dny
			else if (days >= 2 && days <= 4) return `za ${days} dny`;
			// 5+ dní
			else return `za ${days} dní`;
		}
	}
</script>

<!-- <h1 class="block">Username: {data.user.username}</h1>
<p class="block">ID: {data.user.id}</p> -->

<div class="mb-4 grid w-full grid-cols-1 gap-3 sm:grid-cols-4">
	<a
		href="/new"
		class="flex min-h-12 items-center justify-center rounded-md border border-black transition duration-75 hover:bg-black hover:text-white"
		>PŘIDAT</a
	>

	{#each data.plants as plant}
		<a
			href={'/p/' + plant.id}
			class="relative z-0 w-full rounded-md border border-black bg-neutral-50 hover:bg-neutral-100"
		>
			<img
				src={plant.image}
				alt={'Image of the plant'}
				class="h-52 w-full rounded-t-md border-b border-black object-cover"
			/>
			<div class="px-4 pb-16 pt-2">
				<p class="text-xl font-bold uppercase">{plant.name}</p>
				<p class="line-clamp-2 text-neutral-600">{plant.desc}</p>
				<div class="absolute inset-x-0 bottom-0 p-3">
					<p
						class={`py-1.5 text-sm ${getTimeDiff(plant) < 0 ? 'text-red-600' : 'text-blue-600'} font-medium leading-none`}
					>
						další zalévání {getTimeText(plant)}
					</p>
					<div class={`rounded-full ${getTimeDiff(plant) < 0 ? 'bg-red-200' : 'bg-blue-200'}`}>
						<div
							class={`${getTimeDiff(plant) < 0 ? 'bg-red-600' : 'bg-blue-600'} h-3 rounded-full text-center`}
							style={'width: ' + Math.min((getTimeDiff(plant) / plant.cycle) * 100, 100) + '%'}
						></div>
					</div>
				</div>
			</div>
		</a>
	{/each}
</div>
