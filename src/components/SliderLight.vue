
<template>
  <div class="sliderlight">
    <div
      class="sliderlight__track track"
      :style="{ transform: transform, transition: `${transition}ms` }"
      @keyup.left="sliding('prev')"
      @keyup.right="sliding('next')"
      @dragstart="dragStart($event)"
      @dragend="dragEnd($event)"
      @touchstart="touchStart($event)"
      @touchend="touchEnd($event)"
      @wheel="wheel"
      @mouseenter="$refs.slide.focus()"
      ref="slide"
      tabindex="99"
    >
      <div class="track__item" v-for="(slide, i) in media" :key="i">
        <img class="track__img" :src="slide" loading="lazy" alt />
      </div>
    </div>
    <div class="sliderlight__arrows arrows">
      <div
        class="arrows__prev"
        :class="{ 'arrows__prev_deactive': this.currentSlide == 0 }"
        @click.stop.prevent="sliding('prev')"
      ></div>
      <div
        class="arrows__next"
        :class="{ 'arrows__next_deactive': this.currentSlide == this.media.length - 1 }"
        @click.stop.prevent="sliding('next')"
      ></div>
    </div>
    <div class="sliderlight__counter counter">
      <div class="counter__text">
        <span>{{ currentSlide + 1 }}/{{ media.length }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SliderLight",
  props: {
    media: {
      type: Array
    }
  },
  data() {
    return {
      currentSlide: 0,
      startX: null,
      transitionCheck: false,
      transition: 500
    };
  },
  watch: {
    currentSlide(val) {
      this.$emit("currentSlide", val);
      if (val == this.media.length - 1) {
        this.$emit("lastSlide", val);
      }
    }
  },
  computed: {
    transform() {
      const translate = this.currentSlide ? `${-1 * this.currentSlide}00%` : 0;
      return `translate(${translate}, 0)`;
    }
  },
  methods: {
    wheel(e) {
      if (e.deltaX < 0) {
        this.sliding("prev");
      } else {
        this.sliding("next");
      }
    },
    prev() {
      if (this.currentSlide > 0) {
        this.currentSlide -= 1;
      } else {
        this.transition = 0;
        this.currentSlide = this.media.length - 1;
      }
    },
    next() {
      if (this.currentSlide < this.media.length - 1) {
        this.currentSlide += 1;
      } else {
        this.transition = 0;
        this.currentSlide = 0;
      }
    },
    sliding(step) {
      if (!this.transitionCheck) {
        this.transitionCheck = true;
        if (step == "prev") {
          this.prev();
        }
        if (step == "next") {
          this.next();
        }
        this.$nextTick(() => {
          this.slidingSlide();
        });
      }
    },
    slidingSlide() {
      setTimeout(() => {
        this.transitionCheck = false;
        this.transition = 500;
      }, 500);
    },
    touchStart(e) {
      this.startX = e.changedTouches[0].clientX;
    },
    touchEnd(e) {
      if (Math.abs(e.changedTouches[0].clientX - this.startX) < 60) return;
      if (e.changedTouches[0].clientX > this.startX) {
        this.sliding("prev");
      } else {
        this.sliding("next");
      }
    },
    dragStart(e) {
      this.startX = e.layerX;
    },
    dragEnd(e) {
      if (Math.abs(e.layerX - this.startX) < 60) return;
      if (e.layerX > this.startX) {
        this.sliding("prev");
      } else {
        this.sliding("next");
      }
    }
  }
};
</script>

<style lang="scss">
.sliderlight {
  position: relative;
  width: 100%;
  height: 100%;
  background: #ccc;
  overflow: hidden;

  &:hover {
    .arrows {
      &__prev,
      &__next {
        background: rgba(255, 255, 255, 0.8);
      }
    }
  }

  &__counter {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0);

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 20px;
    background: rgba(0, 0, 0, 0.5);
    min-width: 40px;
    height: 20px;
    padding: 2px 10px;

    .counter {
      &__text {
        font-size: 13px;
        line-height: 17px;
        color: #fff;
      }
    }
  }

  &__track {
    display: flex;
    flex-wrap: nowrap;
    height: 100%;
    transition: transform 0.5s;

    .track {
      &__item {
        min-width: 100%;
        height: 100%;
        flex-grow: 1;
      }
      &__img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        pointer-events: unset;
      }
    }
  }
  &__arrows {
    .arrows {
      &__prev {
        left: 10px;
        &:before {
          transform: rotate(180deg);
        }
      }
      &__next {
        right: 10px;
      }
      &__prev,
      &__next {
        cursor: pointer;

        position: absolute;
        top: 50%;
        transform: translate(0, -50%);

        display: flex;
        justify-content: center;
        align-items: center;

        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transition: background 0.3s, opacity 0.3s;

        &:before {
          content: "";
          display: block;
          // background: url("assets/arrow.svg") center center no-repeat;
          background-size: contain;
          width: 8px;
          height: 10px;
        }

        // &_deactive {
        //   opacity: 0;
        // }
      }
    }
  }
}
</style>
