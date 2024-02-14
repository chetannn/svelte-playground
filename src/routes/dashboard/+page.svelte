<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<pre>{JSON.stringify(data.user, null, 2)}</pre>
<form method="post" use:enhance>
	<Button type="submit">Logout</Button>
</form>
