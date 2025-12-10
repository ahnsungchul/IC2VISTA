$(function() {

});

const gnb = {
    _target : "#gnb-layout",
    open(){
        // console.log(">>> gnb.open");
        if($(document).find(this._target).hasClass("show")){
            return false;
        }
        $(document).find(this._target).addClass("show");
        setTimeout(() => {
            $(document).find(this._target).addClass("active");
        }, 100);
    },
    close(){
        // console.log(">>> gnb.close");
        if(!$(document).find(this._target).hasClass("show")){
            return false;
        }
        $(document).find(this._target).removeClass("active");
        setTimeout(() => {
            $(document).find(this._target).removeClass("show");
        }, 200);
    }
}