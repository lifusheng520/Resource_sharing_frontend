<template>
  <div>


    <!-- 首部内容 -->
    <div class="banner">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-8">
            <div class="banner-content">
              <h1>{{ $t('myIndex.title') }}</h1>
              <p>
                {{ $t('myIndex.description1') }}
                <br/>
                {{ $t('myIndex.description11') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 首部内容 -->

    <!-- 网站使用数据内容-->
    <div class="info-feature">
      <div class="container" style="margin-top: -100px;">
        <div class="row">

          <div class="col-xl-4 col-lg-4 col-md-6">
            <div class="info-single-feature">
              <div class="part-icon">
                <i class="flaticon-group"></i>
              </div>
              <div class="part-text">
                <h2>{{systemInfo.userNumber.toLocaleString()}}</h2>
                <h3>{{ $t('myIndex.userAmount') }}</h3>
                <p>
                  {{ $t('myIndex.description2') }}
                </p>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-6">
            <div class="info-single-feature">
              <div class="part-icon">
                <i class="el-icon-folder-opened"></i>
              </div>
              <div class="part-text">
                <h2>{{systemInfo.resourceNumber.toLocaleString()}}</h2>
                <h3>{{ $t('myIndex.resourceAmount') }}</h3>
                <p>
                  {{ $t('myIndex.description3') }}
                </p>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-6">
            <div class="info-single-feature">
              <div class="part-icon">
                <i class="el-icon-download"></i>
              </div>
              <div class="part-text">
                <h2>{{systemInfo.downloadTimes.toLocaleString()}}</h2>
                <h3>{{ $t('myIndex.downloadTimes') }}</h3>
                <p>
                  {{ $t('myIndex.description4') }}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- 网站使用数据内容-->

    <!-- 资源推荐 begin-->
    <div class="blog-post">
      <div class="bg-img">
        <img src="static/img/blog-post-bg.png" alt="">
      </div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-12 col-lg-12">
            <div class="section-title text-center">
              <h2 class="extra-margin">{{ $t('myIndex.hotest') }}<span> {{ $t('myIndex.resource') }}</span></h2>
              <p>
                {{ $t('myIndex.description5') }}
              </p>
            </div>
          </div>
        </div>

        <div class="row">

          <div style="margin-top: 20px" class="col-xl-6 col-lg-6 col-md-6"
               v-for="(item, index) in recommendInfo">
            <div class="single-blog">
              <div class="part-text">
                <div class="user-img">
                  <img v-if="item.userInfo.headIcon" :src="item.userInfo.headIcon" alt="">
                  <img v-else src="static/ico/none.png" alt="">
                </div>
                <h3><a v-on:click="goResourceDetail(item.resource.id)">{{item.resource.origin_name}}</a></h3>
                <h4>
                  <span><i class="el-icon-s-custom"></i>&nbsp;&nbsp;&nbsp;{{item.userInfo.name}} </span>
                </h4>
                <h4>
                  <span>{{ $t('myIndex.uploadTime') }}{{item.resource.upload_time}}</span>
                </h4>
                <h4>
                  <span>{{ $t('myIndex.belongTo') }}{{item.resource.discipline}}</span>
                </h4>
                <h4><span>{{ $t('myIndex.introduction') }}</span></h4>
                <div class="div_resource_description">
                  {{item.resource.description}}
                </div>
              </div>
              <div class="part-social">
                <a v-on:click="resourceSupportHandler(item.resource.id)">
                  <span><i class="fas fa-thumbs-up"></i></span> {{item.resource.supportNumber}}
                </a>
                <a v-on:click="goResourceDetail(item.resource.id)"><span><i class="fas fa-star"></i></span>{{item.resource.favorite_number}}</a>
                <a><span><i class="fas fa-cloud-download-alt"></i></span>{{item.resource.downloads}}次</a>
                <a
                  :href="`${backendBaseURL}/resource/download/${item.resource.disk_name}/${item.resource.id}/${item.resource.discipline}`"><span><i
                  class="fas fa-download"></i></span>{{ $t('download') }}</a>
                <a v-on:click="goResourceDetail(item.resource.id)"> More</a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
    <!-- 资源推荐 end -->


  </div>
</template>

<script>
  export default {
    name: "MyIndex",
    data() {
      return {
        systemInfo: {
          userNumber: '',
          resourceNumber: '',
          downloadTimes: '',
        },
        recommendInfo: [],
        backendBaseURL: this.$axios.defaults.baseURL,

      }
    },
    created() {
      let out_this = this;
      this.$axios.get('/index/systemInfo').then(res => {
        let resData = res.data;
        if (resData.code === 4023) {
          out_this.systemInfo.userNumber = resData.data.userNumber;
          out_this.systemInfo.resourceNumber = resData.data.resourceNumber;
          out_this.systemInfo.downloadTimes = resData.data.downloadTimes;
        } else {
          out_this.$message.info(resData.code + '  ~~~~  ' + out_this.$t('notFound404'));
        }
      });

      // 获取首页推荐资源内容
      this.$axios.get('/index/disciplineRecommend').then(res => {
        let resData = res.data;
        console.log(resData);
        out_this.recommendInfo = resData.data;
      });
    },
    methods: {
      goResourceDetail(id) {
        this.$cookies.set('resource_id', id);
        this.$router.push('/detail');
      },
      // 资源点赞处理函数
      resourceSupportHandler(resourceId) {
        // 获取登录信息
        let userId = this.getLoginInfo();
        if (!userId)
          return;

        let out_this = this;
        this.$axios.get(`/support/resource/${userId}/${resourceId}`).then(response => {
          let resData = response.data;
          console.log(resData);
          if (resData.code == 6051) {
            out_this.$message({
              message: resData.code + ' ~~~~ ' + out_this.$t('supportSuccess'),
              type: 'success',
              duration: 2000
            });
            // 点赞成功，将资源的点赞数+1
            out_this.setResourceSupportNumber(resourceId, 1);
          } else if (resData.code == 6052) {
            // 取消成功，将资源的点赞数-1
            out_this.setResourceSupportNumber(resourceId, -1);
          } else {
            out_this.$message.error(resData.code + '~~~~' + out_this.$t('serverError'));
          }

        });
      },
      // 获取登录信息
      getLoginInfo() {
        let userId = this.$cookies.get('user_id');
        if (userId) {
          return userId;
        } else {
          this.$message.info(this.$t('sessionExpired'));
          return false;
        }
      },
      // 给资源的点赞数量加上一个增量
      setResourceSupportNumber(resource_id, dx) {
        for (let i = 0; i < this.recommendInfo.length; ++i) {
          if (this.recommendInfo[i].resource.id == resource_id) {
            this.recommendInfo[i].resource.supportNumber += dx;
            return;
          }
        }
      },

    }
  }

</script>

<style scoped>

  .div_resource_description {
    font-size: 14px;
    /*border: 1px solid #ddd;*/
    width: 100%;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 将对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
    overflow: hidden;

  }


</style>
