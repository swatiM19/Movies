<template>
  <div class="App">
    <h1 class="title is-1">Movies Search Engine</h1>
    <Search :search="search" @search="handleSearch" class="m-t-30" />
    <div class="columns m-t-30">
      <div v-for="movie in moviesToDisplay" @click="singleMovie(movie.imdbID)" class="column">
        <div class="card">
          <div class="card-image">
            <figure class="is-4by3">
              <img  :alt="altText(movie)" :src="movie.Poster" />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">{{movie.Title}}</p>
                <p class="subtitle is-6">{{movie.Year}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-t">
      <button v-show='showPrev' @click.stop.prevent='renderList(currentPage-1)'>Prev</button>
      Page {{currentPage}} of {{totalPages}}
      <button v-show='showNext' @click.stop.prevent='renderList(currentPage+1)'>Next</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Search from './Search.vue';

const API_KEY = 'a5549d08';

export default {
  name: 'app',
  components: {
    Search,
  },
  data() {
    return {
      errorMessage: null,
      loading: true,
      search: 'Harry Potter',
      isLoading: true,
      allMovies: [],
      moviesToDisplay: [],
      perPage: 3,
      pageToOpen: 1,
      currentPage: 1,
    };
  },
  computed: {

    totalPages() {
      return this.allMovies.length && (this.allMovies.length > this.perPage) ? Math.ceil(this.allMovies.length / this.perPage) : 1;
    },

    start() {
      return (this.pageToOpen - 1) * this.perPage;
    },

    stop() {
      if ((this.allMovies.length - this.start) >= this.perPage) {
        return (this.pageToOpen * this.perPage) - 1;
      }

      return this.allMovies.length - 1;
    },

    showNext() {
      return this.currentPage < this.totalPages;
    },

    showPrev() {
      return this.currentPage > 1;
    },

  },
  methods: {
    altText(movie) {
      return `The movie titled: ${movie.Title}`;
    },
    singleMovie(id) {
      this.$router.push(`/movie/${id}`);
    },
    renderList(pageNumber = 1) {
      this.moviesToDisplay = [];
      if (this.allMovies.length) {
        const _this = this;

        return new Promise(((res, rej) => {
          _this.pageToOpen = pageNumber;
          for (let i = _this.start; i <= _this.stop; i++) {
            _this.moviesToDisplay.push(_this.allMovies[i]);
          }

          res();
        })).then(() => {
          _this.currentPage = _this.pageToOpen;
        }).catch(() => {
          console.log('render err');
        });
      }
    },
    fetchMovies() {
      const MOVIE_API_URL = `https://www.omdbapi.com/?s=${this.search}&apikey=${API_KEY}`;
      axios
        .get(MOVIE_API_URL)
        .then((response) => {
          this.allMovies = response.data.Search;
          this.loading = false;
          this.renderList();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleSearch(searchTerm) {
      this.loading = true;
      this.search = searchTerm;
      this.fetchMovies();
    },
  },
  watch: {
    perPage() {
      this.renderList();
    },
  },
};
</script>
<style scoped>
  .m-t{
    margin-top: 20px;
  }
  .m-t-30{
    margin-top: 30px;
  }
</style>
