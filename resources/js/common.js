$(function() {
    accoJS.init();
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

const accoJS = {
    _target : ".accoJS",
    _btn : ".accoJS-btn",
    _cont : ".accoJS-cont",
    init(){
        // console.log(">>> accoJS.init");

        const _btn = accoJS._target+" "+accoJS._btn;
        $(document).on("click",_btn,function(){
            if($(this).parents(accoJS._target).hasClass("active")){
                accoJS.hide(this);
            }else{
                accoJS.show(this);
            }
        });
    },
    show(_this){
        // console.log(">>> accoJS.show");

        const _target = $(_this).parents(accoJS._target);
        const _cont = _target.find(accoJS._cont);
        _cont.slideDown();
        _target.addClass("active");
    },
    hide(_this){
        // console.log(">>> accoJS.hide");

        const _target = $(_this).parents(accoJS._target);
        const _cont = _target.find(accoJS._cont);
        _cont.slideUp();
        _target.removeClass("active");
    }
}