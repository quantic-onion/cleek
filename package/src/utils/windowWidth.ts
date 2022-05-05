export default {
  data() {
    return {
      windowWidth: 0,
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.handleWindowResize);
    });
    this.windowWidth = window.innerWidth;
  },
  methods: {
    handleWindowResize(event) {
      // console.log('handleWindowResize', event.currentTarget.innerWidth);
      this.windowWidth = event.currentTarget.innerWidth;
    },
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  },
}