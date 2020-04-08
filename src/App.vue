<template>
  <div id="app">
    <div class="lol">
      <SliderLight :media="media"/>
    </div>
  </div>
</template>

<script>
import SliderLight from './components/SliderLight.vue';
export default {
  name: "App",
  components: {
    SliderLight
  },
  data() {
    return {
      media: [
        "https://avatars.mds.yandex.net/get-pdb/1726346/8865f6af-b7e7-4568-8ead-18ed388b624b/s1200?webp=false",
        "http://www.fwallpaper.net/wallpapers/S/I/simpsons-15_800x600.jpg",
        "https://besthqwallpapers.com/img/original/44599/4k-tiger-wildlife-predators-panthera-tigris.jpg"
      ]
    }
  }
}
</script>

<style lang="scss">
.lol {
  width: 400px;
  height: 330px;
}
</style>
