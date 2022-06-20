const app = {
  data(){
    return {
      custom_name : "",
      custom_email : "",
      custom_phone : "",
      preview_book :  books.preview_book,
      review_book : books.review_book,
      fliter_subject: "",
      selectedbook: [],
    }
  },
  methods:{
    sellprice(a){
      return Math.round(a * 0.7);
    },
    subject(res){
      const subject = this.fliter_subject;
      return subject == "" ? true:res.subject == subject;
    },
    selectbook(){
      this.selectedbook = [];
      const books = this.preview_book.concat(this.review_book);

      books.filter(res=> res.num > 0)
      .forEach(book=>this.selectedbook.push(`${book.bookname} * ${book.num}本  ${Math.round(book.price*0.7*book.num)}元`));
    },

      submitdata(){
let url ="https://script.google.com/macros/s/AKfycbz_-GTPg7ljMH_59Or_OSldc9MW1vg8K3Pdg2IQ3X8lz31KUmlrPv4rRco7953rK4aF-w/exec";
let data = {
  name : this.custom_name,
  phone : this.custom_phone,
  email : this.custom_email,
  select: this.selectedbook.join("\n"),
  total: this.total,
  list: JSON.stringify(this.selectedbook),
  lengths: this.selectedbook.length
}
// check data vailded
if(data.name==""||data.phone==""||data.email==""){
  alert("請填寫個人資訊");
  window.scrollTo(0,0);
  $(".focus").focus();
  return false;
}else if(data.total === 0){
  alert("未選擇品項 不予統計");
  return false
}








        console.log(data);
        $.ajax({
              type: "get",
              url: url,
              data:  data,
              // 資料格式是JSON
              dataType: "text",
              // 成功送出 會回頭觸發下面這塊感謝
              success: function(responseText) {
                  console.log('responseURL:')},

              error: function (err) {
                if(err.status == 200||302){
                  alert("表單已成功寄出");
                  // window.location.reload()
                  setTimeout(function(){
                    document.write("訂單已完成,感謝您的訂購");
                  },3000)
                }
                console.log(err.status,12346);
              }
            })
      }
    },

  computed:{
    total(){
      if(this.selectedbook == []){
        return 0
      }else{
        let books = this.review_book.concat(this.preview_book).filter(book=>book.num>0);
        let total = 0;
        for(let i=0;i<books.length;i++){
          total += Math.round(books[i].price * 0.7 * books[i].num);
        }
        return total;
      }
    }
  }
}


Vue.createApp(app).mount("#box");
