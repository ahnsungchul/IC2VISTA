$(function() {
    accoJS.init();
    rangeJS.init();
    $( "#lp-layout .lp-draggable" ).draggable({ handle: ".box-head" });
});

const gnb = {
    _target : "#gnb-layout",
    open(){
        // console.log(">>> gnb.open");
        if($(document).find(gnb._target).hasClass("show")){
            return false;
        }
        $(document).find(gnb._target).addClass("show");
        setTimeout(() => {
            $(document).find(gnb._target).addClass("active");
        }, 100);
    },
    close(){
        // console.log(">>> gnb.close");
        if(!$(document).find(gnb._target).hasClass("show")){
            return false;
        }
        $(document).find(gnb._target).removeClass("active");
        setTimeout(() => {
            $(document).find(gnb._target).removeClass("show");
        }, 200);
    }
}

const depth2 = {
    _target : "#gnb-layout .depth2-box",
    open(_this){
        // console.log(">>> gnb.open");
        if($(document).find(depth2._target).hasClass("show")){
            // return false;
            if(!$(_this).hasClass("active")){
                depth2.close();
                setTimeout(() => {
                    depth2.open(_this);
                }, 100);
            }
            return false;
        }
        $(document).find(depth2._target).addClass("show");
        setTimeout(() => {
            $(document).find("#gnb-layout .depth1-menu.active").removeClass("active");
            $(_this).addClass("active");
            $(document).find(depth2._target).addClass("active");
        }, 100);
    },
    close(){
        // console.log(">>> gnb.close");
        if(!$(document).find(depth2._target).hasClass("show")){
            return false;
        }
        $(document).find(depth2._target).removeClass("active");
        $(document).find("#gnb-layout .depth1-menu.active").removeClass("active");
        setTimeout(() => {
            $(document).find(depth2._target).removeClass("show");
        }, 100);
    }
}

const depth3 = {
    _target : "#gnb-layout .depth3-box",
    open(){
        // console.log(">>> gnb.open");
        if($(document).find(depth3._target).hasClass("show")){
            return false;
        }
        $(document).find(depth3._target).addClass("show");
        setTimeout(() => {
            $(document).find(depth3._target).addClass("active");
        }, 100);
    },
    close(){
        // console.log(">>> gnb.close");
        if(!$(document).find(depth3._target).hasClass("show")){
            return false;
        }
        $(document).find(depth3._target).removeClass("active");
        setTimeout(() => {
            $(document).find(depth3._target).removeClass("show");
        }, 100);
    }
}

const dronDetailJS = {
    _target : "#side-right-layout .dron-detail-box",
    open(_this){
        // console.log(">>> gnb.open");
        if($(document).find(dronDetailJS._target).hasClass("show")){
            if(!$(_this).hasClass("active")){
                dronDetailJS.close();
                setTimeout(() => {
                    dronDetailJS.open(_this);
                }, 100);
            }
            return false;
        }
        $(document).find(dronDetailJS._target).addClass("show");
        $(document).find(".detail-info-btn").removeClass("active");
        setTimeout(() => {
            $(_this).addClass("active");
            $(document).find(dronDetailJS._target).addClass("active");
        }, 100);
    },
    close(){
        // console.log(">>> gnb.close");
        if(!$(document).find(dronDetailJS._target).hasClass("show")){
            return false;
        }
        $(document).find(dronDetailJS._target).removeClass("active");
        $(document).find(".detail-info-btn").removeClass("active");
        setTimeout(() => {
            $(document).find(dronDetailJS._target).removeClass("show");
        }, 100);
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
        _cont.slideDown(function(){
            _target.addClass("active");
        });
    },
    hide(_this){
        // console.log(">>> accoJS.hide");

        const _target = $(_this).parents(accoJS._target);
        const _cont = _target.find(accoJS._cont);
        _cont.slideUp(function(){
            _target.removeClass("active");
        });
    }
}

const rangeJS = {
    _target : '.rangeJS',
    _val : '.rangeJS-val',
    _btn : '.rangeJS-btn',
    
    /**
     * 슬라이더의 값을 업데이트하고 관련 UI에 반영합니다.
     * @param {jQuery} $container - 현재 .rangeJS 컨테이너 요소
     * @param {number} newValue - 슬라이더에 설정할 새로운 값
     */
    updateValue: function($container, newValue) {
        const _min = $container.find(".rangeJS-slider").slider("option", "min");
        const _max = $container.find(".rangeJS-slider").slider("option", "max");

        // 최소/최대값 제한 (Clamp)
        let clampedValue = Math.min(Math.max(newValue, _min), _max);

        // 슬라이더 값 업데이트 (jQuery UI의 slider "value" 메서드는 자체적으로 min/max를 따릅니다.)
        $container.find(".rangeJS-slider").slider("value", clampedValue);

        // UI 요소 업데이트
        $container.find(rangeJS._val).val(clampedValue);
        $container.find(".rangeJS-output").text(clampedValue);
    },

    init(){
        const self = this;
        $(document).find(self._target).each(function(){
            const _this = $(this);
            const _rangeType = _this.attr("data-rangetype");
            const _rangemin = Number(_this.attr("data-rangemin"));
            const _rangemax = Number(_this.attr("data-rangemax"));
            const _rangedefault = Number(_this.attr("data-rangedefault"));
            
            // 이미 초기화된 경우 종료
            if(_this.hasClass("js")){
                return true; // continue
            }
            
            _this.addClass("js"); // 초기화 플래그 설정
            
            // 1. 슬라이더 초기화
            _this.find(".rangeJS-slider").slider({
                range: _rangeType,
                value: _rangedefault,
                min: _rangemin,
                max: _rangemax,
                
                // 슬라이딩 시 값 반영 (중복 로직을 updateValue로 대체)
                slide: function( event, ui ) {
                    // 슬라이더가 이동할 때 input과 output을 바로 업데이트
                    _this.find(self._val).val(ui.value);
                    _this.find(".rangeJS-output").text(ui.value);
                }
            });
            
            // 초기값 설정
            _this.find(self._val).val(_rangedefault);
            _this.find(".rangeJS-output").text(_rangedefault);
            
            // 2. 버튼 클릭 이벤트 바인딩
            _this.find(self._btn).on("click",function(){
                let _currentVal = Number(_this.find(self._val).val());
                let _newVal;
                
                if($(this).hasClass("rangeJS-subtract")){
                    _newVal = _currentVal - 1;
                }else if($(this).hasClass("rangeJS-add")){
                    _newVal = _currentVal + 1;
                }
                
                // updateValue 함수를 사용하여 값을 변경하고 min/max 제한을 적용
                self.updateValue(_this, _newVal); 
            });
            
            // 3. 수동 입력 필드(Input) 변경 이벤트 바인딩 (선택적)
            _this.find(self._val).on("change", function(){
                 const _inputVal = Number($(this).val());
                 self.updateValue(_this, _inputVal);
            });
        });
    }
}

const lp = {
    open(_target,_top,_left){
        $("html").addClass("lpOpen");
        const onTotal = $(document).find("#lp-layout .lp-box.on").length + 1;
        if($(document).find("#lp-layout .lp-box."+_target).hasClass("on")){
            return false;
        }
        $(document).find("#lp-layout .lp-box."+_target).addClass("on").css({"z-index":onTotal,"top":_top,"left":_left});
    },
    close(_this){
        $("html").removeClass("lpOpen");
        $(_this).parents(".lp-box").removeClass("on").removeAttr("style");
    }
}

