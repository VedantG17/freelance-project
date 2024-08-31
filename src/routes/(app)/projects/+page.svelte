<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	export let data;
	export let form;

	$: if (form?.message) toast(form.message);

	let addProject: HTMLDialogElement;
	onMount(() => {
		addProject = document.getElementById('addProject') as HTMLDialogElement;
	});
</script>

<!-- uneven width of cards to be improved -->
<div class="flex flex-wrap gap-4 py-4">
	{#each data.projects as project}
		<div class="bg-base-100 rounded border grow">
			<div class="flex gap-2 items-center border-b px-4 py-2">
				<!-- <img class="w-8 h-8" src="/logos/{project.name}.png" alt="" /> -->
				<span class="font-semibold">
					{project.name}
				</span>

				<!-- add confirmation modal, this will delete transcations aswell. -->
				<form
					class="tooltip tooltip-left ml-auto"
					data-tip="Remove this Project"
					action="?/delete"
					method="post"
					use:enhance
				>
					<input type="hidden" value={project.id} name="id" />
					<button class="btn btn-ghost btn-square btn-sm" type="submit">
						<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
					</button>
				</form>
			</div>

			<div class="p-4 pt-2 flex flex-col gap-2">
				{#each [{ name: 'Description', value: project.desc }, { name: 'Languages', value: project.languages }, { name: "Holder's Name", value: data.user?.name ?? 'XYZ Company' }] as { name, value }}
					<div class="flex gap-2 justify-between items-center">
						<span class="uppercase text-sm">{name}:</span>
						<button
							class="btn btn-ghost btn-xs"
							on:click={() => {
								if (value !== null) {
									navigator.clipboard.writeText(value.toString());
									toast.success('Copied to clipboard');
								}
							}}
						>
							{value}
							<Icon icon="material-symbols:content-copy-outline-rounded" />
						</button>
					</div>
				{/each}

				<button
					class="btn btn-sm"
					on:click={() => {
						navigator.clipboard.writeText(`Project Name: ${project.name}\nCompany's Name: XYZ Ent`);
						toast.success('Copied all details to clipboard');
					}}
				>
					Copy all details
				</button>
				<button class="btn btn-outline" on:click={() => toast('Yet to be Implemented')}>
					<Icon icon="material-symbols:download" /> Download statement
				</button>
			</div>
		</div>
	{/each}
</div>

<button class="btn btn-primary" on:click={() => addProject.showModal()}> Add new Project </button>

<dialog id="addProject" class="modal">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>

		<!-- when request complete close dialoge -->
		<form
			class="flex flex-col gap-2"
			action="?/add"
			method="post"
			use:enhance={() => {
				return async ({ update }) => {
					await update();
					addProject.close();
				};
			}}
		>
			<h3 class="font-bold text-lg">Create Project</h3>

			<label class="form-control">
				<span class="label-text">Name:</span>
				<input type="text" class="input input-bordered" placeholder="Type here" name="name" />
			</label>
			<label class="form-control">
				<span class="label-text">Descrption:</span>
				<input type="text" class="input input-bordered" placeholder="Type here" name="desc" />
			</label>
			<label class="form-control">
				<span class="label-text">Languages:</span>
				<input type="text" class="input input-bordered" placeholder="Type here" name="lang" />
			</label>

			<!-- <label class="form-control">
				<span class="label-text">Languages:</span>
				<select class="select select-bordered" name="name" required multiple>
					<option disabled selected>Select Project</option>
					{#each languages as e}
						<option>{e}</option>
					{/each}
				</select>
			</label> -->

			<button class="btn btn-primary" type="submit">Save</button>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
