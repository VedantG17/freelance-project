<script>
	import Icon from '@iconify/svelte';

	export let data;
</script>

<div class="hero mt-32">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold">Login now!</h1>
			<p class="py-6">
				Seamlessly manage your freelance finances with our dynamic platform designed specifically
				for freelancers. Transform financial chaos into clarity by effortlessly tracking your
				income, expenses, projects, and cash flow all in one place. Gain valuable insights into your
				earnings, optimize your budget, and take control of your financial future. Start building
				smart financial habits and focus on what you do best—growing your freelance business.
			</p>
		</div>
		<div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
				{#if data.user}
					<form action="/logout" method="get">
						<button class="btn btn-primary w-full">Sign out</button>
					</form>
				{:else}
					<a class="btn btn-primary" href="/login/github">
						<Icon icon="fa6-brands:github" />
						Continue with GitHub
					</a>
					<a class="btn btn-primary" href="/login/google">
						<Icon icon="fa6-brands:google" />
						Continue with Google
					</a>
				{/if}
			</div>
		</div>
	</div>
</div>
