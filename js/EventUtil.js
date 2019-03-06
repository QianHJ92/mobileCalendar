var EventUtil = {
    addHandler: function (element, type, handler) {
        element.on(type,handler);
    },
    removeHandler: function (element, type, handler) {
        element.off(type,handler);
    },
    /**
     * 监听触摸的方向
     * @param target            要绑定监听的目标元素
     * @param upCallback        向上滑动的监听回调（若不关心，可以不传，或传false）
     * @param rightCallback     向右滑动的监听回调（若不关心，可以不传，或传false）
     * @param downCallback      向下滑动的监听回调（若不关心，可以不传，或传false）
     * @param leftCallback      向左滑动的监听回调（若不关心，可以不传，或传false）
     */
    listenTouchDirection: function (target, upCallback, downCallback,rightCallback, leftCallback) {
        this.addHandler(target, "touchstart", handleTouchEvent);
        this.addHandler(target, "touchend", handleTouchEvent);
        this.addHandler(target, "touchmove", handleTouchEvent);
        let startX;
        let startY;
        function handleTouchEvent(event) {
            switch (event.type){
                case "touchstart":
                    // console.log(event);
                    startX = event.originalEvent.touches[0].pageX;
                    startY = event.originalEvent.touches[0].pageY;
                    break;
                case "touchend":
                    // console.log(event);
                    let spanX = event.originalEvent.changedTouches[0].pageX - startX;
                    let spanY = event.originalEvent.changedTouches[0].pageY - startY;
                    if(Math.abs(spanX) > Math.abs(spanY)){      //认定为水平方向滑动
                        if(spanX > 30){         //向右
                            if(rightCallback)
                                rightCallback();
                        } else if(spanX < -30){ //向左
                            if(leftCallback)
                                leftCallback();
                        }
                    } else {                                    //认定为垂直方向滑动
                        if(spanY > 30){         //向下
                            if(downCallback)
                                downCallback();
                        } else if (spanY < -30) {//向上
                            if(upCallback)
                                upCallback();
                        }
                    }

                    break;
                case "touchmove":
                    //阻止默认行为
                    if (event.cancelable) {
                        // 判断默认行为是否已经被禁用
                        if (!event.defaultPrevented) {
                            event.preventDefault();
                        }
                    }
            }
        }
    }
};




