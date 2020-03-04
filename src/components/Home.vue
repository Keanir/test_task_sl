<template>
  <!-- Главная страница. -->
  <div class="cards">
    <div v-for="(dog, ind) in getDoggos" :key="ind" :class="[ind === 0 ? 'card-big' : 'card']">
      <button class="like" @click="addFavDog(dog)"></button>
      <img :class="[ind === 0 ? 'card-big-img' : 'card-img']" :src="dog.url" :alt="dog.fullBreed" />
      <span :class="[ind === 0 ? 'card-big-text' : 'card-text']">{{ dog.fullBreed }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  created() {
    // Загрузка рандомных изображений до начала отрисовки.
    this.$store.dispatch("loadRandomDogs", { new: true });
  },
  computed: {
    // Слежение за состоянием чекбокса сортировки и вызов
    // соответствующего геттера для получения нужного массива.
    ...mapGetters(["loading", "getDogs", "getSort", "getSortedList"]),
    getDoggos() {
      return this.getSort ? this.getSortedList : this.getDogs;
    }
  },
  methods: {
    // Добавляем в избранное при клике на иконку сердца.
    ...mapActions(["addToFavourites"]),
    addFavDog(dog) {
      this.addToFavourites(dog);
    }
  }
};
</script>

<style lang="scss">
.cards {
  max-width: 1161px;
  margin: 0 auto;
}

.card-big {
  @extend %card;
  width: 100%;
  height: 51.3rem;
  .like {
    @extend %like;
    top: 3.5rem;
    left: 3.5rem;
  }
  .card-big-img {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    min-width: 100%;
  }
  .card-big-text {
    @extend %card-text;
    bottom: 5rem;
    right: 5rem;
    font-size: 3rem;
  }
}

.card {
  @extend %card;
  width: 36.7rem;
  height: 29rem;
  margin: 1.5rem 0;
  &:nth-child(3n + 3) {
    margin: 1.5rem 3rem;
    @media (max-width: 1160px) {
      margin: 1.5rem 0;
    }
  }
  .like {
    @extend %like;
    top: 2.5rem;
    left: 2.5rem;
  }
  .card-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .card-text {
    @extend %card-text;
    bottom: 2.5rem;
    right: 2.5rem;
    font-size: 25px;
    text-align: right;
  }
}
</style>