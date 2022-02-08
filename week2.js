import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.30/vue.esm-browser.min.js';

const site ='https://vue3-course-api.hexschool.io/v2/';
const apiPath ='jade';

const app = createApp({
  data() {
    return {
      products:[],
      tempProduct: {}

    }
  },
  methods: {
    checkLogin(){
      // 從cookie裡面取得token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // 下次發送axios時，會自動把token夾帶到headers裡面
    axios.defaults.headers.common['Authorization'] = token;
    const url =`${site}api/user/check`;
    axios.post(url)
    .then(()=>{
      this.getProducts();
    })
    },
    getProducts(){
      const url = `${site}api/${apiPath}/admin/products/all`;
      axios.get(url)
       .then(res =>{
         this.products =res.data.products;
         console.log(res)

       });
    }
  },
  mounted(){
    this.checkLogin();
  }
})

app.mount('#app')