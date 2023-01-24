<script lang="ts">
    export let searchTerm;
</script>

<form>
    <input bind:value={searchTerm} on:input type="text" id="searchPhrase" name="searchPhrase" placeholder="Search for a country">
</form>