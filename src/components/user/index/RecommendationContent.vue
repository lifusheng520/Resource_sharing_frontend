<template>
  <div>
    <!-- page-title 页面标题开始-->
    <div class="page-title">
      <div class="container" style="margin: -50px auto;">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-8">
            <div class="page-title-content">

              <div class="newsletter">
                <div class="container">
                  <div class="row justify-content-center">
                    <div class="col-xl-12 col-lg-12">
                      <form class="newsletter-form">
                        <input type="email" placeholder="资料名">
                        <button type="submit"><i class="el-icon-search"></i>&nbsp;&nbsp;&nbsp;&nbsp;搜索</button>
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

    <!-- testimonial begin-->
    <div class="testimonial" style="padding: 50px;width: 90%;margin: 0px auto">
      <div style="width: 100%">

        <div class="row">
          <div class="col-xl-12 col-lg-12">
            <div>

              <div class="single-testimonial">
                <div class="d-flex">
                  <div class="part-img">
                    <img src="static/img/testimonial-1.png" alt="">
                  </div>
                  <div class="part-info">
                    <h3>用户姓名</h3>
                    <h4>用户身份</h4>
                  </div>
                </div>
                <div class="part-text">
                  <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                      prop="date"
                      label="日期"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="姓名"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="地址">
                    </el-table-column>
                  </el-table>
                </div>
              </div>

              <div class="single-testimonial">
                <div class="d-flex">
                  <div class="part-img">
                    <img src="static/img/testimonial-1.png" alt="">
                  </div>
                  <div class="part-info">
                    <h3>Sabbir Ahmed</h3>
                    <h4>User Interface Designer</h4>
                  </div>
                </div>
                <div class="part-text">
                  <p>“We bring right people together to challenge established thinking
                    and drive transformation. We will show the way to successive. Put
                    your investing ideas into action with full range of investments
                    on your accrue investing.”</p>
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
    }
  }
</script>

<style scoped>

</style>
