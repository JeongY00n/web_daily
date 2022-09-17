<template>
  <div class="main-container">
    <Form></Form>
    <reactive-bar-chart
      v-if="chartData"
      :chart-data="chartData"
    ></reactive-bar-chart>
  </div>
</template>

<script>
import ReactiveBarChart from "../components/ReactiveBarChart.js";
import Form from "../components/Form";
import {mapActions, mapState} from "vuex"
export default {
  name: "App",
  components: {
    ReactiveBarChart,
    Form
  },
  data() {
    return {
      // chartData: null,
    };
  },
  computed:{
    ...mapState(['chartData'])
  },
  methods: {
    ...mapActions(["generateChartData"]),
    generateData() {
      let newArray = [];
      let newArray2 = [];
      for (let i = 0; i < 10; i++) {
        let randomValue = Math.floor(Math.random() * 10);
        newArray.push(randomValue);
      }

      for (let i = 0; i < 10; i++) {
        let randomValue = Math.floor(Math.random() * 10);
        newArray2.push(randomValue);
      }

      this.chartData = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: newArray,
            fill: false,
          },
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: newArray2,
            fill: false,
          },
        ],
      };
    },

  },
  async mounted() {

    this.generateChartData();
   
  },
};
</script>

<style>
.main-container{
  display: flex;
  padding:20px;
  /* width:85vw; */
  /* justify-content:space-between; */
}
.main-container> *{
  /* flex:30%; */
  width:700px;
  /* flex:1; */
}
</style>
