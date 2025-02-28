<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<h1 class="block">Username: {data.user.username}</h1>
<p class="block">ID: {data.user.id}</p>
<form method="post" action="?/logout" use:enhance>
	<button>Sign out</button>
</form>
