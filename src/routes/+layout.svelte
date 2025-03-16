<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<Navbar />

<main class="container mx-auto pt-[82px] w-full min-h-screen">
	{@render children()}
</main>
