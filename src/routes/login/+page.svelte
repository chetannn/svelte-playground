<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
</script>

<div class="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<form method="post" action="?/login">
			<Card.Root>
				<Card.Header class="space-y-1">
					<Card.Title class="text-2xl">Sign in to your account</Card.Title>
				</Card.Header>
				<Card.Content class="grid gap-4">
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input id="email" type="email" placeholder="m@example.com" />
					</div>
					<div class="grid gap-2">
						<Label for="password">Password</Label>
						<Input id="password" type="password" />
					</div>
				</Card.Content>
				<Card.Footer>
					<Button type="submit" class="w-full">Login</Button>
				</Card.Footer>
			</Card.Root>
		</form>

		<p class="px-8 text-center text-sm text-muted-foreground">
			Don't have an account ?
			<a href="/register" class="underline underline-offset-4 hover:text-primary">Sign up</a>
		</p>
	</div>
</div>
