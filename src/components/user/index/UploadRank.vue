<template>
<div>
  <!-- transaction begin-->
  <div class="transaction">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-8 col-lg-8">
          <div class="section-title text-center">
            <h2>全场资源贡献最佳 <span> MVP</span> 排行</h2>
            <p>优秀不值一提，你必须达到完美！这是属于你的show time，
              你的表现惊艳全场。旁人说你的表现真的show啊，
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
                  <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Currency</th>
                    <th scope="col">Deposit</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th scope="row" class="d-flex">
                      <div class="user-img">
                        <img src="assets/img/user-1.jpg" alt="">
                      </div>
                      <span>Olympia Ripple</span>
                    </th>
                    <td>Oct 24,2018</td>
                    <td>$9,00,000.00</td>
                    <td>Dollar</td>
                    <td>001 Days Ago</td>
                  </tr>

                  <tr>
                    <th scope="row" class="d-flex">
                      <div class="user-img">
                        <img src="assets/img/user-2.jpg" alt="">
                      </div>
                      <span>Alison Rittichier</span>
                    </th>
                    <td>Oct 24,2018</td>
                    <td>$9,00,000.00</td>
                    <td>Dollar</td>
                    <td>001 Days Ago</td>
                  </tr>

                  <tr>
                    <th scope="row" class="d-flex">
                      <div class="user-img">
                        <img src="assets/img/user-3.jpg" alt="">
                      </div>
                      <span>Isreal Vandy</span>
                    </th>
                    <td>Oct 24,2018</td>
                    <td>$9,00,000.00</td>
                    <td>Dollar</td>
                    <td>001 Days Ago</td>
                  </tr>

                  <tr>
                    <th scope="row" class="d-flex">
                      <div class="user-img">
                        <img src="assets/img/user-4.jpg" alt="">
                      </div>
                      <span>Emmett Steinkellner</span>
                    </th>
                    <td>Oct 24,2018</td>
                    <td>$9,00,000.00</td>
                    <td>Dollar</td>
                    <td>001 Days Ago</td>
                  </tr>

                  <tr>
                    <th scope="row" class="d-flex">
                      <div class="user-img">
                        <img src="assets/img/user-5.jpg" alt="">
                      </div>
                      <span>Nancee Broomes</span>
                    </th>
                    <td>Oct 24,2018</td>
                    <td>$9,00,000.00</td>
                    <td>Dollar</td>
                    <td>001 Days Ago</td>
                  </tr>
                  </tbody>
                </table>

              </div>
              <div class="tab-pane fade" id="withdraw" role="tabpanel" aria-labelledby="profile-tab">

                <table class="table">
                  <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Currency</th>
                    <th scope="col">Deposit</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th scope="row" class="d-flex">
                      <div class="user-img">
                        <img src="assets/img/user-1.jpg" alt="">
                      </div>
                      <span>Olympia Ripple</span>
                    </th>
                    <td>Oct 24,2018</td>
                    <td>$9,00,000.00</td>
                    <td>Dollar</td>
                    <td>001 Days Ago</td>
                  </tr>

                  <tr>
                    <th scope="row" class="d-flex">
                      <div class="user-img">
                        <img src="assets/img/user-2.jpg" alt="">
                      </div>
                      <span>Alison Rittichier</span>
                    </th>
                    <td>Oct 24,2018</td>
                    <td>$9,00,000.00</td>
                    <td>Dollar</td>
                    <td>001 Days Ago</td>
                  </tr>

                  <tr>
                    <th scope="row" class="d-flex">
                      <div class="user-img">
                        <img src="assets/img/user-3.jpg" alt="">
                      </div>
                      <span>Isreal Vandy</span>
                    </th>
                    <td>Oct 24,2018</td>
                    <td>$9,00,000.00</td>
                    <td>Dollar</td>
                    <td>001 Days Ago</td>
                  </tr>

                  <tr>
                    <th scope="row" class="d-flex">
                      <div class="user-img">
                        <img src="assets/img/user-4.jpg" alt="">
                      </div>
                      <span>Emmett Steinkellner</span>
                    </th>
                    <td>Oct 24,2018</td>
                    <td>$9,00,000.00</td>
                    <td>Dollar</td>
                    <td>001 Days Ago</td>
                  </tr>

                  <tr>
                    <th scope="row" class="d-flex">
                      <div class="user-img">
                        <img src="assets/img/user-5.jpg" alt="">
                      </div>
                      <span>Nancee Broomes</span>
                    </th>
                    <td>Oct 24,2018</td>
                    <td>$9,00,000.00</td>
                    <td>Dollar</td>
                    <td>001 Days Ago</td>
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
  <!-- transaction end -->

</div>
</template>

<script>
    export default {
        name: "UploadRank"
    }
</script>

<style scoped>

</style>
