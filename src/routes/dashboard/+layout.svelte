<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
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
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="mr-2 h-4 w-4"
									>
										<rect width="7" height="7" x="3" y="3" rx="1" />
										<rect width="7" height="7" x="14" y="3" rx="1" />
										<rect width="7" height="7" x="14" y="14" rx="1" />
										<rect width="7" height="7" x="3" y="14" rx="1" />
									</svg>
									Dashboard
								</Button>
							</a>

							<a href="/dashboard/users">
								<Button variant="secondary" class="w-full justify-start">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="mr-2 h-4 w-4"
									>
										<circle cx="12" cy="12" r="10" />
										<polygon points="10 8 16 12 10 16 10 8" />
									</svg>
									Users
								</Button>
							</a>
							<Button variant="ghost" class="w-full justify-start">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="mr-2 h-4 w-4"
								>
									<rect width="7" height="7" x="3" y="3" rx="1" />
									<rect width="7" height="7" x="14" y="3" rx="1" />
									<rect width="7" height="7" x="14" y="14" rx="1" />
									<rect width="7" height="7" x="3" y="14" rx="1" />
								</svg>
								Messages
							</Button>
							<Button variant="ghost" class="w-full justify-start">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="mr-2 h-4 w-4"
								>
									<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
									<path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
									<circle cx="12" cy="12" r="2" />
									<path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
									<path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
								</svg>
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
						<DropdownMenu.Content class="w-56">
							<DropdownMenu.Label class="font-normal">
								<div class="flex flex-col space-y-1">
									<p class="text-sm font-medium leading-none">
										{data.user.email}
									</p>
								</div>
							</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.Group>
								<DropdownMenu.Item on:click={() => goto('/profile')}>
									Profile
									<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
								</DropdownMenu.Item>
								<DropdownMenu.Item on:click={() => goto('/login')}>
									Billing
									<DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
								</DropdownMenu.Item>
								<DropdownMenu.Item on:click={() => goto('/settings')}>
									Settings
									<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
								</DropdownMenu.Item>
							</DropdownMenu.Group>
							<DropdownMenu.Separator />

							<DropdownMenu.Item on:click={() => goto('/login')}>
								Log out
								<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
							</DropdownMenu.Item>
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
