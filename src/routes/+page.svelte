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
		const diff = getTimeDiff(plant);
		const timeInHours = Math.floor(diff * 24);

		// prvne potrebujeme zjistit, zda uz je pozde
		if (diff <= 0) {
			if (timeInHours > 24) {
				// před 1 hodinou
				if (timeInHours == 1) return `před ${timeInHours} hodinou`;
				// před 2+ hodinami
				else return `před ${timeInHours} hodinami`;
			} else {
				const days = Math.abs(Math.round(timeInHours / 24));
				// před 1 dnem
				if (days == 1) return `před ${days} dnem`;
				// před 2+ dny
				else return `před ${days} dny`;
			}
		} else {
			if (timeInHours < 24) {
				// za 1 hodinu
				if (timeInHours == 1) return `za ${timeInHours} hodinu`;
				// za 2-4 hodiny
				else if (timeInHours >= 2 && timeInHours <= 4) return `za ${timeInHours} hodiny`;
				// za 5+ hodin nebo případně 0 hodin
				else return `za ${timeInHours} hodin`;
			} else {
				const days = Math.round(timeInHours / 24);
				// za 1 den
				if (days == 1) return `za ${days} den`;
				// za 2-4 dny
				else if (days >= 2 && days <= 4) return `za ${days} dny`;
				// za 5+ dní
				else return `za ${days} dní`;
			}
		}
	}

	function getEmotion(plant: Plant) {
		// get percentage until next watering / how late
		// 100%		= just watered
		// 10%		= about to be watered
		// -100%	= late whole 1 cycle

		const percentageDiff = Math.round((getTimeDiff(plant) / plant.cycle) * 100 * 100) / 100;

		// 🥰 80	-	100%
		if (percentageDiff >= 80) return '🥰';
		// 🙂 30	-	79%
		else if (percentageDiff >= 30) return '🙂';
		// 😐 1		-	29%
		else if (percentageDiff >= 0) return '😐';
		// 🤒 -50	-	0%
		else if (percentageDiff >= -50) return '🤒';
		// ⚠️ -199	-	51%
		else if (percentageDiff >= -200) return '⚠️';
		// 💀 -200%
		else return '💀';
	}
</script>

<div class="mb-4 grid w-full grid-cols-1 gap-3 md:grid-cols-4">
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
			<div class="px-4 py-2">
				<p class="text-xl font-bold uppercase">{getEmotion(plant)} {plant.name}</p>
				<!-- <p class="line-clamp-2 text-neutral-600">{plant.desc}</p> -->
				<div class="py-1.5">
					<p
						class={`py-1.5 text-sm ${getTimeDiff(plant) < 0 ? 'text-red-600' : 'text-blue-600'} font-medium leading-none`}
					>
						plánováné zalévání {getTimeText(plant)}
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
