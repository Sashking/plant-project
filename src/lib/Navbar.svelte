<script lang="ts">
	import { enhance } from '$app/forms';
	import NavItem from '$lib/NavItem.svelte';
	// import { enhance } from '$app/forms';
	import { Sprout } from 'lucide-svelte';

	const navigationLinks = [
		{ name: 'blog', href: 'blog' },
		{ name: 'fórum', href: 'forum' },
		{ name: 'dokumentace', href: 'docs' }
	];

	let { signedIn } = $props();
</script>

<nav class="lg-top-6 container fixed inset-x-0 top-4 z-10 mx-auto flex h-[50px] w-full gap-x-2.5 px-4 sm:px-0">
	<!-- home button -->
	<a
		href="/"
		class="flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-md bg-black px-3.5 text-white hover:bg-green-700 hover:text-green-100"
	>
		<Sprout size={32} />
	</a>

	<!-- navigation -->
	<div
		class="flex w-full items-center justify-center gap-1.5 rounded-md bg-black p-2 font-semibold text-white"
	>
		{#each navigationLinks as link}
			<NavItem {link} />
		{/each}
	</div>

	{#if !signedIn}
		<!-- sign in -->
		<a
			href="/signin"
			class="flex h-full cursor-pointer items-center justify-center text-nowrap rounded-md bg-black px-4 py-1.5 font-semibold text-white hover:bg-neutral-700"
		>
			PŘIHLÁSIT SE
		</a>

		<!-- register -->
		<a
			href="/signup"
			class="flex h-full cursor-pointer items-center justify-center text-nowrap rounded-md bg-green-600 px-4 py-1.5 font-semibold text-white hover:bg-green-800"
		>
			REGISTROVAT
		</a>
	{:else}
		<form
			method="post"
			action="?/logout"
			class="flex h-full cursor-pointer items-center justify-center text-nowrap rounded-md bg-red-600 px-4 py-1.5 font-semibold text-white hover:bg-red-800"
			use:enhance
		>
			<button>ODHLÁSIT SE</button>
		</form>
	{/if}
</nav>
