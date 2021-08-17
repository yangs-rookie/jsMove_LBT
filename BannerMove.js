function startMove(ele,eleJson,fn) {
    clearInterval(ele.timer);
    ele.timer = setInterval(function(){
        let flag = true;
        for(let attr in eleJson){
            // 1. 取当前值
            let curValue = 0;
            if(attr == 'opacity'){
                curValue = Math.round(parseFloat(getStyle(ele,attr))*100);
            }
            else if(attr == 'transform') {
                curValue = getStyle(ele,attr);
                curValue = parseInt(curValue.toString(7).split(',')[4]);
            }
            else{
                curValue = parseInt(getStyle(ele,attr));
            }
            // 2. 算速度
            let curSpeed = (eleJson[attr] - curValue) / 10;
            curSpeed = curSpeed > 0 ? Math.ceil(curSpeed) : Math.floor(curSpeed);
            // 3. 检测停止
            if(curValue != eleJson[attr]){
                flag = false;
            }
            // 4. 物体运动
            if(attr == 'opacity'){
                ele.style.opacity = (curValue + curSpeed) / 100;
            }
            else if(attr == 'transform'){
                ele.style[attr] = 'translate('+ (curValue + curSpeed) + 'px)';
            }
            else{
                ele.style[attr] = curValue + curSpeed + 'px';
            }

        }
        if(flag) {
            clearInterval(ele.timer);
            if(fn){
                fn();
            }
        }
    },30)
}

function getStyle(ele,attr) {
    if(ele.currentStyle){
        return ele.currentStyle[attr];
    }else{
        return getComputedStyle(ele,null)[attr];
    }
}