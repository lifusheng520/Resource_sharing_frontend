import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh'
import en from './en'

Vue.use(VueI18n)


// 获取浏览器语言 → 映射成我们支持的语言
function getBrowserLang() {
  let lang = (navigator.language || navigator.userLanguage || 'zh').toLowerCase()
  if (lang.includes('zh')) return 'zh'
  else return 'en' // 其他一律默认英文
}

// 优先使用用户之前选择的语言设置
const savedLanguageSetting = localStorage.getItem('locale')
const defaultLang = savedLanguageSetting || getBrowserLang()


const i18n = new VueI18n({
  //其实切换中英文的核心，就是：改变当前语言（locale），然后所有用 $t('xxx') 的文本会自动重新计算。
  //this.$i18n.locale = 'en'
  locale: defaultLang,       // 默认语言：中文
  fallbackLocale: 'zh',
  messages: {
    zh,
    en
  }
})

export default i18n