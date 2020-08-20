$(function() {

    $.ajax({
        method: "get",
        url: '/my/userinfo',

        success: function(res) {
            if (res.status !== 0) {
                return alert(res.message)
            }
            // console.log(res);
            /*********欢迎*********/
            if (res.data.nickname !== "") {

                $(".welcome").html("欢迎&nbsp;&nbsp;" + res.data.nickname);
            } else {
                $(".welcome").html("欢迎&nbsp;&nbsp;" + res.data.username);
            }
            /******************头像 */
            if (res.data.user_pic !== null) {
                //  console.log(res.data.user_pic);
                $(".hp").attr("src", res.data.user_pic).show();
                $(".textHp").hide();
            } else {
                var text = res.data.username;
                //   console.log(text[0]);
                $(".textHp").html(text[0].toUpperCase());
                $(".hp").hide();
            }
        },


    });

    $("#quit").click(function() {
        layer.confirm('要滚？?', { icon: 3, title: '提示' }, function(index) {

            localStorage.removeItem("token");
            location.href = "/login.html";
            layer.close(index);
        });
    })


})