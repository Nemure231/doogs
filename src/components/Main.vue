<script>
  import 'viewerjs/dist/viewer.css'
  import { directive as viewer } from "v-viewer"

export default {
  data() {
    return {
      dogs: [],
      loadingSpin: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('touchmove', this.handleScroll);
    this.getDogs(10);

  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('touchmove', this.handleScroll);
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
          id: index + 1,
          url: element,
        })
      })
      this.loadingSpin = false;
    },
    handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (clientHeight + scrollTop >= scrollHeight - 5) {
        this.loadingSpin = true;

        setTimeout(() => this.getDogs(10), 5000);

      }
    },
    show() {
        this.$viewerApi({
          images: this.dogs,
        })
      },
  },
  computed: {
    loadingData() {
      return this.loadingSpin ? 'block' : 'hidden'
    }
  }
}
</script>

<template>

  <main class="w-full flex flex-wrap flex-col justify-center items-center">
    <section class="flex-1 mt-12 2xl:mb-96 xl:mb-20 mb-16 relative w-full">
      <div class="flex justify-center flex-wrap">
        <div class="relative flex-1 2xl:max-w-7xl lg:max-w-5xl md:max-w-2xl sm:max-w-xl max-w-lg lg:mx-0 md:mx-0 sm:mx-3 mx-12">
            <TransitionGroup v-viewer tag="div" name="list" class="flex flex-row justify-center items-start flex-wrap gap-6">

              <img  v-for="d in dogs" :key="d.id" alt=""  
                v-lazy="{src: d.url, loading: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS10ZWVueWljb25zIiB3aWR0aD0iMWVtIiBoZWlnaHQ9IjFlbSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDE1IDE1Ij48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNmOGVjZDEiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0ibTEuNDI1IDIuMTE4bC4zMDcuNjQ3TS43NSA0LjY0N2wuMzA3LjY0N201LjI3Ny0zLjE3NmwuMzA3LjcwNk0zLjg4IDFsLjMwNi42NDdtNi45MzQgNS4xMThsLS4zMDYuNjQ3bS0yLjE0OC40N2wtLjMwNy43MDZtNS44OTEgMS44MjRsLS4zMDcuNjQ3bS0uMzY4LTMuMTc3bC0uMzA3LjY0N00zLjk0MSA0LjIzNWMuNDMtLjE3Ni45Mi0uMTc2IDEuMzUuMDZsMS42NTcuODIzYy41NTIuMjk0LjczNiAxIC4zMDcgMS40N2MtLjE4NS4yMzYtLjQ5MS4zNTMtLjc5OC4zNTNINS43MmMtLjMwNiAwLS42MTMuMTE4LS43OTcuMzUzbC0uNDMuNTNjLS4xODQuMjM1LS40OS4zNTItLjc5OC4zNTJjLS42MTMgMC0xLjEwNC0uNTg4LS45ODEtMS4xNzZsLjM2OC0xLjc2NWMuMTIzLS40MTEuNDMtLjgyMy44NTktMVpNMTEuMDU5IDEwYy40My4xNzcuNzM3LjU4OC44NiAxLjA1OWwuMzY3IDEuNzY0QS45NzYuOTc2IDAgMCAxIDExLjMwNSAxNGMtLjMwNyAwLS42MTQtLjExOC0uNzk4LS4zNTNsLS40My0uNTNjLS4xODQtLjIzNS0uNDktLjM1Mi0uNzk3LS4zNTJoLS43MzdjLS4zMDcgMC0uNjEzLS4xMTgtLjc5OC0uMzUzYS45NzguOTc4IDAgMCAxIC4zMDctMS40N2wxLjY1Ny0uODI0YTEuMjUgMS4yNSAwIDAgMSAxLjM1LS4xMThaIj48L3BhdGg+PC9zdmc+`}"
                class="bg-[#85586F] 2xl:w-52 2xl:h-52 xl:w-48 xl:h-48 lg:w-48 lg:h-48 md:w-46 md:h-48 sm:w-64 sm:h-64 w-full h-auto  object-cover rounded-md cursor-pointer transition ease-in-out hover:scale-105 duration-500 hover:shadow-xl">

            </TransitionGroup>
          <div class=" justify-center flex absolute -bottom-16 inset-x-0">
            <svg :class="loadingData" xmlns="http://www.w3.org/2000/svg"
              class="lg:w-12 lg:h-12 md:w-12 md:h-12 w-10 h-10 mt-6 animate-spin fill-[#85586F]" fill="currentColor" viewBox="0 0 16 16">
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
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
  transition-delay: 250ms;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

