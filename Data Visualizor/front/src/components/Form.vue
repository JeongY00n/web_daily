<template>
  <el-form ref="form" :model="form" label-width="120px">
    <!-- 메인 주제 이름 주제를 치고 추가를 누르면 라벨이 추가되어야 한다. -->

    
    <!-- group name, keyword 생성해야한다. -->
    <div class="groups-wrapper">

            <!--키워드 추가 -->
      <el-form-item style="width:500px;" label="키워드">
        <el-input v-model="form.keyword"
          ><el-button @click="saveKeyword" slot="append"
            >키워드 추가</el-button
          ></el-input
        >
      </el-form-item>

      <div v-if="keywords" class="tag-wrapper">
        <el-tag
          @click="removeKeyword(keyword)"
          v-for="keyword in keywords"
          :key="keyword"
          class="group-tag"
        >
          {{ keyword }}
        </el-tag>
      </div>
      <el-form-item style="width:500px;" label="주제">
        <el-input v-model="form.groupName"></el-input>
      </el-form-item>

      <div v-if="keywordGroups" class="tag-wrapper">
        <el-tag
          @click="removeGroup(group.groupName)"
          v-for="(group, index) in keywordGroups"
          :key="index"
          type="success"
          class="group-tag"
          >{{ group.groupName }}</el-tag
        >
      </div>


      <el-button @click="saveGroup" class="create-button" type="primary"
        >주제 생성하기</el-button
      >
    </div>
    <!-- 주제를 보여주는 부분 -->

    {{ form.name }}

    <div class="groups-wrapper">
      <!-- 기간 -->
      <el-form-item label="시간대별 설정">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            v-model="form.startDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            v-model="form.endDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>

      <!-- 구간 단위 설정 date 일간, week 주간, month 월간 -->
      <el-form-item label="구간 단위">
        <el-radio-group v-model="form.timeUnit">
          <el-radio label="date"></el-radio>
          <el-radio label="week"></el-radio>
          <el-radio label="month"></el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 디바이스 전체, pc, mobile -->
      <el-form-item label="디바이스">
        <el-radio-group v-model="form.device">
          <el-radio label="all"></el-radio>
          <el-radio label="pc">pc</el-radio>
          <el-radio label="mo">모바일</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- gender 성별 남, 녀 radio -->
      <el-form-item label="성별">
        <el-radio-group v-model="form.gender">
          <el-radio label="all">모두</el-radio>
          <el-radio label="m">남</el-radio>
          <el-radio label="f">녀</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 연령 -->
      <el-form-item label="연령별">
        <el-checkbox-group v-model="form.ages">
          <el-checkbox :label="agesLabel">all</el-checkbox>
          <el-checkbox label="10">10대</el-checkbox>
          <el-checkbox label="20">20대</el-checkbox>
          <el-checkbox label="30">30대</el-checkbox>
          <el-checkbox label="40">40대</el-checkbox>
          <el-checkbox label="50">50대</el-checkbox>
          <el-checkbox label="60">60대</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </div>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { dataLap } from "../utils/axios";
import moment from "moment";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      agesLabel:['10','20','30','40','50','60'],
      form: {
        // https://developers.naver.com/docs/datalab/search/#%EA%B0%9C%EC%9A%94 참고
        // 시작날짜
        startDate: null,
        // 종료 날짜
        endDate: null,
        // 구간 단위, date, week, month
        timeUnit: "month",
        // [{ groupName: "iPhone_4", keywords: ["아이폰4", "iphone4"] },]

        groupName: "",
        // v-model용
        keyword: "",
        // 보관용
        // 설정안함: 모두, m,f
        device: "all",
        // m 남성 f 여성
        gender: "all",
        // 연령별 10~ 60까지 있다
        ages: [],
      },
      // 배열로 관리할 데이터 두가지 keywords array
      // keywordGroups array
      keywordGroups: [],
      keywords: [],
    };
  },
  methods: {
    ...mapActions(['generateChartData']),
    
    // 키워드 생성하기
    saveKeyword() {
      console.log("click");
      if (this.form.keyword) {
        this.keywords.push(this.form.keyword);
      }
      this.form.keyword = "";
    },
    // 주제 생성하기
    saveGroup() {
      if (this.form.groupName) {
        this.keywordGroups.push({
          groupName: this.form.groupName,
          keywords: this.keywords,
        });
        
        this.form.groupName = "";
        this.keywords = [];
      }
    },
    removeGroup(groupName) {
      this.keywordGroups = this.keywordGroups.filter(
        (li) => li.groupName !== groupName
      );
    },
    removeKeyword(keyword) {
      this.keywords = this.keywords.filter((li) => li !== keyword);
    },
    async onSubmit() {
      console.log(this.form);
      console.log(this.ages);
      const { startDate, endDate, timeUnit, device, gender, ages } = this.form;
      console.dir(startDate);
   
      if (
        this.keywordGroups.length &&
        startDate &&
        endDate &&
        timeUnit &&
        device &&
        gender &&
        ages
      ) {
        const data = {
          keywordGroups: this.keywordGroups,
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment().format("YYYY-MM-DD"),
          timeUnit,
          device,
          gender,
          ages,
        };

        const result = await dataLap.post(data);
        if (result.data.status === "OK") {
          this.generateChartData();
          console.log("OK");
        }
      } else {
        alert("빈 값들을 입력해 주세요 ");
      }
    },
  },
};
</script>
<style>
.groups-wrapper {
  display: flex;
  flex-direction: column;
  border: 1px solid #dddddddd;
  padding: 30px;
  /* margin:20px; */
  margin-bottom: 30px;
  /* justify-content: center; */
  align-items: stretch;
}
.create-button {
  width: 31%; 
  margin-top: 30px !important;
  margin-left: 120px !important;
  /* margin-left: 40%; */
  /* margin: 0 auto !important;  */
}

.tag-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 12px;
}

.group-tag {
  width: 80px;
  font-size: 11px !important;
  margin: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
