<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { LayoutDashboard, Settings, MessageCircleMore, Users } from 'lucide-svelte';

	import { cn } from '$lib/utils';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<div class="contents">
	<div class="h-screen lg:fixed lg:flex lg:flex-col lg:w-72">
		<div class="bg-background lg:border-r flex flex-1 flex-col">
			<div class={cn('pb-12')}>
				<div class="space-y-4 py-4">
					<div class="px-3 py-2">
						<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Admin</h2>
						<div class="space-y-1">
							<Button
								variant={$page.url.pathname === '/dashboard' ? 'secondary' : 'ghost'}
								class="w-full justify-start"
								on:click={() => goto('/dashboard')}
							>
								<LayoutDashboard class="mr-2 h-4 w-4" />
								Dashboard
							</Button>

							<Button
								variant={$page.url.pathname === '/dashboard/users' ? 'secondary' : 'ghost'}
								class="w-full justify-start"
								on:click={() => goto('/dashboard/users')}
							>
								<Users class="mr-2 h-4 w-4" />
								Users
							</Button>
							<Button
								variant="ghost"
								class="w-full justify-start"
								on:click={() => goto('/dashboard/messages')}
							>
								<MessageCircleMore class="mr-2 h-4 w-4" />
								Messages
							</Button>
							<Button
								variant={$page.url.pathname === '/dashboard/settings' ? 'secondary' : 'ghost'}
								class="w-full justify-start"
								on:click={() => goto('/dashboard/settings')}
							>
								<Settings class="mr-2 h-4 w-4" />
								Settings
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<main class="h-[100vh] lg:pl-72">
		<div class="h-full flex flex-col">
			<div class="px-3 border-b">
				<div class="flex items-center justify-end py-4 gap-3">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild let:builder>
							<Button builders={[builder]} variant="ghost" class="h-8 w-8 p-0 rounded-full">
								<Avatar.Root class="h-8 w-8">
									<Avatar.Image src="https://github.com/chetannn.png" alt="chetannn" />
									<Avatar.Fallback>CK</Avatar.Fallback>
								</Avatar.Root>
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content class="w-52">
							<DropdownMenu.Label class="font-normal">
								<div class="flex flex-col space-y-1">
									<p class="text-sm font-medium leading-none">
										{data.user.email}
									</p>
								</div>
							</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.Group>
								<DropdownMenu.Item on:click={() => goto('/dashboard/profile')}
									>Profile</DropdownMenu.Item
								>
								<DropdownMenu.Item on:click={() => goto('/dashboard/settings')}
									>Settings</DropdownMenu.Item
								>
							</DropdownMenu.Group>

							<DropdownMenu.Separator />

							<DropdownMenu.Group>
								<form use:enhance action="/dashboard?/logout" method="post">
									<button class="w-full">
										<DropdownMenu.Item>Logout</DropdownMenu.Item>
									</button>
								</form>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</div>
			<div class="px-6 mt-3 container mx-auto">
				<slot />
			</div>
		</div>
	</main>
</div>
