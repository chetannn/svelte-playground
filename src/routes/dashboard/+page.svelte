<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import type { PageData } from './$types';

	export let data: PageData;

	let users = data.users;

	const table = createTable(readable(users));
	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: 'Id'
		}),
		table.column({
			accessor: 'firstName',
			header: 'Name'
		}),
		table.column({
			accessor: 'email',
			header: 'Email'
		}),
		table.column({
			accessor: 'createdAt',
			header: 'Created At'
		}),
		table.column({
			accessor: ({ id }) => id,
			header: ''
		})
	]);
	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="contents">
	<div class="h-screen lg:fixed lg:flex lg:flex-col lg:w-72">
		<div class="bg-background lg:border-r flex flex-1 flex-col">
			<div class={cn('pb-12')}>
				<div class="space-y-4 py-4">
					<div class="px-3 py-2">
						<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Admin</h2>
						<div class="space-y-1">
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
			<div class="px-3">
				<div class="flex items-center justify-end py-4 gap-3">
					<p>Hello, {data.user.email}</p>

					<form method="post" use:enhance>
						<Button type="submit" size="sm">Logout</Button>
					</form>
				</div>
			</div>
			<div class="px-6 mt-3">
				<div class="rounded-md border">
					<Table.Root {...$tableAttrs}>
						<Table.Header>
							{#each $headerRows as headerRow}
								<Subscribe rowAttrs={headerRow.attrs()}>
									<Table.Row>
										{#each headerRow.cells as cell (cell.id)}
											<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
												<Table.Head {...attrs}>
													<Render of={cell.render()} />
												</Table.Head>
											</Subscribe>
										{/each}
									</Table.Row>
								</Subscribe>
							{/each}
						</Table.Header>
						<Table.Body {...$tableBodyAttrs}>
							{#each $pageRows as row (row.id)}
								<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
									<Table.Row {...rowAttrs}>
										{#each row.cells as cell (cell.id)}
											<Subscribe attrs={cell.attrs()} let:attrs>
												<Table.Cell {...attrs}>
													<Render of={cell.render()} />
												</Table.Cell>
											</Subscribe>
										{/each}
									</Table.Row>
								</Subscribe>
							{/each}
						</Table.Body>
					</Table.Root>
				</div>
			</div>
		</div>
	</main>
</div>
