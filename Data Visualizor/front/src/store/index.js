import Vue from 'vue'
import Vuex from 'vuex'
import { dataLap } from '../utils/axios';

Vue.use(Vuex)
function makeColor(){
  return "#" + Math.round(Math.random() * 0xffffff).toString(16);
}

export default new Vuex.Store({
  state: {
    chartData:""
  },
  mutations: {
    CHANGE_CHART_DATA(state, data){
      state.chartData = data;
    }
  },
  actions: {
    async generateChartData({commit}){
      const result = await dataLap.get();
      console.log(result.data);
      console.log(result.data[0].data);
      
      const chartData = {
      // 라벨에 기간을 넣고(result.data의 배열안에있는 data의 period를 기반으로 labels 생성)
      // 1차 목표 넣고 period를 배열로 나열해주기.
      // 첫번째 배열의 날짜를 넣기
      
      labels: result.data[0].data.map(li => li.period),
      // datsets: result.data.reduce((acc, cur) => {
      
      // }.[])
      // datasets에 데이터를 넣고배열을 만들어 준다. 
      datasets: result.data.reduce((acc, cur) => {
          console.log(cur);
          let label= cur.title;
          let data = cur.data.map(li => li.ratio);
          acc.push({label: label, data: data,backgroundColor:makeColor(), borderColor:makeColor() ,fill:false})
          return acc;
      },[])
    };
    commit("CHANGE_CHART_DATA", chartData);
  }
  },
  modules: {
  }
})
