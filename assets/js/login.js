$(function() {
    $("#go_reg").click(function() {
        $("#login").hide();
        $('#reg').show();
    })


    $("#go_login").click(function() {
        $("#login").show();
        $('#reg').hide();
    })

    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,16}$/, "请输入6-16位非空格字符"],

        repwd: function(value) {
            if ($("#reg [name=password]").val() !== value) {
                return "两次密码不一致";
            }
        }
    });
    //连接数据  ajax 注册
    var layer = layui.layer;

    $("#form_reg").submit(function(e) { //提交表单 而不是submit按钮
        //   console.log(1);
        e.preventDefault(); // 一定要阻止默认提交


        $.ajax({
            method: "post",
            url: "/api/reguser",
            data: {
                username: $("#reg [name=username]").val(),
                password: $("#reg [name=password]").val(),
            },
            success: function(res) {
                if (res.status !== 0) {
                    return alert(res.message)
                }
                layer.msg("注册成功");
                //     console.log($("#form_reg")[0]);

                $("#form_reg")[0].reset();

                $("#go_login").click();
            }
        })

    });
    //登录功能
    $("#form_login").submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: "/api/login",
            data: $("#form_login").serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //  console.log(res);
                layer.msg(res.message);
                localStorage.setItem("token", res.token);
                location.href = "/index.html"


            }
        })
    })



})