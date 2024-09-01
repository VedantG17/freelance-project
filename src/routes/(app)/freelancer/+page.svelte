<script lang="ts">
  import users from './users.json'; // Adjust the path if the JSON file is in a different folder

  // Use the imported JSON data as the variable for rendering
  export let data = users; 
</script>

<h1 class="font-semibold text-xl mb-4">Freelancers</h1>

<!-- Loop through each user in the data array to create a card -->
{#each data as person}
  <div class="card card-compact bg-base-100 w-96 shadow-xl my-4">
    <figure>
      <img
        src={person.image}
        alt={person.name}
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        {person.name}
        <div class="badge badge-secondary ml-2">&#9733; {person.rating}</div>
      </h2>
      <p>{person.description}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Book Now</button>
      </div>
    </div>
  </div>
{/each}
