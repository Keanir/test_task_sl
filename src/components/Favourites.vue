<template>
  <!-- Избранные изображения -->
  <div v-if="!loading">
    <h2 class="no-fav-dogs" v-if="getFavourites.length === 0">You have no favorite doggos :(</h2>
    <div class="cards">
      <div v-for="(dog, ind) in getFavourites" :key="ind" class="card">
        <button class="like" @click="removeFavDog(dog)"></button>
        <img class="card-img" :src="dog.url" :alt="dog.fullBreed" />
        <span class="card-text">{{ dog.fullBreed }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Favourites",
  beforeCreate() {
    this.$store.dispatch("getFavourites");
  },
  computed: {
    ...mapGetters(["loading", "getFavourites"])
  },
  methods: {
    ...mapActions(["removeFromFavourites"]),
    // При клике на иконку сердца изображение удаляется из local storage
    removeFavDog(dog) {
      this.removeFromFavourites(dog);
    }
  }
};
</script>

<style lang="scss" scoped>
.no-fav-dogs {
  font-size: 3.8rem;
  color: $white;
  text-align: center;
}
.like {
  background: make-icon($heart-fill) no-repeat top left;
  &:hover {
    background: make-icon($heart-big) no-repeat top left;
  }
}
.card {
  margin: 1.5rem 0;
  &:nth-child(3n - 1) {
    margin: 1.5rem 3rem;
  }
}
</style>