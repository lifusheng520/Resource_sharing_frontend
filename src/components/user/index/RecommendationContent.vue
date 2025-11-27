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
                        <input type="text" v-model="page.searchContent" :placeholder="`${$t('recommendationContent.placeholderPrompt')}`">
                        <button type="button" @click="getResourceBySelectDiscipline">
                          <i class="el-icon-search"></i>&nbsp;&nbsp;&nbsp;&nbsp;{{$t('recommendationContent.search')}}
                        </button>

                        <div id="div_title_selection">

                          <el-select v-model="page.disciplineContent" :placeholder="`${$t('recommendationContent.categories')}`"
                          @change="getResourceBySelectDiscipline">
                            <el-option
                              v-for="item in disciplineList"
                              :key="item.value"
                              :label="`${translateDisciplineToSelectedLanguage(item)}`"
                              :value="item">
                            </el-option>
                          </el-select>

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

    <el-empty v-if="this.isEmpty" style="margin: 0;background: white;height: 700px" :description="`${$t('notFound404')}`"></el-empty>

    <div v-else>

      <el-backtop>TOP</el-backtop>

      <!-- 资源列表 begin-->
      <div class="testimonial" id="div_resource_list_box">

        <div class="row justify-content-center">
          <div class="col-xl-12 col-lg-12">
            <div class="section-title text-left">
              <h2>
                {{$t('recommendationContent.source')}}
                <span>{{this.sourceFrom}}</span>
              </h2>
              <h2>
                {{$t('recommendationContent.search')}}：
                <span>{{page.searchContent}}</span>
              </h2>

            </div>
          </div>
        </div>

        <div style="width: 100%">

          <div class="row">
            <div class="col-xl-16 col-lg-16">

              <div v-for="(item, index) in resourceList" :key="index" id="div_resource_item">
                  <div class="single-testimonial">

                    <el-row>
                      <el-col :span="12">
                        <div class="resource_info_items" id="div_resource_item_title">
                          <span id="span_resource_subject">
                            <i class="el-icon-office-building"></i>
                            {{translateDisciplineToSelectedLanguage(item.discipline)}}
                          </span>
                        </div>
                      </el-col>

                      <el-col :span="12">
                        <div class="resource_info_items" id="div_resource_time">
                          {{$t('recommendationContent.uploadTime')}}
                          {{item.upload_time}}
                        </div>
                      </el-col>

                    </el-row>


                    <el-row>
                      <el-col :span="6">
                        <div class="part-info" id="div_resource_downloads">
                          <i class="el-icon-download"></i> {{item.downloads}}  {{$t('recommendationContent.times')}}
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

                        <div id="div_resource_download_button">
                          <div>
                            <a
                              :href="`${backendURL}/resource/download/${item.disk_name}/${item.id}/${item.discipline}`">
                              <el-button size="small" round><i class="fas fa-cloud-download-alt"></i> {{$t('download')}}</el-button>
                            </a>
                          </div>
                        </div>
                      </el-col>

                      <el-col :span="18">
                        <div class="part-info" id="div_resource_name">
                          <a v-on:click="goResourceDetail(item.id)"><i class="el-icon-document"></i>
                            {{item.origin_name}}</a>
                        </div>
                        <div class="resource_info_items" id="div_resource_description">
                          <b style="font-size: large;">{{$t('recommendationContent.introduction')}}</b>
                          &nbsp;&nbsp;
                          <span style="font-size: medium;">{{item.description}}</span>
                        </div>
                      </el-col>
                    </el-row>

                  </div>
                </div>

            </div>
          </div>

          <div align="center" style="margin-top: 20px;">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="page.currentPage" :page-size="page.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="page.totalPages">
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
          disciplineContent: '',
          searchContent: '',
          currentPage: -1,
          totalPages: -1,
          pageSize: 10
        },
        sourceFrom: this.$t('disciplines.all'),
        resourceList: [],
        disciplineList: [],
        hostURL: '',
        backendURL: this.$axios.defaults.baseURL
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
        this.sourceFrom = this.page.disciplineContent;

        // 第一次查询，初始化分页数据
        this.page.currentPage = -1;
        this.page.totalPages = -1;
        this.setHostURL();
        this.getResourceOfPage();
      },
      setHostURL() {
        this.page.searchContent = this.page.searchContent.replace(/\s*/g, '');

        // 选择全部，获取默认资源
        if (this.page.disciplineContent == this.$t('recommendationContent.all') && !this.page.searchContent) {
          // 单独获取全部默认资源
          this.hostURL = '/resource/recommend/default';

        } else if (this.page.disciplineContent == this.$t('recommendationContent.all') && this.page.searchContent) {
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
        this.page.disciplineContent = this.translateDisciplineToChinese(this.page.disciplineContent);

        let out_this = this;
        this.$axios.post(this.hostURL, this.page).then(res => {
          let resData = res.data;
          //console.log(resData);
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
      },
      // 翻译内容到用户选择的语言
      translateDisciplineToSelectedLanguage(content) {  
        switch (content) {
          case '全部':
            return this.$t('recommendationContent.all');
          case '法学':
            return this.$t('disciplines.law');
          case '工学':
            return this.$t('disciplines.engineering');
          case '管理学':
            return this.$t('disciplines.management');
          case '计算机科学':
            return this.$t('disciplines.computerScience');
          case '教育学':
            return this.$t('disciplines.education');
          case '经济学':
            return this.$t('disciplines.economics');
          case '军事学':
            return this.$t('disciplines.militaryScience');
          case '理学':
            return this.$t('disciplines.science');
          case '历史学':
            return this.$t('disciplines.history');
          case '农学':
            return this.$t('disciplines.agronomy');
          case '文学':
            return this.$t('disciplines.literature');
          case '医学':
            return this.$t('disciplines.medicine');
          case '艺术学':
            return this.$t('disciplines.artStudies');
          case '哲学':
            return this.$t('disciplines.philosophy');
        }
      },
      translateDisciplineToChinese(content) {
        switch (content) {
          case this.$t('recommendationContent.all'):
            return '全部';
          case this.$t('disciplines.law'):
            return '法学';
          case this.$t('disciplines.engineering'):
            return '工学';
          case this.$t('disciplines.management'):
            return '管理学';
          case this.$t('disciplines.computerScience'):
            return '计算机科学';
          case this.$t('disciplines.education'):
            return '教育学';
          case this.$t('disciplines.economics'):
            return '经济学';
          case this.$t('disciplines.militaryScience'):
            return '军事学';
          case this.$t('disciplines.science'):
            return '理学';
          case this.$t('disciplines.history'):
            return '历史学';
          case this.$t('disciplines.agronomy'):
            return '农学';
          case this.$t('disciplines.literature'):
            return '文学';
          case this.$t('disciplines.medicine'):
            return '医学';
          case this.$t('disciplines.artStudies'):
            return '艺术学';
          case this.$t('disciplines.philosophy'):
            return '哲学';
        }

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


  #div_title_content {
    width: 100%;
  }

  #div_title_selection {
    margin-top: 50px;
    text-align: left;
    color: white;
    font-size: medium;
  }

  #div_resource_item_title {
    height: 45px;
    margin-top: -30px;
    margin-left: -20px;
  }

  #div_resource_name {
    font-size: 25px;
    text-align: center;
    margin-top: -10px;
  }

  #div_resource_time {
    text-align: right;
    margin-top: -25px;
    font-size: 12px;
  }

  #span_resource_subject {
    font-size: 20px;
    font-weight: bold;
  }

  #div_resource_description {
    height: 100%;
    font-size: 14px;
  }

  #div_resource_downloads {
    text-align: left;
    margin-left: -20px;
  }

  #div_resource_favorite {
    text-align: left;
    margin-left: -20px;

  }

  #div_resource_size {
    text-align: left;
    margin-left: -20px;
    margin-bottom: 20px;
  }

  #div_resource_download_button {
    margin-left: -30px;
    text-align: left;
  }

  #div_resource_download_button button {
    transform: scale(0.8);
  }

  #div_resource_support {
    margin-left: -20px;
    margin-top: -20px;
  }

  .resource_info_items {
    color: white;
  }

</style>
