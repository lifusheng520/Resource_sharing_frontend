<template>
  <div>

    <!-- page-title 页面标题开始-->
    <div class="page-title">
      <div class="container" style="margin-top: -50px; margin-bottom: -90px;">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-8">
            <div class="page-title-content">

              <div class="newsletter">
                <div id="div_title_content">
                  <div class="row justify-content-center">
                    <div class="col-xl-16 col-lg-16">

                      <form class="newsletter-form">
                        <input type="email" placeholder="资料名">
                        <button type="submit"><i class="el-icon-search"></i>&nbsp;&nbsp;&nbsp;&nbsp;搜索</button>

                        <div id="div_title_radio">
                          分类：
                          <el-radio-group id="discipline_radio" v-model="disciplineList"
                                          @change="getResourceBySelectDiscipline"
                                          v-for="(item, index) in disciplineList" :key="index">
                            <el-radio-button style="margin: 0px 5px" :label="item"></el-radio-button>
                          </el-radio-group>
                        </div>

                      </form>

                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- page-title 页面标题结束 -->

    <el-empty v-if="this.isEmpty" style="margin: 0;background: white;height: 700px" description="网络开小差了呢~~~"></el-empty>

    <!-- testimonial begin-->
    <div v-else class="testimonial" style="padding: 50px;width: 90%;margin: 0px auto">

      <div style="width: 100%">

        <div class="row">
          <div class="col-xl-12 col-lg-12">
            <div v-for="i in 10">
              <div style="margin: 15px auto;">

                <div class="single-testimonial">
                  <div class="part-info" id="div_resource_item">
                    <span>推荐学科：XXXX</span>
                  </div>
                  <div class="part-text">

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- testimonial end -->

  </div>
</template>

<script>
  export default {
    name: "RecommendationContent",
    data() {
      return {
        isEmpty: false,
        recommendInfo: [],
        disciplineList: [],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    created() {
      let out_this = this;
      this.$axios.get('/resource/server/discipline').then(res => {
        let resData = res.data;
        console.log(resData);
        out_this.disciplineList = resData.data;
      });
    },
    methods: {
      getResourceBySelectDiscipline() {
        alert(1)
      }
    }

  }
</script>

<style scoped>
  #div_title_content {
    width: 100%;
  }

  #div_title_radio {
    width: 800px;
    margin-top: 50px;
    text-align: left;
    color: white;
    font-size: large;
  }

  #discipline_radio {
    margin-top: 10px;
  }

  #div_resource_item {
    height: 0px;
    padding: 0px;
    margin-top: 0px;
  }

</style>

