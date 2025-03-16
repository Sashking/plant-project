<script lang="ts">
	import { enhance } from '$app/forms';
	import { Sprout } from 'lucide-svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="m-auto space-y-5">
	<div class="flex flex-col items-center space-y-3">
		<Sprout size={32} />
		<span class="text-2xl font-bold">Registrovat</span>
	</div>
	<div class="gap-y-3">
		<form method="post" action="?/register" class="flex flex-col space-y-2" use:enhance>
			<div class="space-y-5">
				<div class="flex w-full flex-col">
					<label for="username" class="mb-2 block text-sm font-medium">Uživatelské jméno</label>
					<input
						id="username"
						name="username"
						placeholder="Vaše uživatelské jméno"
						class="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2 text-sm text-neutral-900 focus:border-blue-500 focus:ring-blue-500"
					/>
				</div>
				<div class="flex w-full flex-col">
					<label for="password" class="mb-2 block text-sm font-medium">Heslo</label>
					<input
						id="password"
						type="password"
						name="password"
						placeholder="Vytvořte heslo"
						class="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2 text-sm text-neutral-900 focus:border-blue-500 focus:ring-blue-500"
					/>
				</div>
			</div>
			<p class="py-3 text-red-500">{form?.message ?? ''}</p>
			<button class="h-10 w-80 rounded-md bg-black text-white hover:bg-neutral-700">Registrovat</button>
		</form>
	</div>
</div>