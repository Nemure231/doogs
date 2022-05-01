<script>
import 'viewerjs/dist/viewer.css'
import VLazyImage from "v-lazy-image"
export default {
  components: {
    VLazyImage
  },
  data() {
    return {
      dogs: [],
      loadingSpin: false
    }
  },
  mounted() {
    this.getDogs(10);
    window.addEventListener('scroll', this.lazyLoad);

    window.addEventListener('scroll', (event) => {
      this.handleScroll()
    }, {
      capture: true,
      passive: true
    });

  },
  updated() {
    window.addEventListener('scroll', this.lazyLoad);

    window.addEventListener('scroll', (event) => {
      this.handleScroll()
    }, {
      capture: true,
      passive: true
    });

  },
  beforeDestroy() {
      window.removeEventListener('scroll', this.lazyLoad);

    window.removeEventListener('scroll', (event) => {
      this.handleScroll()
    }, {
      capture: true,
      passive: true
    });
  },
  methods: {

    httpGet(theUrl) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", theUrl, false);
      xmlHttp.send(null);
      return xmlHttp.responseText;
    },
    getDogs(num) {
      var json = this.httpGet(`https://dog.ceo/api/breeds/image/random/${num}`);
      var array = JSON.parse(json);
      array['message'].forEach((element, index) => {
        this.dogs.push({
          id: this.dogs.length <= 0 ? index + 1 : this.dogs.length + 1,
          url: element,
        })
      })
      this.loadingSpin = false;
    },
    handleScroll() {

      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.loadingSpin = true;

          setTimeout(() => this.getDogs(10), 5000);
        }
      };
    },
    clickLoad(){
      this.loadingSpin = true;
      setTimeout(() => this.getDogs(10), 5000);
    },
    lazyLoad(){
      const currentScrollPosition = window.pageYOffset;

      this.dogs.forEach(element => {
        let elementID = `dog_${element.id}`
        const elementOffsetTop = document.getElementById(elementID).offsetTop - 200
  
        if ( currentScrollPosition > elementOffsetTop){

          document.getElementById(`dog_${element.id}`).src = element.url

          console.log(`sampai ke ${element.id}`)
        } 
      });

    },
    show() {
      this.$viewerApi({
        images: this.dogs,
      })
    },
  },
  computed: {
    loadingSpin() {
      return this.loadingSpin ? 'block' : 'hidden'
    },
    loadingBtn() {
      return this.loadingSpin ? 'hidden' : 'block'
    },
  }
}
</script>

<template>

  <main class="w-full flex flex-wrap flex-col justify-center items-center">
    <section class="flex-1 mt-12 2xl:mb-96 xl:mb-20 mb-16 relative w-full">
      <div class="flex justify-center flex-wrap">
        <div
          class="relative flex-1 2xl:max-w-7xl lg:max-w-5xl md:max-w-2xl sm:max-w-xl max-w-lg lg:mx-0 md:mx-0 sm:mx-3 mx-12">
          <TransitionGroup v-viewer tag="div" name="list"
            class="flex flex-row justify-center items-start flex-wrap gap-6">

               <VLazyImage v-for="d in dogs" :key="d.id" alt="" :src="d.url" :id="`dog_${d.id}`"
            
              class="bg-cover  bg-[#85586F] 2xl:w-52 2xl:h-52 xl:w-48 xl:h-48 lg:w-48 lg:h-48 md:w-46 md:h-48 sm:w-64 sm:h-64 w-full h-auto  object-cover rounded-md cursor-pointer transition ease-in-out hover:scale-105 duration-500 hover:shadow-xl"
              src-placeholder="https://nemure231.github.io/doogs/img/placeholder.png"
              
              />

          </TransitionGroup>

          <div class=" justify-center flex absolute -bottom-16 inset-x-0">
            <button :class="loadingBtn" @click="clickLoad()"
              class="py-1.5 px-6 bg-white font-medium text text-[#492110] rounded-xl shadow-xl transition ease-in-out hover:scale-105 duration-500">
              Load More
            </button>
            <svg :class="loadingSpin" xmlns="http://www.w3.org/2000/svg"
              class="lg:w-12 lg:h-12 md:w-12 md:h-12 w-10 h-10 mt-6 animate-spin fill-[#85586F]" fill="currentColor"
              viewBox="0 0 16 16">
              <path
                d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
              <path fill-rule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
            </svg>

          </div>

        </div>
      </div>
    </section>
  </main>

</template>

<style scoped>
.list-enter-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
</style>

