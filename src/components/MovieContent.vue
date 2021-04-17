<template>
  <div class="content">
    <figure class="is-4by3">
      <img :src="singleMovie.Poster" />
    </figure>
    <h3 class="title is-3 is-spaced">{{singleMovie.Title}}</h3>
    <p class="is-spaced">{{singleMovie.Actors}}</p>
    <p class="title is-5 ">Plot</p>
    <p class="subtitle is-5">{{singleMovie.Plot}}</p>
  </div>
</template>
<script>

import axios from 'axios';

const API_KEY = 'a5549d08';

export default {
  props: ['id'],
  data() {
    return {
      singleMovie: '',
    };
  },
  mounted() {
    const MOVIE_API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${this.id}&Content-Type=application/json`;
    axios
      .get(MOVIE_API_URL)
      .then((response) => {
        console.log('responsee', response);
        this.singleMovie = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
  },
};
</script>
<style scoped>
</style>
