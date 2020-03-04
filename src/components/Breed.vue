<template>
  <!-- Компонент для выбранной породы -->
  <div class="cards">
    <div v-for="(dog, ind) in getChoosenDog" :key="ind" class="card">
      <button class="like" @click="addFavDog(dog)"></button>
      <img class="card-img" :src="dog.url" :alt="dog.fullBreed" />
      <span class="card-text">{{ dog.fullBreed }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Breed",
  beforeCreate() {
    this.$store.dispatch("loadDogByBreed", {
      new: true,
      url: this.$route.params.breed
    });
  },
  computed: {
    ...mapGetters(["getChoosenDog"])
  },
  methods: {
    ...mapActions(["addToFavourites"]),
    addFavDog(dog) {
      this.addToFavourites(dog);
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  margin: 1.5rem 0;
  &:nth-child(3n + 2) {
    margin: 1.5rem 3rem;
  }
}
</style>