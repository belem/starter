<script lang="ts">
	import UserAuthForm from "$lib/components/ui-enhanced/user-auth-form.svelte";
	import { Button } from "$lib/components/ui/button/index.js";
</script>

<div
	class="container relative portrait:h-full landscape:h-[500px] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<div class="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
		<div
			class="absolute inset-0 bg-contain"
			style="
				background-image:
					url(/images/login/login-min.jpg);"
		></div>
		<div class="relative z-20 flex items-center text-lg font-medium">
			<!-- <Command class="mr-2 h-6 w-6" /> -->
			Hello Haha and Ashley
		</div>
		<div class="relative z-20 mt-auto">
			<blockquote class="space-y-2">
				<p class="text-lg">
					&ldquo;Happy happy&rdquo;
				</p>
				<footer class="text-sm">/b</footer>
			</blockquote>
		</div>
	</div>
	<div class="lg:p-8 sd:grid">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
				<p class="text-muted-foreground text-sm">
					Enter your email below to create your account
				</p>
			</div>
			<UserAuthForm />
			<p class="text-muted-foreground px-8 text-center text-sm">
				By clicking continue, you agree to our
				<a href="/terms" class="hover:text-primary underline underline-offset-4">
					Terms of Service
				</a>
				and
				<a href="/privacy" class="hover:text-primary underline underline-offset-4">
					Privacy Policy
				</a>
				.
			</p>
		</div>
	</div>
</div>