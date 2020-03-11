
// 动态设置根大小 以致 rem
var resizeFun = function () {
    document.documentElement.style.fontSize =
        (document.documentElement.clientWidth / 750) * 100 + 'px';
}
resizeFun();

var resizeId = null;

window.onresize = function () {
    clearTimeout(resizeId);
    resizeId = setTimeout(resizeFun, 30);
}

window.addEventListener("load", resizeFun, false);//false 是默认的 可以不写

var common = {
    /**
     * 展示弹窗
     */
    showBasePopup: function (data, Fun, cancelFun) {
        var mask = document.createElement('div');
        mask.className = 'm-mask';
        var popup = ''
        popup += '  <div class="m-basePopup">';
        popup += '     <a class="m-close close">X</a>';
        popup += '     <div class="m-wrapPopup">';
        popup += data.tip || '';
        popup += '      </div>';
        if (data.btn) {
            popup += '          <div class="m-wrap-btn">';
            popup += '              <button style="' + (data.sureBtn ? '' : 'display:none') + '">' + (data.sureBtn || "确定") + '</button>';
            popup += '              <button style="' + (data.cancelBtn ? '' : 'display:none') + '">' + (data.cancelBtn || "取消") + '</button>';
            popup += '          </div>';
        }
        popup += '  </div>';
        mask.innerHTML = popup;
        document.body.appendChild(mask);

        //关闭弹窗
        document.getElementsByClassName('m-close')[0].onclick = function () {
            common.closeMask();
        }
        if (data.btn) {
            var queryBtn = document.getElementsByClassName('m-wrap-btn')[0].getElementsByTagName('button');
            queryBtn[0].onclick = function () {
                if (Fun) Fun();
            }
            queryBtn[1].onclick = function () {
                common.closeMask();
                if (cancelFun) cancelFun();
            }
            if (data.sureBtn && data.cancelBtn) queryBtn[0].style.marginRight = 20 / 100 / (document.documentElement.clientWidth / 750) + 'rem';
        }

    },
    /**
     * 关闭弹窗
     */
    closeMask: function () {
        document.body.removeChild(document.getElementsByClassName("m-mask")[0]);
    },
    // 输入框身份证正则
    checkCard = function (value) {

        if (/(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|[Xx])$)/g.test(value)) {
            $(".nocard").hide();
        } else {
            $(".nocard").show();
        }
    },
    // 输入框正则中文加·
    checkName = function (value) {
        if (/^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/g.test(value)) {
            $(".noname").hide();
        } else {
            $(".noname").show();
        }
    },
    // 输入框正则
    input = function () {
        $("#userName").on("input propertychange", function () {
            if (this.value == '' || this.value == undefined || this.value == null) {
                $(".noname").hide();
                return;
            }
            Fun.showerrorx(0);
        })

        $("#userName").on("blur", function () {
            window.scrollTo(0, 0);//苹果弹起输入面板收回时 需要重置
            if (this.value == '' || this.value == undefined || this.value == null) {
                $(".noname").hide();
                return;
            }
            Fun.checkName(this.value);
        })



        $('#card').on("input propertychange", function () {
            if (this.value == '' || this.value == undefined || this.value == null) {
                $(".nocard").hide();
                return false
            }
            if (!(/^\d+[xX]{0,1}$/g.test(this.value))) {
                this.value = '';
                return false
            }
            Fun.showerrorx(1);

        })

        $('#card').on("blur", function () {
            window.scrollTo(0, 0);
            if (this.value == '' || this.value == undefined || this.value == null) {
                $(".nocard").hide();
                return;
            }
            Fun.checkCard(this.value);
        })

    },
    //显示输入框的清除按钮
    showerrorx = function (index) {
        $(".errorx").eq(index).show();
    }
}

