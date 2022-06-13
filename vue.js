const app = {
  data(){
    return {
      custom_name : "",
      custom_email : "",
      custom_phone : "",
      preview_book :  books.preview_book,
      review_book : books.review_book,
    }
  },
  methods:{
    sellprice(a){
      return Math.floor(a * 0.70);
    }
  },
  computed:{

  }
}


Vue.createApp(app).mount("#box");
