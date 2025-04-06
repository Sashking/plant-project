<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import '../app.css';

	let { data, children } = $props();

	const signedIn = Object.keys(data).length != 0;
</script>

<Navbar {signedIn} />

<main class="container mx-auto min-h-screen w-full px-4 pt-[82px] md:px-0">
	{@render children()}
</main>
