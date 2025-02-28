<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import '../app.css';
	let { data, children } = $props();

	console.log(data)
</script>

<Navbar signedIn={!!data} />

<main class="container mx-auto min-h-screen w-full pt-[82px]">
	{@render children()}
</main>
