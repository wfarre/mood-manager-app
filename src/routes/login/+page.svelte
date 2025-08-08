<script>
	import LoginForm from '../../components/forms/LoginForm.svelte';
	import FormWrapper from '../../components/ui/FormWrapper.svelte';
	import InputWithLabel from '../../components/ui/InputWithLabel.svelte';
	import Button from '../../components/ui/Button.svelte';
</script>

<header class="header">
	<img src="/images/logo.svg" alt="mood tracker" />
	<h1 class="sr-only">Log in</h1>
</header>
<FormWrapper
	title="Welcome back!"
	subtitle="Log in to continue tracking your mood and sleep."
	linkText="Sign up"
	linkUrl="/signup"
>
	<LoginForm action="?/login" />
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
