$(function() {
    accoJS.init();
    rangeJS.init();
    moveTabJS.init();
    treeJS.init();
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
            if(_this != undefined){
                $(document).find("#gnb-layout .depth1-menu.active").removeClass("active");
            }
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
        // $(document).find("#gnb-layout .depth1-menu.active").removeClass("active");
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

const routeSnack = {
    _target : "#main-layout .route-snack-box",
    open(){
        // console.log(">>> gnb.open");
        if($(document).find(routeSnack._target).hasClass("show")){
            return false;
        }
        $(document).find(routeSnack._target).addClass("show");
        setTimeout(() => {
            $(document).find(routeSnack._target).addClass("active");
        }, 100);
    },
    close(){
        // console.log(">>> gnb.close");
        if(!$(document).find(routeSnack._target).hasClass("show")){
            return false;
        }
        $(document).find(routeSnack._target).removeClass("active");
        setTimeout(() => {
            $(document).find(routeSnack._target).removeClass("show");
        }, 100);
    }
}

const dronDetailJS = {
    _target : "#aside-right-layout .dron-detail-box",
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
            const _orientation = _this.attr("data-orientation") == undefined ? "horizontal" : _this.attr("data-orientation");
            // console.log(">>> _orientation : ",_orientation);
            
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
                orientation:_orientation,
                
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
        const _thisPop = $(document).find("#lp-layout .lp-box."+_target);
        const _onPop = $(document).find("#lp-layout .lp-box.on");
        const _onTotal = _onPop.length;
        let _zIndex = _onTotal + 1;
        if(_thisPop.hasClass("on")){
            return false;
        }
        let _arr = [];
        if(_onTotal > 0){
            _onPop.each(function(){
                _arr.push($(this).css("z-index"));
            });
            console.log(">>> _arr : ",_arr);
            console.log(">>> _arr : ",Math.max(..._arr));
            _zIndex = Math.max(..._arr) + 1;
        }

        _thisPop.addClass("on");
        const _browserH = $(document).innerHeight();
        let _popH = _thisPop.innerHeight();
        const _headH = _thisPop.find(".box-head").innerHeight();
        const _footH = _thisPop.find(".box-foot").innerHeight();
        const _body = _thisPop.find(".box-body");
        if(_browserH < _popH){
            _body.innerHeight(_browserH - _headH - _footH - 40);
        }
        _popH = _thisPop.innerHeight();
        const _browserW = $(document).innerWidth();
        const _popW = _thisPop.innerWidth();
        const topVal = _top || ((_browserH - _popH) / 2);
        const leftVal = _left || ((_browserW - _popW) / 2);
        _thisPop.css({"z-index":_zIndex,"top":topVal,"left":leftVal});
        if(_thisPop.hasClass("draggableJS")){
            $( "#lp-layout .draggableJS" ).draggable();
        }
    },
    close(_this){
        if($(document).find("#lp-layout > .on").length == 1){
            $("html").removeClass("lpOpen");
        }
        $(_this).parents(".lp-box").removeClass("on").removeAttr("style");
    }
}

const videoSplitJS = {
    _target : '#main-video-box',
    _screenBox : '.screen-split-box',
    select(_this){
        $(this._target).find(this._screenBox).removeClass("on");
        $(this._target).find(this._screenBox + "." + $(_this).val()).addClass("on");
    }
}

const moveTabJS = {
    _target : '.moveTabJS',      // 전체 컨테이너
    _btnTab : '.btn-tab',    // 탭 개별 버튼
    _btnCon : '.tab-con',    // 탭 콘텐츠 박스
    _btnLeft : '.tab-left',  // 왼쪽 이동 버튼
    _btnRight : '.tab-right',// 오른쪽 이동 버튼
    _tabWrap : '.tab-btn', // 버튼들을 감싸고 있는 스크롤 영역

    init() {
        const self = this;

        // 1. 탭 버튼 클릭 이벤트 (위임 방식)
        $(document).on("click", `${self._target} ${self._btnTab}`, function(e) {
            e.preventDefault();
            const $btn = $(this);
            const $container = $btn.closest(self._target);
            const idx = $btn.index();

            self.switchTab($container, idx);
        });
        
        // 2. 왼쪽 버튼 클릭 (이전 탭으로)
        $(document).on("click", `${self._target} ${self._btnLeft}`, function() {
            const $container = $(this).closest(self._target);
            self.moveTab($container, 'prev');
        });

        // 3. 오른쪽 버튼 클릭 (다음 탭으로)
        $(document).on("click", `${self._target} ${self._btnRight}`, function() {
            const $container = $(this).closest(self._target);
            self.moveTab($container, 'next');
        });

        // 초기화: 첫 번째 탭 활성화
        $(self._target).each(function() {
            self.switchTab($(this), 0);
        });
    },

    // 탭 전환 로직
    switchTab($container, idx) {
        // 버튼 활성화
        $container.find(this._btnTab).removeClass("on").eq(idx).addClass("on");
        
        // 콘텐츠 활성화
        const $targetCon = $container.find(this._btnCon);
        $targetCon.removeClass("on").eq(idx).addClass("on");

        // [연결] 탭 내부의 Swiper나 다른 JS가 있다면 재실행 (이전 slideBtnTabJS 활용)
        if (typeof slideBtnTabJS !== 'undefined') {
            slideBtnTabJS.init(); 
            // 또는 특정 인스턴스 업데이트: slideBtnTabJS.reUpdate($targetCon.eq(idx).find('.slideBtnTabJS'));
        }
    },

    // 인덱스를 계산하여 탭을 이동시키는 함수 (순환 로직 포함)
    moveTab($container, direction) {
        const $tabs = $container.find(this._btnTab);
        const total = $tabs.length;
        // 현재 활성화된('on' 클래스가 있는) 버튼의 인덱스를 찾음
        const currentIdx = $tabs.filter('.on').index();
        let nextIdx;

        if (direction === 'prev') {
            // 이전으로: 0에서 누르면 마지막 인덱스로 (순환)
            nextIdx = (currentIdx - 1 + total) % total;
        } else {
            // 다음으로: 마지막에서 누르면 0으로 (순환)
            nextIdx = (currentIdx + 1) % total;
        }

        this.switchTab($container, nextIdx);
    },
};

const treeJS = {
    _target : '.treeJS',
    init(){
        const _self = this;
        $(document).find(_self._target).each(function(){
            if($(this).hasClass("js")){
                return false;
            }
            $("#test").jstree();
            $(this).addClass("js");
        });
    }
}

const videoSelectJS = {
    _target: ".videoSelectJS",

    select: function(_this) { // _this는 HTML 요소(버튼 등)입니다.
        const _self = this;
        const $btn = $(_this); // 전달받은 요소를 jQuery 객체로 변환
        const $root = $btn.parents(_self._target);
        const $video = $root.find(".video video"); // video 태그 선택
        const $source = $video.find("source"); // 내부 source 태그 선택
        const newSrc = $btn.val(); // 새로 선택된 비디오 경로
        
        // 1. 실제 비디오 DOM 요소 가져오기
        const videoElement = $video.get(0);

        // 2. 소스 변경 및 로드
        $source.attr("src", newSrc);
        videoElement.load(); // 새로운 소스를 비디오 객체에 불러옵니다.

        // 3. 로드 후 즉시 정지 및 처음으로 이동
        videoElement.pause();      // 일시 정지
        videoElement.currentTime = 0; // 재생 시간을 0초(처음)로 초기화
    },
    mov: function(_this) {
        const _self = this;
        const $root = $(_this).parents(_self._target);
        // 클릭한 요소의 부모 클래스로 방향 판단
        const $mov = $(_this).parent().hasClass("fixed-tool-btnL") ? "left" : "right";
        const $list = $root.find(".list .video-chk");
        const $label = $list.find("label");
        
        // 1. 현재 체크된 라벨의 인덱스 (0부터 시작)
        const $currentIndex = $list.find("label:has(input:checked)").index();
        
        let $nextIndex = 0;

        if ($mov == "right") {
            // [오른쪽 이동] 다음 인덱스 계산
            $nextIndex = $currentIndex + 1;
            // 마지막 항목을 넘어가면 다시 0번으로
            if ($nextIndex >= $label.length) {
                $nextIndex = 0;
            }
        } else {
            // [왼쪽 이동] 이전 인덱스 계산
            $nextIndex = $currentIndex - 1;
            // 0보다 작아지면(즉, -1이 되면) 마지막 항목으로 이동
            if ($nextIndex < 0) {
                $nextIndex = $label.length - 1; // 인덱스는 length보다 1 작아야 합니다.
            }
        }

        console.log(">>> 이동 방향:", $mov, "| 이동할 인덱스:", $nextIndex);

        // 2. 계산된 인덱스의 input을 찾아서 체크
        const $nextInput = $label.eq($nextIndex).find("input");
        $nextInput.prop("checked", true);

        // 3. 비디오 소스 교체 함수 호출
        _self.select($nextInput); 
    }
};