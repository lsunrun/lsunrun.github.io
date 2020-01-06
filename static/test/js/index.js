/**
 * 调试模式
 * @param 1：开启 0：关闭
 */
var DEBUG = 1;

var HOST = "http://101.37.21.221";
// var HOST = "https://usercenter2.i4.cn";
var api = {
    // 活动信息
    getActivityInfo: HOST + "/newyear/info/getActivityInfo.go",
    // 领取福袋
    getCakePiece: HOST + "/newyear/info/getCakePiece.go",
    // 分享翻倍
    getShareCakePiece: HOST + "/newyear/info/getShareCakePiece.go",
    // 领取红包
    getNewYearLuckyMoney: HOST + "/newyear/info/getNewYearLuckyMoney.go",
};
// 是否在爱思助手中浏览
var IS_I4TOOLS = window.navigator.userAgent.toLowerCase().includes("i4tools");

/**
 * ajax请求封装
 * @param {String} url 
 * @param {JSON} param 参数
 * @param {Function} successCB  成功回调
 * @param {Function} errorCB  失败回调
 */
var ajaxs = function (url, param, successCB, errorCB) {
    var dataType = DEBUG ? 'jsonp' : 'json';
    var type = DEBUG ? 'GET' : 'POST';
    var settings = {
        url: url,
        data: param,
        timeout: 10000, //超时时间设置，单位毫秒
        cache: true,
        type: type,
        dataType: dataType,
        success: function (data) {
            if (successCB) {
                successCB(data);
            }
        },
        error: function (errorObj) {
            if (errorCB) {
                errorCB(errorObj);
            }
        }
    }
    return $.ajax(settings);

}
/**
 * 发送ajax跨域请求包装
 * @param {String} url 
 * @param {JSON} param 参数
 * @param {Function} successCB  成功回调
 * @param {Function} errorCB  失败回调
 */
var ajaxJsonps = function (url, param, successCB, errorCB) {
    var settings = {
        url: url,
        data: param,
        timeout: 10000, //超时时间设置，单位毫秒
        cache: false,
        type: "GET",
        dataType: "jsonp",
        jsonp: "jsoncallback",
        success: function (data) {
            if (successCB) {
                successCB(data);
            }
        },
        error: function (errorObj) {
            if (errorCB) {
                errorCB(errorObj);
            }
        }
    }
    $.ajax(settings);
}




var userTime = null;
var i4Tools = {};

i4Tools.startTime17 = 1579190400000; //z2020-01-17 00:00:00

i4Tools.endTime23 = 1579795199000; //2020-01-23 23:59:59

i4Tools.startTime24 = 1579795200000; //2020-01-24 00:00:00
i4Tools.endTime24 = 1579881599000; //2020-01-24 23:59:59

i4Tools.startTime25 = 1579881600000; //2020-01-25 00:00:00
i4Tools.endTime25 = 1579967999000; //2020-01-25 23:59:59

i4Tools.startTime26 = 1579968000000; //2020-01-26 00:00:00
i4Tools.endTime26 = 1580054399000; //2020-01-26 23:59:59

i4Tools.startTime27 = 1580054400000; //2020-01-27 00:00:00
i4Tools.endTime27 = 1580140799000; //2020-01-27 23:59:59

i4Tools.startTime28 = 1580140800000; //2020-01-28 00:00:00
i4Tools.endTime28 = 1580227199000; //2020-01-28 23:59:59

i4Tools.startTime29 = 1580227200000; //2020-01-29 00:00:00
i4Tools.endTime29 = 1580313599000; //2020-01-29 23:59:59

i4Tools.startTime30 = 1580313600000; //2020-01-30 23:59:59
i4Tools.endTime30 = 1580399999000; //2020-01-30 23:59:59

i4Tools.endTime202 = 1580659199000; //2020-02-02 23:59:59
/**
 * 登录用户信息
 */
i4Tools.userJson = null;
/**
 * 福袋信息
 */
i4Tools.luckybag = null;
/**
 * 新年红包信息
 */
i4Tools.luckymoney = null;
/**
 * 系统时间 默认：获取本地时间
 */
i4Tools.serveTime = new Date().getTime();
/**
 * 用户分享 0：未分享  1：已分享
 */
i4Tools.sharea = null;
/**
 * 调用客户端
 * @param {*} code 1:活动分享 2:登录 3:爱思游戏 4:充值
 */
i4Tools.toLocation = function (code) {
    var hrefText = null;
    switch (code) {
        case 1:
            hrefText = "share.action";
            break;
        case 2:
            hrefText = "login.action";
            break;
        case 3:
            hrefText = "i4game.action";
            break;
        case 4:
            hrefText = "recharge.action";
            break;
    }

    window.location.href = hrefText;
}
/**
 * 分享成功
 */
i4Tools.shareFun = function () {

}
/**
 * 验证爱思助手
 */
i4Tools.checkStatus = function () {
    if (!IS_I4TOOLS) {
        i4Tools.alert("请前往爱思助手加强版中参与活动");
        return true;
    }
}
/**
 * 活动信息 
 */
i4Tools.getActivityInfo = function () {
    // ajaxs(api.getActivityInfo + "?json=" + i4Tools.userJson + "&userid=" + 1, null, function (rs) {
    //     // 系统时间
    //     i4Tools.serveTime = rs.timemillis;
    //     // 福袋信息
    //     i4Tools.luckybag = rs.luckybag;
    //     // 新年红包
    //     i4Tools.luckymoney = rs.luckymoney;

    //     if(i4Tools.luckybag.flag == 0){
    //         i4Tools.sharea = rs.luckybag;
    //     }

    //     i4Tools.updateActionStatus();
    //     console.log("活动信息如下:");
    //     console.log(rs);
    // }, function () {

    // });
};
/**
 * 领取福袋
 */
i4Tools.getCakePiece = function (su) {
    ajaxs(api.getCakePiece + "?json=" + i4Tools.userJson + "&userid=" + 2, null, function (rs) {
        console.log("领取福袋如下:");
        console.log(rs);
        rs = '{"code":0,"message":"领取成功","data":{"score":100,"usershare":"0"}}'
        rs = JSON.parse(rs);
        if (rs.code != 0) {
            i4Tools.alert(rs.message);
            return;
        }

        i4Tools.sharea = rs.data.usershare;
        if (su) { su(rs.data); }
    }, function () {

    });
}
/**
 * 分享翻倍
 */
i4Tools.getShareCakePiece = function () {
    ajaxs(api.getShareCakePiece + "?json=" + i4Tools.userJson + "&userid=" + 1, null, function (rs) {
        console.log("分享翻倍如下:");
        console.log(rs);
    }, function () {

    });
}
/**
 * 领取红包
 */
i4Tools.getNewYearLuckyMoney = function () {
    ajaxs(api.getNewYearLuckyMoney + "?json=" + i4Tools.userJson + "&userid=" + 5, null, function (rs) {
        console.log("领取红包如下:");
        console.log(rs);
        if (rs.code != 0) {
            i4Tools.alert(rs.message);
            return;
        }
        i4Tools.addNoScroll();
        $(".m-shade-coupon").addClass("active");
        $(".m-shade-coupon .name").text(rs.data.name);
        $(".m-shade-coupon .precondition").text(rs.data.precondition);
    }, function () {

    });
};
/**
 * 获取排行榜数据
 */
i4Tools.gift_newTopMembers = function () {
    ajaxJsonps('https://pay.i4.cn/gift_newTopMembers.action?appId=0&beginDay=2019-11-11&endDay=2019-11-13', null, function (rs) {
        console.log("排行榜数据如下:");
        console.log(rs);
    }, function (e) {
    });
};
/**
 * 提示弹出框
 * @param {*} text 
 */
i4Tools.alert = function (text) {
    i4Tools.addNoScroll();
    $(".m-shade-alert").addClass("active");
    $(".m-shade-alert p").text(text);
};
/**
 * 更新页面活动状态
 */
i4Tools.updateActionStatus = function () {
    // i4Tools.serveTime = i4Tools.endTime202;
    if (i4Tools.serveTime < i4Tools.startTime24) {
        return;
    }
    // 01.24 活动进行中
    if (i4Tools.serveTime >= i4Tools.startTime24 && i4Tools.serveTime <= i4Tools.endTime24) {
        $(".m-activeState .state24").addClass("active");
        return;
    } else {
        $(".m-activeState .state24").addClass("active");
        $(".m-activeState .state24").addClass("no-state");
    }
    // 01.25 活动进行中
    if (i4Tools.serveTime >= i4Tools.startTime25 && i4Tools.serveTime <= i4Tools.endTime25) {
        $(".m-activeState .state25").addClass("active");
        return;
    } else {
        $(".m-activeState .state25").addClass("active");
        $(".m-activeState .state25").addClass("no-state");
    }
    // 01.26 活动进行中
    if (i4Tools.serveTime >= i4Tools.startTime26 && i4Tools.serveTime <= i4Tools.endTime26) {
        $(".m-activeState .state26").addClass("active");
        return;
    } else {
        $(".m-activeState .state26").addClass("active");
        $(".m-activeState .state26").addClass("no-state");
    }
    // 01.27 活动进行中
    if (i4Tools.serveTime >= i4Tools.startTime27 && i4Tools.serveTime <= i4Tools.endTime27) {
        $(".m-activeState .state27").addClass("active");
        return;
    } else {
        $(".m-activeState .state27").addClass("active");
        $(".m-activeState .state27").addClass("no-state");
    }
    // 01.28 活动进行中
    if (i4Tools.serveTime >= i4Tools.startTime28 && i4Tools.serveTime <= i4Tools.endTime28) {
        $(".m-activeState .state28").addClass("active");
        return;
    } else {
        $(".m-activeState .state28").addClass("active");
        $(".m-activeState .state28").addClass("no-state");
    }
    // 01.29 活动进行中
    if (i4Tools.serveTime >= i4Tools.startTime29 && i4Tools.serveTime <= i4Tools.endTime29) {
        $(".m-activeState .state29").addClass("active");
        return;
    } else {
        $(".m-activeState .state29").addClass("active");
        $(".m-activeState .state29").addClass("no-state");
    }
    // 01.30 活动进行中
    if (i4Tools.serveTime >= i4Tools.startTime30 && i4Tools.serveTime <= i4Tools.endTime30) {
        $(".m-activeState .state30").addClass("active");
        return;
    } else {
        $(".m-activeState .state30").addClass("active");
        $(".m-activeState .state30").addClass("no-state");
    }
}

i4Tools.initClick = function () {
    /**
     * 积分充值跳转
     */
    $(".m-activeState .fl").click(function () {
        if ($(this).hasClass("no-state")) {
            return;
        }
        if ($(this).hasClass("active")) {
            // if (i4Tools.checkStatus()) { return; }
            // if (i4Tools.userJson == null) {
            //     i4Tools.toLocation(2);
            //     return;
            // }
            i4Tools.toLocation(4);
        }
    });
    /**
     * 打开福袋
     */
    $(".m-luckyBag .u-clickBt").click(function () {
        // if (i4Tools.checkStatus()) { return; }
        // if (i4Tools.userJson == null) {
        //     i4Tools.toLocation(2);
        //     return;
        // }
        // // 活动未开始
        // if (i4Tools.serveTime < i4Tools.startTime17) {
        //     i4Tools.alert("活动未开始");
        //     return;
        // }
        // // 活动已结束中
        // if (i4Tools.serveTime > i4Tools.endTime23) {
        //     i4Tools.alert("活动已结束");
        //     return;
        // }
        // if (i4Tools.luckybag != null) {
        //     if (i4Tools.luckybag.userflag == 1) {
        //         i4Tools.alert("您已经参与过活动了");
        //         return;
        //     }
        // }
        i4Tools.getCakePiece(function (data) {
            i4Tools.addNoScroll();
            $(".m-shade-luckyBag").addClass("active");
            $(".m-shade-luckyBag .luckyBag-box span").text(data.score);

            $(".m-shade-luckyBag .luckyBag-box").addClass("cc");
            setTimeout(function () {
                $(".m-shade-luckyBag .u-luckyBag-box").addClass("xxc");
            }, 900)
            // setTimeout(function () {
            //     // $(".m-shade-luckyBag .luckyBag-box").addClass("anim");
            //     setTimeout(function () {
            //         $(".m-shade-luckyBag .close").show();
            //         $(".m-shade-luckyBag .u-clickBt").css("display","block");
            //     }, 600);
            // }, 100);

        });
    });
    /**
     * 分享
     */
    $(".m-topBg .u-share").click(function () {
        if (i4Tools.checkStatus()) { return; }
        i4Tools.toLocation(1);
    });
    /**
     * 领取红包
     */
    $(".m-redPacket .u-clickBt").click(function () {
        i4Tools.getNewYearLuckyMoney();
    });

    $(".m-shade-alert a").click(function () {
        $(".m-shade").removeClass("active");
        i4Tools.removeNoScroll();
    });
    // 分享积分翻倍
    $(".m-shade-luckyBag .u-clickBt").click(function () {

    });
    // 
    $(".m-shade .close").click(function () {
        $(".m-shade-luckyBag .luckyBag-box").removeClass("anim");
        $(".m-shade-luckyBag .close").hide();
        $(".m-shade-luckyBag .u-clickBt").hide();
        $(".m-shade").removeClass("active");
        i4Tools.removeNoScroll();
    });
    // 查看奖品
    $(".m-ranking .u-clickBt").click(function () {
        i4Tools.addNoScroll();
        $(".m-shade-prize").addClass("active");

    });
    // 取消规则弹出框
    $(".m-shade-rule .u-clickBt").click(function () {
        $(".m-shade-rule").removeClass("active");
        $(".m-shade-rule img").removeClass("active");
        $(".explaiImg").scrollTop(0);
        i4Tools.removeNoScroll();
    });
    // 规则点击
    $(".u-rule").click(function () {
        i4Tools.addNoScroll();
        $(".m-shade-rule").addClass("active");
        var val = $(this).attr("data-val");
        $(".explaiImg img").eq(val - 1).addClass("active");

    });
    // 复制爱思助手
    $(".i4tool").click(function () {
        window['webkit'].messageHandlers.reactNative.postMessage({ QRcodeData: { type: 2, value: "i4tool", text: "请打开「微信→搜索→粘贴→搜一搜→关注」", title: "复制成功" } });
    });
    // 复制爱思游戏
    $(".i4Game").click(function () {
        window['webkit'].messageHandlers.reactNative.postMessage({ QRcodeData: { type: 2, value: "i4games", text: "请打开「微信→搜索→粘贴→搜一搜→关注」", title: "复制成功" } });
    });
}

/**
 * 弹出遮罩 禁止body滚动
 */
i4Tools.addNoScroll = function () {
    var scrollTop = $("main").scrollTop();
    $("main").css("overflow", "hidden");
    var events = navigator.userAgent;
    if (events.indexOf('iPhone') > -1) {
        //根据尺寸进行判断 苹果的型号
        if (screen.height <= 667) {
            $("main").css("position", "fixed");
        }
    }
    $("main").attr("data-top", scrollTop);
}
/**
 * 弹出遮罩 恢复body滚动
 */
i4Tools.removeNoScroll = function () {
    var top = $("main").attr("data-top");
    $("main").removeAttr("style");
    $("main").scrollTop(top);
    $("body").scrollTop(top);
}

// 奖品轮播图
new Swiper('#prizeSwiper', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }, on: {
        slideChangeTransitionStart: function () {
            var index = this.realIndex;
            var name = "iPhone11 Pro 256GB";
            var ranking = "第 1 名";
            if (index == 0) {
                name = "iPhone11 Pro 256GB";
                ranking = "第 1 名";
            } else if (index == 1) {
                name = "iPhone11 64GB";
                ranking = "第 2 名";
            } else if (index == 2) {
                name = "iPad 32GB(2019款)";
                ranking = "第 3 名";
            } else if (index == 3) {
                name = "Apple AirPods2(配充电盒)";
                ranking = "第 4-6 名";
            } else if (index == 4) {
                name = "Kindle 电子书";
                ranking = "第 7-10 名";
            } else if (index == 5) {
                name = "京东卡500";
                ranking = "第 11-50 名";
            } else if (index == 6) {
                name = "天猫精灵";
                ranking = "第 51-100 名";
            }
            $(".m-shade-prize p").html(ranking);
            $(".m-shade-prize span").html(name);
        },
    },
    loop: true
});
+function wxstart() {
    // 分享相关

}();

/**
 * 客户端 分享成功回调
 */
function shareSuccess() {
    i4Tools.shareFun();
}
try {
    // 监听客户端回调消息
    window['userInfoCallback'] = function (params) {
        var data = JSON.parse(params);
        // 用户已登录   
        if (data.username) {
            clearInterval(userTime);
            i4Tools.userJson = data.uid;

            // 获取活动信息
            i4Tools.getActivityInfo();
        } else {
            i4Tools.userJson = null;
        }
    };
} catch (error) {

}
// 校验是否登录
function checkLogn() {
    try {
        // 发送消息
        if (window['webkit']) {
            window['webkit'].messageHandlers.reactNative.postMessage({
                data: {
                    action: 'userInfo',
                    callback: 'userInfoCallback'
                }
            });
        }
    } catch (error) {
    }
};
// 轮询监听 客户端是否登录
userTime = setInterval(function () {
    checkLogn();
}, 1000);
checkLogn();

i4Tools.initClick();
i4Tools.updateActionStatus();

i4Tools.getActivityInfo();
// i4Tools.getShareCakePiece();
// 
// i4Tools.gift_newTopMembers();