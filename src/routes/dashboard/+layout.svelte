<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { LayoutDashboard, Settings, MessageCircleMore, Users } from 'lucide-svelte';

	import { cn } from '$lib/utils';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="contents">
	<div class="h-screen lg:fixed lg:flex lg:flex-col lg:w-72">
		<div class="bg-background lg:border-r flex flex-1 flex-col">
			<div class={cn('pb-12')}>
				<div class="space-y-4 py-4">
					<div class="px-3 py-2">
						<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Admin</h2>
						<div class="space-y-1">
							<a href="/dashboard">
								<Button variant="ghost" class="w-full justify-start">
									<LayoutDashboard class="mr-2 h-4 w-4" />
									Dashboard
								</Button>
							</a>

							<a href="/dashboard/users">
								<Button variant="secondary" class="w-full justify-start">
									<Users class="mr-2 h-4 w-4" />
									Users
								</Button>
							</a>
							<Button variant="ghost" class="w-full justify-start">
								<MessageCircleMore class="mr-2 h-4 w-4" />
								Messages
							</Button>
							<Button variant="ghost" class="w-full justify-start">
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
								<DropdownMenu.Item on:click={() => goto('/profile')}>Profile</DropdownMenu.Item>
								<DropdownMenu.Item on:click={() => goto('/settings')}>Settings</DropdownMenu.Item>
							</DropdownMenu.Group>
							<DropdownMenu.Separator />

							<DropdownMenu.Item on:click={() => goto('/login')}>Log out</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</div>
			<div class="px-6 mt-3">
				<slot />
			</div>
		</div>
	</main>
</div>
