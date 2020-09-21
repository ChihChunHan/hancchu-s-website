var nowWorks

// // cursor tracer
if($(window).width() > 992){
    const $MT = $('.tail')
    $(document).mousemove(function (e) {
        $MT.css({ left: e.clientX, top: e.clientY })
    })
    
    $('.top').hover(()=>{
        $MT.addClass('lg invert')
    },()=>{
        $MT.removeClass('lg invert')    
    })

    $('.navBar').hover(()=>{
        $MT.addClass('white')
    },()=>{
        $MT.removeClass('white')    
    })

    $('.navBar a').hover(()=>{
        $MT.hide()
    },()=>{
        $MT.show()
    })
}else{
    $('.tail').remove()
}   

// rwd navBar
let show = 0;
$(document).ready(() => {

    //navbar init

    let width = ($(window).width() > 992) ? "lg" : "sm"; // 偵測x寬度
    $('.closeIcon').hide();

    if (width == "lg") { // lg

        $('.navBar').addClass('navBar_lg');
        $('.navBar').addClass('hide');


        if (window.scrollY < window.innerHeight) $('.menuIcon').addClass('hide');  // 偵測scroll top是否超過100vh
        else showMenuIcon_lg();

        $(document).scroll(() => {  // scoll事件
            if (window.scrollY > window.innerHeight) showMenuIcon_lg();
            else $('.menuIcon').addClass('hide');
        })
    }
    else {  // sm
        $('.navBar').addClass('hide')
        $('.navBar').addClass('navBar_sm')

        showMenuIcon_sm()
    }

    //narbar resize
    $(window).resize(() => {
        let reWidth = $(window).width()
        // 變小
        if (width == 'lg' && reWidth < 992) {
            navRemoveEvent();
            $('.menuIcon-sm').find('img')[0].src = (show == 1) ? 'images/close-24px.svg' : 'images/menu-24px.svg';
            if (show == 0) $('.navBar').addClass('hide')
            showMenuIcon_sm()
            width = 'sm';
        }
        // 變大
        if (width == 'sm' && reWidth > 992) {
            navRemoveEvent();
            if (show == 1) {
                $('.navBar').addClass('show');
                $('.main').addClass('show');
            }
            showMenuIcon_lg()
            width = 'lg';
        }
    })

    function navRemoveEvent() {  // 移除事件
        $('.menuIcon-sm').off();
        $('.menuIcon').off();
        $('.navBar').off();
    }

    function navBarShow() {  // 開啟選單
        $('.navBar').addClass('show').removeClass('hide');  // open navbar

        $('.main').addClass('show').addClass('blur');  // move main&blur

        $('.menuIcon').addClass('hide');  // .menu-lg icon hide
        show = (show == 0) ? 1 : 0
    }

    function hideNavBar_lg() {  // 關閉選單
        $('.navBar').removeClass('show').addClass('hide');

        $('.main').removeClass('show').removeClass('blur');

        $('.menuIcon').removeClass('hide');

        setTimeout(() => {
            $('.menuIcon').mouseenter(navBarShow);
            $('.menuIcon').click(navBarShow);
        }, 1000)
        show = (show == 0) ? 1 : 0
    }

    function showMenuIcon_lg() {  // 開啟選單  事件
        $('.navBar').mouseleave(hideNavBar_lg)

        $('.menuIcon').removeClass('hide').mouseenter(navBarShow).click(navBarShow);
        
        // $('.menuIcon-sm').hide();
    }

    function showMenuIcon_sm() {
        $('.menuIcon-sm').click(() => {
            $('.navBar').toggleClass('hide');
            $('.menuIcon-sm').find('img')[0].src = (show == 0) ? 'images/close-24px.svg' : 'images/menu-24px.svg';
            show = (show === 0) ? 1 : 0
        });
    }

    $('.navBarItem').click((e) => {
        const id = e.target.hash;
        const top = $(id).offset().top;
        hideNavBar_lg();
        $('html, body').stop().animate({  // scroll
            scrollTop: top
        }, 1000, 'easeInOutQuad');
    })

})

// page scroll 
$(document).ready(() => {
    const vh = window.innerHeight
    const worksTop = $('.workList').offset().top
    const contactsTop = $('#contacts').offset().top


    const intro = $('.sd-intro')
    const works = $('.workList .index')
    $(document).scroll(() => {
        let scrolled = window.scrollY
        
        // top scroll for more
        if((vh-scrolled*2)/vh>0)$('.scroll').css('opacity',(vh-scrolled*2)/vh)

        // side index

        if (scrolled < vh && intro.css('position')!='absolute') intro.css('position', 'absolute') 

        if (scrolled > vh && intro.css('position')!='fixed') {
            intro.css({'position':'fixed','top': 0 })
        }

        if (scrolled < worksTop && works.css('position')!='absolute') {
            works.css('position', 'absolute')
            intro.show()
        }


        if (scrolled > worksTop && works.css('position')!='fixed') {
            works.css({'position':'fixed','top': 0 })
            intro.hide()
        }

    })
})



