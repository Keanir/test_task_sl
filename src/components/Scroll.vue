<template>
  <!-- Компонент бесконечного скролла -->
  <div ref="trigger" class="scroll"></div>
</template>

<script>
export default {
  data() {
    return {
      observer: null,
      options: {
        root: null,
        threshold: 1
      }
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(entries => {
      this.handleIntersect(entries[0]);
    }, this.options);

    this.observer.observe(this.$refs.trigger);
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  methods: {
    handleIntersect(entry) {
      if (entry.isIntersecting) this.$emit("trigger");
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll {
  margin-top: auto;
}
</style>