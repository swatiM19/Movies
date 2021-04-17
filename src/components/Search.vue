<template>
  <form class="search">
    <input
      type="text"
      :value="movieTitle"
      @keyup="handleChange"
    />
    <input @click="handleSubmit" type="submit" value="SEARCH" />
  </form>
</template>

<script>
export default {
  name: 'Search',
  props: ['search'],
  data() {
    return {
      movieTitle: this.search,
    };
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      this.$emit('search', this.movieTitle);
    },
    handleChange(event) {
      this.movieTitle = event.target.value;
    },
  },
};
</script>
