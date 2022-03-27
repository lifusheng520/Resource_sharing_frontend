<template>
  <div>
    <!-- 排行 begin-->
    <div class="transaction">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-8">
            <div class="section-title text-center">
              <h2>全场资源贡献最佳 <span> MVP</span> 排行</h2>
              <p>优秀不值一提，你必须达到完美！这是属于你的show time，
                你的表现将惊艳全场。旁人说你的表现真的show啊，
                你永远不知道你是真的show，还是真的二，哈哈哈哈~~~~</p>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xl-12 col-lg-12">
            <div class="transaction-area">

              <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="deposit" role="tabpanel" aria-labelledby="home-tab">

                  <table class="table">

                    <thead align="center">

                    <tr>
                      <th scope="col">TOP</th>
                      <th scope="col">用户</th>
                      <th scope="col">贡献资源</th>
                      <th scope="col"></th>
                    </tr>

                    </thead>
                    <tbody>

                    <tr v-for="(item, index) in rankList" align="center">
                      <td>{{index + 1}}</td>
                      <th scope="row" class="d-flex">
                        <div class="user-img">
                          <img v-if="item.headIcon" :src="item.headIcon" alt="">
                          <img v-else src="static/ico/none.png" alt="">
                        </div>
                        <span>{{item.username}}</span>
                      </th>
                      <td>{{item.resourceNumbers}}</td>
                      <td>
                        <el-button round>
                          <i class="el-icon-plus"></i> 关注
                        </el-button>
                      </td>
                    </tr>

                    </tbody>
                  </table>

                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- 排行 end -->

  </div>
</template>

<script>
  export default {
    name: "UploadRank",
    data() {
      return {
        rankList: [],
      }
    },
    created() {
      let out_this = this;
      this.$axios.get('/rank/upload').then(res => {
        let resData = res.data;
        console.log(resData);
        if (resData.code == 4025)
          out_this.rankList = resData.data;
      });
    }
  }
</script>

<style scoped>


</style>
