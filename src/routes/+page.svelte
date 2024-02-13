<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex flex-col gap-8 items-center justify-center h-dvh">
	<h1 class="text-3xl font-semibold text-center">Welcome to SvelteKit</h1>

	<div class="flex gap-4 items-center">
		<a href="/login">
			<Button>Login</Button>
		</a>

		<a href="/register">
			<Button variant="secondary">Register</Button>
		</a>
	</div>
</div>
