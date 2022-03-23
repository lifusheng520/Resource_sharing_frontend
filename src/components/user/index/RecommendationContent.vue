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
                        <input type="text" v-model="recommendForm.searchContent" placeholder="资料名">
                        <button><i class="el-icon-search"></i>&nbsp;&nbsp;&nbsp;&nbsp;搜索</button>

                        <div id="div_title_radio">
                          分类：
                          <el-radio-group id="discipline_radio" v-model="recommendForm.disciplineContent"
                                          @change="getResourceBySelectDiscipline"
                                          v-for="(item, index) in disciplineList" :key="index">
                            <el-radio-button style="margin: 0px 5px;" :label="item"></el-radio-button>
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
    <div v-else class="testimonial" id="div_resource_list_box">

      <div class="row justify-content-center">
        <div class="col-xl-12 col-lg-12">
          <div class="section-title text-left">
            <h2>资源推荐：<span>{{recommendTitle}}</span></h2>
          </div>
        </div>
      </div>

      <div style="width: 100%">

        <div class="row">
          <div class="col-xl-12 col-lg-12">

            <div v-for="(item, index) in resourceList" :key="index" id="div_resource_item">
              <div style="margin: 15px auto;">
                <div class="single-testimonial">

                  <div class="part-info" id="div_resource_item_title">
                    <span id="span_resource_subject"><i class="el-icon-office-building"></i>{{item.discipline}}</span>
                  </div>
                  <div class="part-info" id="div_resource_name">
                    <i class="el-icon-document"></i> {{item.origin_name}}
                  </div>
                  <div class="part-info" id="div_resource_time">
                    上传于： {{item.upload_time}}
                  </div>
                  <div class="part-info" id="div_resource_downloads">
                    <i class="el-icon-download"></i> {{item.downloads}} 次
                  </div>
                  <div class="part-info" id="div_resource_favorite">
                    <i class="fas fa-star"></i> {{item.favorite_number}}
                  </div>
                  <div class="part-info" id="div_resource_size">
                    <span v-if="item.size < 1024">
                      <i class="fas el-icon-s-cooperation"></i> {{item.size}}kb
                    </span>
                    <span v-else-if="item.size < 1024 * 1024">
                      <i class="fas el-icon-s-cooperation"></i> {{(item.size / 1024).toFixed(1)}}MB
                    </span>
                    <span v-else>
                      <i class="fas el-icon-s-cooperation"></i> {{(item.size / 1024 / 1024).toFixed(1)}}Gb
                    </span>
                  </div>
                  <div class="part-text">
                    <div id="div_resource_description_title">
                      简介：
                    </div>
                    <div class="part-text" id="div_resource_description">
                      {{item.description}}
                    </div>

                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

        <div align="center">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="page.currentPage" :page-size="page.pageSize"
                         layout="total, sizes, prev, pager, next, jumper" :total="page.totalPages">
          </el-pagination>
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
        recommendTitle: '',
        recommendForm: {
          disciplineContent: '',
          searchContent: '',
        },
        page: {
          currentPage: -1,
          totalPages: -1,
          pageSize: 10,
        },
        disciplineList: [],
        resourceList: [],
      }
    },
    created() {
      let out_this = this;
      this.$axios.get('/resource/server/discipline').then(res => {
        let resData = res.data;
        console.log(resData);
        out_this.disciplineList = resData.data;
      });

      this.getResourceOfPage();
    },
    methods: {
      getResourceBySelectDiscipline() {
        let out_this = this;
        this.$axios.post('/resource/recommend/select', this.recommendForm).then(res => {
          let resData = res.data;
          console.log(res.data);
          out_this.resourceList = resData.data;
        });
        console.log(this.resourceList)
      },
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.getResourceOfPage();
      },
      handleCurrentChange(val) {
        this.page.currentPage = val;
        this.getResourceOfPage();
      },
      getResourceOfPage() {
        let out_this = this;
        this.$axios.post('/resource/recommend/default', this.page).then(res => {
          let resData = res.data;
          console.log(resData);
          out_this.page.currentPage = resData.data.currentPage;
          out_this.page.totalPages = resData.data.total;
          out_this.page.pageSize = resData.data.pageSize;
          out_this.resourceList = resData.data.pageList;
        });
      }
    }

  }
</script>

<style scoped>

  #div_resource_list_box {
    padding: 50px;
    width: 75%;
    margin: 0px auto;
  }

  /*#div_resource_item {*/
  /*  height: 200px;*/
  /*}*/


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

  #div_resource_item_title {
    height: 50px;
    padding: 0px;
    margin-top: -30px;
    margin-left: -20px;
  }

  #div_resource_name {
    font-size: 25px;
    text-align: center;
    margin-top: -25px;
  }

  #div_resource_time {
    position: absolute;
    top: 0px;
    width: 95%;
    text-align: right;
    padding-right: 10px;
  }

  #span_resource_subject {
    font-size: 25px;
    font-weight: bold;
  }

  #div_resource_description_title {
    /*border: 1px solid #ddd;*/
    position: absolute;
    top: 90px;
    left: 160px;
    font-weight: bold;
    font-size: 18px;
  }

  #div_resource_description {
    font-size: 14px;
    position: absolute;
    top: 76px;
    left: 210px;
    /*border: 1px solid #ddd;*/
    width: 70%;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 将对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
    overflow: hidden;
  }

  #div_resource_downloads {
    text-align: left;
    margin-top: -30px;
    margin-left: -15px;
  }

  #div_resource_favorite {
    text-align: left;
    margin-left: -15px;

  }

  #div_resource_size {
    text-align: left;
    margin-left: -15px;
    margin-bottom: 20px;
  }

</style>
