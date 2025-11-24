<template>

  <div>
    <!-- footer  页脚开始-->
    <footer class="footer mt-0 investment-page">
      <div class="container">
        <div class="row">
          <div class="col-xl-5 col-lg-5 col-md-6">
            <div class="about-area">
              <a v-on:click="goIndexPage">
                <img src="static/img/logo.png" alt="">
              </a>
              <p>{{ $t('footer.introduction') }}</p>
            </div>
            <div class="social">
              <a href="#"><i class="fab fa-qq"></i></a>
              <a href="#"><i class="fab fa-weixin"></i></a>
              <a href="#"><i class="fab fa-apple"></i></a>
              <a href="#"><i class="fab fa-linux"></i></a>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6">
            <div class="links">
              <h3>{{$t('footer.friendlyLinks')}}</h3>
              <ul>
                <li>
                  <a href="#">{{ $t('footer.link1') }}</a>
                </li>
                <li>
                  <a href="#">{{ $t('footer.link2') }}</a>
                </li>
                <li>
                  <a href="#">{{ $t('footer.link3') }}</a>
                </li>
                <li>
                  <a href="#">{{ $t('footer.link4') }}</a>
                </li>
                <li>
                  <a href="#">{{ $t('footer.link5') }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6">
            <div class="links">
              <h3>{{ $t('footer.aboutUs') }}</h3>
              <ul>
                <li>
                  <a href="#">{{ $t('footer.devlopers') }}</a>
                </li>
                <li>
                  <a href="#">{{ $t('footer.systemIntroduction') }}</a>
                </li>
                <li>
                  <a href="#">{{ $t('footer.contactUs') }}</a>
                </li>
                <li>
                  <a href="#">{{ $t('footer.techiqueSupport') }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-6">
            <div class="address">
              <h3>{{ $t('footer.contactUs') }}</h3>
              <ul>
                <li>
                  {{ $t('footer.address') }} (
                  {{ $t('footer.campus') }} )
                </li>
                <li>
                  {{ $t('footer.email1') }}
                </li>
                <li>
                  {{ $t('footer.email2') }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-12 col-lg-12 text-center">
            <div class="copyright">
              <p>© 2022. {{ $t('footer.rightReserved') }} <a href="#" title="baigei.com">{{ $t('footer.websiteName') }}</a>&nbsp;&nbsp;|&nbsp;&nbsp;{{ $t('footer.privacyPolicy') }}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <!-- footer  页脚结束 -->
  </div>

</template>

<script>

  export default {
    name: "Footer",
    methods: {
      goIndexPage() {
        if (this.$route.path != '/') {
          this.$router.push('/');
        }
      }
    }
  }
</script>

<style scoped>

</style>
