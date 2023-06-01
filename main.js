import books from "./item.js"
  
let OrderList;



const app = {
    data(){
      return {
        custom_name : "",
        custom_email : "",
        custom_phone : "",
        
        books: {...books},
        bookType: "",
        bookSubject : "",

        alertTxt: "",
        alertType: "",

        orders: []
      }
    },
    methods:{
        sellPrice(price){
            return Math.ceil(price * .65);
          },
        filter(target,type){
          if(this[`book${type}`] === target.value){

            this[`book${type}`] = ""
            target.checked = !target.checked

          }
          else this[`book${type}`] = target.value;
          },
        isbookType(type){
          return this.bookType === "" ? true: type === this.bookType;
        },
        isbookSubject(sub){
          return this.bookSubject === "" ? true : sub === this.bookSubject;
        },
        doValidate(){
          if(!this.custom_name){
            this.alertType = '姓名';
            this.alertTxt = '此欄位必填';
            return  document.querySelector('#custom-name').focus()
          }else if(!this.custom_phone||!/^(\(?0[2-9]{1})\)?[0-9]{8}$|[0-9]{8}/.test(this.custom_phone)){
            this.alertType = '電話';
            this.alertTxt = "請填寫正確的電話格式";

              if(this.custom_phone === '') this.alertTxt = "此欄位必填";

              return document.querySelector('#custom-phone').focus();
            }else if(!this.custom_email || !/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/.test(this.custom_email)){
              this.alertType = '信箱';
              this.alertTxt = '信箱格式錯誤';
              
              console.log(!/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/.test(this.custom_email));

              if(this.custom_email=== '') this.alertTxt = '此欄位必填';

              return document.querySelector('#custom-email').focus()
            }
            

            if(this.alertTxt !== ''){
              const customInfo = document.querySelector('.customInfo');
              customInfo.scrollIntoView();
              }else{
                        OrderList.show();
                        this.getOrders();
              }

            },
        closeModal(){
          OrderList.hide();
        },
        getOrders(){
            this.orders = [];

            for(let i in this.books){
            if(this.books[i].num > 0) this.orders.push(this.books[i])
          }
        },
        submitOrder(){
          let params = {
            name : this.custom_name,
            email : this.custom_email,
            phone : this.custom_phone,
            products : JSON.stringify(this.orders)
          }

          $.ajax({
            type: "get",
            url: 'https://script.google.com/macros/s/AKfycbyGi6QQhpZ4W7-mMlKCSF2sz4rb-oUwm8cr1TzrdQn-oS1CTuLdQmQ989MTQqF5-h6IyA/exec',
            data:  params,
            // 資料格式是JSON
            dataType: "JSON",
            // 成功送出 會回頭觸發下面這塊感謝
            success: function(responseText) {
                console.log('responseURL:')},
            error: function (err) {
              if(err.status == 200||302){
                alert("表單已成功寄出");
              }
            }
          })

          } 
        },
    mounted(){
      OrderList = new bootstrap.Modal(document.getElementById('OrderList'));
    }

        }
  


  Vue.createApp(app).mount("#main");
  
