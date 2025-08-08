<script>
	import LoginForm from '../../components/forms/LoginForm.svelte';
	import FormWrapper from '../../components/ui/FormWrapper.svelte';
</script>

<header class="header">
	<img src="/images/logo.svg" alt="mood tracker" />
	<h1 class="sr-only">Sign up</h1>
</header>
<FormWrapper
	title="Create an account"
	subtitle="Join to track your daily mood and sleep with ease."
	linkText="Log in"
	linkUrl="/login"
>
	<LoginForm action="?/signup" />
</FormWrapper>

<style>
	@import '../../style.css';

	.header {
		text-align: center;
		padding-top: 80px;
		margin-bottom: 48px;
	}

	.sr-only {
		position: absolute;
		width: 0px;
		height: 0px;
		top: 0;
		left: 0;
		opacity: 0;
	}
</style>
