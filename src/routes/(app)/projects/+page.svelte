<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { fly } from 'svelte/transition';

	export let data;
	export let form;

	$: if (form?.message) toast(form.message);

	let addProject: HTMLDialogElement;
	let showCards = false; // Reactive variable to control card visibility

	onMount(() => {
		addProject = document.getElementById('addProject') as HTMLDialogElement;
	});

	// Function to show the cards when the button is clicked
	function handleGetCandidates() {
		showCards = true;
		toast('Fetching Candidates...');
	}

	const numberOfCards = 5; // Number of cards to display

	// List of unique names for the cards
	const names = ['John Doe', 'Jane Smith', 'Emily Johnson', 'Michael Brown', 'Linda Davis'];

	// List of taglines for each person
	const taglines = [
		"Passionate Developer",
		"Creative Designer",
		"Innovative Strategist",
		"Analytical Thinker",
		"Detail-Oriented Manager"
	];

	// Create an array of unique random ratings between 4.2 and 5.0 for the cards
	const generateUniqueRatings = (num: number, min: number, max: number) => {
		const ratingsSet = new Set<number>();

		while (ratingsSet.size < num) {
			// Generate random rating
			const rating = (Math.random() * (max - min) + min).toFixed(1);
			// Add to set to ensure uniqueness
			ratingsSet.add(parseFloat(rating));
		}

		return Array.from(ratingsSet);
	};

	const ratings = generateUniqueRatings(numberOfCards, 4.2, 5.0); // Generates unique random ratings between 4.2 and 5.0

	// List of image URLs for the cards
	const imageUrls = [
		'https://plus.unsplash.com/premium_photo-1678565869434-c81195861939?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2ViJTIwZGV2ZWxvcGVyfGVufDB8fDB8fHww',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0mLAKZfJN3DDn-vtDmZXc_GJ0QCJvmUQUQ&s',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFWP_0gZ9U8MjWuDSzKt8quJ4KW_fZYqdBJarJGiHhqGBoygCVouoOFI61ma8Wl_8Nzgs&usqp=CAU',
		'https://png.pngtree.com/thumb_back/fh260/background/20231004/pngtree-a-conceptual-illustration-of-web-design-development-and-seo-optimization-in-image_13584944.png',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiVdp4RWqWWExz-1_cHd65Cc2KXoyZSI2fNbz8mKcOBG-2NjTbp5bpS8iYefMaZbP4lR8&usqp=CAU'
	];
</script>

<div class="flex flex-wrap gap-4 py-4">
	{#each data.projects as project}
		<div class="bg-base-100 rounded border grow">
			<div class="flex gap-2 items-center border-b px-4 py-2">
				<span class="font-semibold">{project.name}</span>
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
				<button class="btn btn-outline" on:click={handleGetCandidates}>
					<Icon icon="material-symbols:download" /> Get Candidates
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
				<span class="label-text">Description:</span>
				<input type="text" class="input input-bordered" placeholder="Type here" name="desc" />
			</label>
			<label class="form-control">
				<span class="label-text">Languages:</span>
				<input type="text" class="input input-bordered" placeholder="Type here" name="lang" />
			</label>

			<button class="btn btn-primary" type="submit">Save</button>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<!-- Conditionally render the cards with animation -->
{#if showCards}
	<div class="flex gap-4 justify-center">
		{#each Array(numberOfCards) as _, index (index)}
			<div
				class="card card-compact bg-base-100 w-60 shadow-xl mt-4"
				transition:fly={{ x: -200, duration: 500, delay: index * 100 }}
			>
				<figure>
					<img
						src={imageUrls[index]}
						alt="Image"
					/>
				</figure>
				<div class="card-body">
					<h2 class="card-title text-sm">
						{names[index]}
						<!-- Display the unique name here -->
						<div class="badge badge-secondary">&#9733; {ratings[index]}</div>
					</h2>
					<p>{taglines[index]}</p> <!-- Personalized tagline for each person -->
					<div class="card-actions justify-end">
						<button class="btn btn-primary">Book Now</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
