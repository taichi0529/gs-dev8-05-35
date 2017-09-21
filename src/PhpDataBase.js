import * as $ from "jquery";
export default class {
    constructor(){
        this.callbacks = {};
    }
    on(eventName, callback) {
        this.callbacks[eventName] = callback;
        this.loadAll();
    }
    loadAll(){
        $.ajax({
            url:"./loadAll.php",
            dataType:"json"
        }).then((data) => {
            for(let d of data){
                this.callbacks['child_added']({val:()=>{return d;}});
            }
        });
        // let data = [{"displayName":"taichiiiii","message":"hogehoge","photoURL":"","time":1506001382153,"uid":"piyohoge"}];
        // for(let d of data){
        //     this.callbacks['child_added']({val:()=>{return d;}});
        // }
    }
    push(data){
        $.ajax({
            url:"./push.php",
            dataType:"json",
            method:"POST",
            data:data
        }).then((data) => {
            this.callbacks['child_added']({val:()=>{return data;}});
        });
    }
}