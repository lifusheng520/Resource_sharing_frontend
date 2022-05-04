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
                        <input type="text" v-model="page.searchContent" placeholder="资料名">
                        <button type="button" @click="getResourceBySelectDiscipline"><i class="el-icon-search"></i>&nbsp;&nbsp;&nbsp;&nbsp;搜索
                        </button>

                        <div id="div_title_radio">
                          分类：
                          <el-radio-group id="discipline_radio" v-model="page.disciplineContent"
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

    <div v-else>
      <!-- <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal"
               @select="handleSelect" background-color="#545c64" text-color="#fff"
               active-text-color="#ffd04b" style="width: 75%;margin: -30px auto;">
        <el-menu-item index="1">下载量</el-menu-item>
        <el-menu-item index="2">最新</el-menu-item>
        <el-menu-item index="3">最热门</el-menu-item>
        <el-menu-item index="4">收藏最多</el-menu-item>
      </el-menu> -->

      <el-backtop>TOP</el-backtop>

      <!-- 资源列表 begin-->
      <div class="testimonial" id="div_resource_list_box">

        <div class="row justify-content-center">
          <div class="col-xl-12 col-lg-12">
            <div class="section-title text-left">
              <h2>
                资源来源：
                <span>{{page.disciplineContent}}</span>
              </h2>
              <h2>
                搜索：
                <span>{{page.searchContent}}</span>
              </h2>

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
                      <a v-on:click="goResourceDetail(item.id)"><i class="el-icon-document"></i>
                        {{item.origin_name}}</a>
                    </div>
                    <div class="part-info" id="div_resource_time">
                      上传于： {{item.upload_time}}
                    </div>
                    <div class="part-info" id="div_resource_downloads">
                      <i class="el-icon-download"></i> {{item.downloads}} 次
                    </div>
                    <div class="part-info" id="div_resource_favorite">
                      <a v-on:click="goResourceDetailPage(item.id)">
                        <span v-on:click="goResourceDetailPage(item.id)"><i class="fas fa-star"></i> {{item.favorite_number}}</span>
                      </a>
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

                    <div class="part-info" id="div_resource_support">
                      <a v-on:click="goResourceDetailPage(item.id)">
                        <span><i class="fas fa-thumbs-up"></i> {{item.supportNumber}}</span>
                      </a>
                    </div>

                    <div class="part-text">
                      <div id="div_resource_description_title">
                        简介：
                      </div>
                      <div class="part-text" id="div_resource_description">
                        {{item.description}}
                      </div>
                    </div>

                    <div id="div_resource_download_button">
                      <div>
                        <a
                          :href="`http://localhost:8080/resource/download/${item.disk_name}/${item.id}/${item.discipline}`">
                          <el-button size="small" round><i class="fas fa-cloud-download-alt"></i> 下载</el-button>
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>

          <div align="center">
            <el-pagination background
                           @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="page.currentPage" :page-size="page.pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="page.totalPages">
            </el-pagination>
          </div>

        </div>
      </div>
    </div>
    <!-- 资源列表 end -->

  </div>
</template>

<script>
  export default {
    name: "RecommendationContent",
    data() {
      return {
        isEmpty: false,
        firstTime: true,
        page: {
          disciplineContent: '全部',
          searchContent: '',
          currentPage: -1,
          totalPages: -1,
          pageSize: 10
        },
        resourceList: [],
        disciplineList: [],
        hostURL: '',
      }
    },
    created() {
      let out_this = this;
      this.$axios.get('/resource/server/discipline').then(res => {
        let resData = res.data;
        out_this.disciplineList = resData.data;
      });
      this.setHostURL();
      this.getResourceOfPage();
    },
    methods: {
      getResourceBySelectDiscipline() {
        // 第一次查询，初始化分页数据
        this.page.currentPage = -1;
        this.page.totalPages = -1;
        this.setHostURL();
        this.getResourceOfPage();
      },
      setHostURL() {
        this.page.searchContent = this.page.searchContent.replace(/\s*/g, '');

        // 选择全部，获取默认资源
        if (this.page.disciplineContent == '全部' && !this.page.searchContent) {
          // 单独获取全部默认资源
          this.hostURL = '/resource/recommend/default';

        } else if (this.page.disciplineContent == '全部' && this.page.searchContent) {
          // 单独搜索全部资源
          this.hostURL = '/resource/recommend/search';

        } else if (!this.page.disciplineContent && this.page.searchContent) {  // 选择项为空，但是需要搜索内容
          // 单独搜索资源
          this.hostURL = '/resource/recommend/search';

        } else if (this.page.disciplineContent && !this.page.searchContent) {  // 选择了科目，但是搜索值为空
          // 单独获取科目资源
          this.hostURL = '/resource/recommend/select';

        } else if (this.page.disciplineContent && this.page.searchContent) {
          // 按科目搜索资源
          this.hostURL = '/resource/recommend/condition';

        } else if (!this.page.searchContent || !this.page.disciplineContent) {
          // 默认的资源
          this.hostURL = '/resource/recommend/default';
        }

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
        this.$axios.post(this.hostURL, this.page).then(res => {
          let resData = res.data;
          console.log(resData);
          out_this.page.currentPage = resData.data.currentPage;
          out_this.page.totalPages = resData.data.total;
          out_this.page.pageSize = resData.data.pageSize;
          out_this.resourceList = resData.data.pageList;
        });
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      goResourceDetail(id) {
        this.$cookies.set('resource_id', id);
        this.$router.push('/detail');
      },
      // 跳转资源详情页面
      goResourceDetailPage(id) {
        this.$cookies.set('resource_id', id);
        this.$router.push('/detail');
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

  #div_resource_item {

  }


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

  #div_resource_download_button {
    text-align: right;
  }

  #div_resource_support {
    margin-left: -15px;
    margin-top: -30px;
  }

</style>
