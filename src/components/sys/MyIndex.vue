<template>
  <div>


    <!-- 首部内容 -->
    <div class="banner">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-8">
            <div class="banner-content">
              <h1>白给网 —— 校园资料分享平台</h1>
              <p>内卷无处不在，毕业设计也是如此。<br/>
                你强任你强，卷王背行囊。加入我们，悄悄做卷王。</p>
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
                <h2>50,236</h2>
                <h3>用户量</h3>
                <p>唱、跳、rap、打篮球和制造BUG仅仅只是我们的娱乐业务，
                  我们更专注于挖掘有需要的人群，在人海中寻找符合我们业务需求的用户。
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
                <h2>5,020.360</h2>
                <h3>资源数</h3>
                <p>我们的资料超乎你的想象，不需要讲大话、口嗨，
                  庞大的后台资料库就是我们最好的证明，我们有能力提供优质丰富的资源服务。</p>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-6">
            <div class="info-single-feature">
              <div class="part-icon">
                <i class="el-icon-download"></i>
              </div>
              <div class="part-text">
                <h2>1,030.136</h2>
                <h3>次下载</h3>
                <p>加入我们，与其他用户一样，享受优质的资源服务，与大家一起共享你的资源，
                让资源发挥它的最大价值。选择<del style="text-decoration-color: red;text-decoration-style: double;">我们</del>亚索是你最正确的选择。</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- 网站使用数据内容-->

    <!-- testimonial begin-->
    <div class="testimonial">
      <div class="container">

        <div class="row justify-content-center">
          <div class="col-xl-6 col-lg-6">
            <div class="section-title text-center">
              <h2><span>Say’s</span></h2>
              <p>Put your investing ideas into action with full range of investments.
                Enjoy real benefits and rewards on your accrue investing.</p>
            </div>
          </div>
        </div>

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



    <!-- blog post begin-->
    <div class="blog-post">
      <div class="bg-img">
        <img src="static/img/blog-post-bg.png" alt="">
      </div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-8">
            <div class="section-title text-center">
              <h2 class="extra-margin">Latest<span> Blog Posts</span></h2>
              <p>Put your investing ideas into action with full range of investments.
                Enjoy real benefits and rewards on your accrue investing.</p>
            </div>
          </div>
        </div>

        <div class="row">

          <div class="col-xl-4 col-lg-4 col-md-6">
            <div class="single-blog">
              <div class="part-img">
                <img src="static/img/blog-post-1.jpg" alt="">
              </div>
              <div class="part-text">
                <div class="user-img">
                  <img src="static/img/post-admin.png" alt="">
                </div>
                <h3><a href="blog-details.html">Blog Single Image Post</a></h3>
                <h4>
                  <span class="admin">By Admin </span>.
                  <span class="date">12 Nov, 2018 </span>.
                  <span class="category">in Web Design </span>
                </h4>
                <p>Lorem Ipsum is simply dummy text of the rinting and
                  typesetting industry. Lorem Ipsum has been the industry's standard
                  dummy ...</p>
              </div>
              <div class="part-social">
                <a href="#"><span><i class="fas fa-comment"></i></span> 25</a>
                <a href="#"><span><i class="fas fa-heart"></i></span> 480</a>
                <a href="#"><span><i class="fas fa-share"></i></span> Share</a>
                <a href="#"><span></span> More</a>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-6">
            <div class="single-blog">
              <div class="part-img">
                <img src="static/img/blog-post-2.jpg" alt="">
              </div>
              <div class="part-text">
                <div class="user-img">
                  <img src="static/img/post-admin.png" alt="">
                </div>
                <h3><a href="blog-details.html">Printer took a galley</a></h3>
                <h4>
                  <span class="admin">By Admin </span>.
                  <span class="date">12 Nov, 2018 </span>.
                  <span class="category">in Web Design </span>
                </h4>
                <p>Lorem Ipsum is simply dummy text of the rinting and
                  typesetting industry. Lorem Ipsum has been the industry's standard
                  dummy ...</p>
              </div>
              <div class="part-social">
                <a href="#"><span><i class="fas fa-comment"></i></span> 25</a>
                <a href="#"><span><i class="fas fa-heart"></i></span> 480</a>
                <a href="#"><span><i class="fas fa-share"></i></span> Share</a>
                <a href="#"><span></span> More</a>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-6">
            <div class="single-blog">
              <div class="part-img">
                <img src="static/img/blog-post-3.jpg" alt="">
              </div>
              <div class="part-text">
                <div class="user-img">
                  <img src="static/img/post-admin.png" alt="">
                </div>
                <h3><a href="blog-details.html">reader will be distracted</a></h3>
                <h4>
                  <span class="admin">By Admin </span>.
                  <span class="date">12 Nov, 2018 </span>.
                  <span class="category">in Web Design </span>
                </h4>
                <p>Lorem Ipsum is simply dummy text of the rinting and
                  typesetting industry. Lorem Ipsum has been the industry's standard
                  dummy ...</p>
              </div>
              <div class="part-social">
                <a href="#"><span><i class="fas fa-comment"></i></span> 25</a>
                <a href="#"><span><i class="fas fa-heart"></i></span> 480</a>
                <a href="#"><span><i class="fas fa-share"></i></span> Share</a>
                <a href="#"><span></span> More</a>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-6">
            <div class="single-blog">
              <div class="part-img">
                <img src="static/img/blog-post-4.jpg" alt="">
              </div>
              <div class="part-text">
                <div class="user-img">
                  <img src="static/img/post-admin.png" alt="">
                </div>
                <h3><a href="blog-details.html">There are many variations</a></h3>
                <h4>
                  <span class="admin">By Admin </span>.
                  <span class="date">12 Nov, 2018 </span>.
                  <span class="category">in Web Design </span>
                </h4>
                <p>Lorem Ipsum is simply dummy text of the rinting and
                  typesetting industry. Lorem Ipsum has been the industry's standard
                  dummy ...</p>
              </div>
              <div class="part-social">
                <a href="#"><span><i class="fas fa-comment"></i></span> 25</a>
                <a href="#"><span><i class="fas fa-heart"></i></span> 480</a>
                <a href="#"><span><i class="fas fa-share"></i></span> Share</a>
                <a href="#"><span></span> More</a>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-6">
            <div class="single-blog">
              <div class="part-img">
                <img src="static/img/blog-post-5.jpg" alt="">
              </div>
              <div class="part-text">
                <div class="user-img">
                  <img src="static/img/post-admin.png" alt="">
                </div>
                <h3><a href="blog-details.html">it over 2000 years old</a></h3>
                <h4>
                  <span class="admin">By Admin </span>.
                  <span class="date">12 Nov, 2018 </span>.
                  <span class="category">in Web Design </span>
                </h4>
                <p>Lorem Ipsum is simply dummy text of the rinting and
                  typesetting industry. Lorem Ipsum has been the industry's standard
                  dummy ...</p>
              </div>
              <div class="part-social">
                <a href="#"><span><i class="fas fa-comment"></i></span> 25</a>
                <a href="#"><span><i class="fas fa-heart"></i></span> 480</a>
                <a href="#"><span><i class="fas fa-share"></i></span> Share</a>
                <a href="#"><span></span> More</a>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-6">
            <div class="single-blog">
              <div class="part-img">
                <img src="static/img/blog-post-6.jpg" alt="">
              </div>
              <div class="part-text">
                <div class="user-img">
                  <img src="static/img/post-admin.png" alt="">
                </div>
                <h3><a href="blog-details.html">Ipsum comes from bd</a></h3>
                <h4>
                  <span class="admin">By Admin </span>.
                  <span class="date">12 Nov, 2018 </span>.
                  <span class="category">in Web Design </span>
                </h4>
                <p>Lorem Ipsum is simply dummy text of the rinting and
                  typesetting industry. Lorem Ipsum has been the industry's standard
                  dummy ...</p>
              </div>
              <div class="part-social">
                <a href="#"><span><i class="fas fa-comment"></i></span> 25</a>
                <a href="#"><span><i class="fas fa-heart"></i></span> 480</a>
                <a href="#"><span><i class="fas fa-share"></i></span> Share</a>
                <a href="#"><span></span> More</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- blog post end -->



  </div>
</template>

<script>
  export default {
    name: "MyIndex",
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
