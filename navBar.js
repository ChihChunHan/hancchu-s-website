// // cursor tracer
// $(document).mousemove(function (e) {
//     $('.tail').css({ left: e.pageX, top: e.pageY })
// })

// rwd navBar

let show = 0;
$(document).ready(() => {
    
    //navbar init

    let width = ($(window).width() > 992) ? "lg" : "sm";
    $('.closeIcon').hide();
    
    if (width == "lg") {
        $('.navBar').addClass('navBar_lg');
        showMenuIcon_lg()
    }
    else {
        $('.navBar').addClass('navBarHide')
        $('.navBar').addClass('navBar_sm')
        showMenuIcon_sm()
    }

    //narbar resize
    $(window).resize(() => {
        let reWidth = $(window).width()
        // 變小
        if (width == 'lg' && reWidth < 992) {
            navRemoveEvent();
            $('.navBar').toggleClass('navBar_lg');
            $('.navBar').toggleClass('navBar_sm')
            $('.menuIcon-sm').find('img')[0].src = (show == 1) ? 'images/close-24px.svg' : 'images/menu-24px.svg';
            if(show == 0)$('.navBar').addClass('navBarHide')
            showMenuIcon_sm()
            width = 'sm';
        }
        // 變大
        if (width == 'sm' && reWidth > 992) {
            navRemoveEvent();
            $('.navBar').toggleClass('navBar_lg');
            $('.navBar').toggleClass('navBar_sm')
            if (show == 1) {
                $('.navBar').addClass('navBarShow');
                $('.main').addClass('mainNavBarShow');
            }
            showMenuIcon_lg()
            width = 'lg';
        }
    })

    function navRemoveEvent() {
        $('.menuIcon-sm').off();
        $('.menuIcon').off();
        $('.navBar').off();
    }

    function navBarShow() {
        $('.navBar').removeClass('navBarHide')
        $('.navBar').addClass('navBarShow');
        $('.main').addClass('mainNavBarShow');
        $('.menuIcon').fadeOut()
        show = (show == 0) ? 1 : 0
    }

    function showMenuIcon_lg() {
        $('.menuIcon-sm').hide();
        $('.menuIcon').show();
        $('.menuIcon').mouseenter(navBarShow);
        $('.menuIcon').click(navBarShow);
        $('.navBar').mouseleave(() => {
            $('.navBar').removeClass('navBarShow');
            $('.main').removeClass('mainNavBarShow');
            $('.menuIcon').fadeIn();
            $('.menuIcon').off();
            setTimeout(()=>{
                $('.navBar').addClass('navBarHide')
                $('.menuIcon').mouseenter(navBarShow);
                $('.menuIcon').click(navBarShow);
            },1000)
            show = (show == 0) ? 1 : 0
        })
    }

    function showMenuIcon_sm() {
        $('.menuIcon').hide();
        $('.menuIcon-sm').show();
        $('.menuIcon-sm').click(() => {
            console.log(1);
            $('.navBar').toggleClass('navBarHide');
            $('.menuIcon-sm').find('img')[0].src = (show == 0) ? 'images/close-24px.svg' : 'images/menu-24px.svg';
            show = (show === 0) ? 1 : 0
        });
    }

})


