<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	let loaded = false;

	onMount(() => (loaded = true));
</script>

<div class="mx-auto w-full">
	<!-- just to get transition working -->
	{#if loaded}
		<section
			class="flex flex-col gap-4 items-center min-h-[calc(100vh-50px)] border-b"
			transition:slide
		>
			<h1
				class="text-6xl sm:text-8xl lg:text-9xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mt-24"
			>
				TechLance
			</h1>

			<h2 class="text-2xl sm:text-3xl lg:text-4xl font-semibold my-8">
				Scale your professional workforce with freelancers
			</h2>

			<a class="btn btn-primary mt-2" href="/login">Get Started</a>
		</section>
		<section class="flex flex-col gap-4 items-center min-h-[calc(100vh-50px)]">
			<img src="screenshot.png" alt="" class="w-3/4 -translate-y-1/2 mb-0" />

			<div class="text-center">
				<h1 class="text-2xl sm:text-4xl lg:text-5xl font-semibold mb-8 mt-[-50px]">Our Popular Services</h1>

				<div class="carousel carousel-center bg-neutral rounded-box max-w-6xl space-x-4 p-4">
					<!-- First Card -->
					<div class="carousel-item">
						<div class="card w-60 bg-green-900 text-white rounded-xl p-4">
							<!-- Top area -->
							<div class="text-left mb-4">
								<h2 class="text-lg font-bold">App Development</h2>
							</div>

							<!-- Bottom area -->
							<div class="flex justify-center">
								<img
									src="https://etimg.etb2bimg.com/photo/84166005.cms"
									alt="Software Development"
									class="rounded-xl"
								/>
							</div>
						</div>
					</div>

					<!-- Second Card -->
					<div class="carousel-item">
						<div class="card w-60 bg-green-900 text-white rounded-xl p-4">
							<div class="text-left mb-4">
								<h2 class="text-lg font-bold">Web Design</h2>
							</div>
							<div class="flex justify-center mt-3">
								<img
									src="https://i0.wp.com/hapy.design/wp-content/uploads/2024/03/web-design-concept-with-drawings_1134-77.jpg?ssl=1"
									alt="Web Design"
									class="rounded-xl"
								/>
							</div>
						</div>
					</div>

					<!-- Third Card -->
					<div class="carousel-item">
						<div class="card w-60 bg-green-900 text-white rounded-xl p-4">
							<div class="text-left mb-4">
								<h2 class="text-lg font-bold">Software Development</h2>
							</div>
							<div class="flex justify-center">
								<img
									src="https://etimg.etb2bimg.com/photo/84166005.cms"
									alt="Graphic Design"
									class="rounded-xl"
								/>
							</div>
						</div>
					</div>

					<!-- Fourth Card -->
					<div class="carousel-item">
						<div class="card w-60 bg-green-900 text-white rounded-xl p-4">
							<div class="text-left mb-4">
								<h2 class="text-lg font-bold">Devops Engineer</h2>
							</div>
							<div class="flex justify-center">
								<img
									src="https://img.freepik.com/free-vector/gradient-devops-illustration_23-2149371585.jpg?ga=GA1.1.129307.1725146264&semt=ais_hybrid"
									alt="Digital Marketing"
									class="rounded-xl"
								/>
							</div>
						</div>
					</div>

					<!-- Fifth Card -->
					<div class="carousel-item">
						<div class="card w-60 bg-green-900 text-white rounded-xl p-4">
							<div class="text-left mb-4">
								<h2 class="text-lg font-bold">Cloud Practitioner</h2>
							</div>
							<div class="flex justify-center mt-6">
								<img
									src="https://www.pfu-us.ricoh.com/-/media/project/scanners/blog/2021/07/edgex_blog.jpg"
									alt="SEO Optimization"
									class="rounded-xl"
								/>
							</div>
						</div>
					</div>

					<!-- Sixth Card -->
					<div class="carousel-item">
						<div class="card w-60 bg-green-900 text-white rounded-xl p-4">
							<div class="text-left mb-4">
								<h2 class="text-lg font-bold">AI Engineer</h2>
							</div>
							<div class="flex justify-center mt-4">
								<img
									src="https://news.umanitoba.ca/wp-content/uploads/2022/11/UM-Today-Rise-of-the-machine-age-II-review-opt-1.jpg"
									alt="Content Creation"
									class="rounded-xl"
								/>
							</div>
						</div>
					</div>

					<!-- Seventh Card -->
					<div class="carousel-item">
						<div class="card w-60 bg-green-900 text-white rounded-xl p-4">
							<div class="text-left mb-4">
								<h2 class="text-lg font-bold">Network Engineer</h2>
							</div>
							<div class="flex justify-center">
								<img
									src="https://i.pinimg.com/originals/42/b4/c5/42b4c5af819b1ca7f2723418476f28bc.jpg"
									alt="Network Development"
									class="rounded-xl"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<h2 class="text-2xl sm:text-4xl lg:text-5xl font-semibold">
				Your Gateway to Top Freelance Talent.
		</h2>
		

			<p class="text-lg opacity-60 w-3/4">
				Elevate your business with our freelancing platform, where skilled professionals bring your
				ideas to life. From web development to graphic design, find the perfect freelancer to
				deliver exceptional results, on time and within budget.
			</p>

			<p class="mb-8">Your gateway to quality talent, your partner in success.</p>
		</section>
	{/if}
</div>
