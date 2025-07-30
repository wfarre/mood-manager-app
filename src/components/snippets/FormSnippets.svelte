<!-- <script lang="ts">
	import RadioItem from '../ui/RadioItem.svelte';
	import TagItem from '../ui/TagItem.svelte';
	import {
		handleMoodChange,
		handleTagChange,
		handleSleepHoursChange
	} from '../layout/FormModal.svelte';
</script>

{#snippet moodsSelectionItemSnippet(item)}
	<RadioItem id={item.id} value={item.value} text={item.text} name="mood" {handleChange} />
{/snippet}

{#snippet feelingsListItemSnippet(item)}
	<TagItem tag={item} name="feelings" {onchange} />
{/snippet}

{#snippet sleepHoursItemSnippet(item)}
	<RadioItem
		id={item.id}
		value={item.value}
		text={item.text}
		isImage={false}
		name="sleepHours"
		{handleChange}
	/>
{/snippet} -->
