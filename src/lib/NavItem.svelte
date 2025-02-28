<script>
	let { link } = $props();
</script>

<a href={link.href} class="cursor-pointer rounded-md px-3 py-1.5 uppercase hover:bg-neutral-600"
	>{link.name}</a
>
