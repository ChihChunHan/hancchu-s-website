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
            if (show == 0) $('.navBar').addClass('navBarHide')
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
            setTimeout(() => {
                $('.menuIcon').mouseenter(navBarShow);
                $('.menuIcon').click(navBarShow);
            }, 1000)
            show = (show == 0) ? 1 : 0
        })
    }

    function showMenuIcon_sm() {
        $('.menuIcon').hide();
        $('.menuIcon-sm').show();
        $('.menuIcon-sm').click(() => {
            $('.navBar').toggleClass('navBarHide');
            $('.menuIcon-sm').find('img')[0].src = (show == 0) ? 'images/close-24px.svg' : 'images/menu-24px.svg';
            show = (show === 0) ? 1 : 0
        });
    }

})

//navbar item transition
// $(document).ready(()=>{
//     let $NBI = $('.nacBarItem')
//     $NBI.hover(()=>{
//         $('.navBarItem::before').css('width','100%')
//     })
// })

// slick
$(document).ready(function(){
    $('.your-class').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        // slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows:false,
        accessibility:false,
        // focusOnSelect: true,
        // prevArrow: $('.pre'),
        // nextArrow: $('.next'),
    });
    $('.your-class').on('afterChange',()=>{
        let id = $('.your-class').slick('slickCurrentSlide');
        console.log(id);
        $('#current').text(id+1)
    })
    $('.pre').click(()=>{
        $('.your-class').slick('slickPrev')
    })
    $('.next').click(()=>{
        $('.your-class').slick('slickNext')
    })
});

// work list
let workList = []
$(document).ready(() => {
    for (let i = 0; i < $('.showWorkBox').length; i++) {
        workList[i] = 0;

        $('.showWorkBox').eq(i).click(() => {
            let getTop = $('.showWorkBox').eq(i).offset().top;

            indexOpenToggle(i)
            for (let j = 0; j < workList.length; j++) {
                if (workList[j] && j != i) {
                    indexOpenToggle(j)
                    workList[j] = 0;
                }
            }
            workList[i] = (!workList[i]);

            let windowHeight = $(window).height()
            let h80vh = windowHeight * 0.8

            if (!workList[i]) {
                $('html, body').stop().animate({
                    scrollTop: getTop - h80vh / 2
                }, 500, 'easeInOutQuad', () => {
                    $('html').css('overflow', 'auto');
                    console.log('unlock');
                });

            } else {
                $('html, body').stop().animate({
                    scrollTop: getTop
                }, 500, 'easeInOutQuad', () => {
                    $('html').css('overflow', 'hidden');
                    console.log('lock');

                });

            }
            console.log('scoll');

            console.log('toggle');
            console.log(workList);
        });

        function indexOpenToggle(index) {
            $('.workBlock').eq(index).toggleClass('workBlockOpen')
            $('.zoom').eq(index).toggleClass('zoomOpen')
            $('.content').eq(index).toggleClass('contentOpen')
            $('.line').toggleClass('lineOpen')
            $('.workIndexTitle').toggleClass('workIndexTitleHide')
            $('.marquee').toggleClass('marqueeShow')
            // $('.your-class').toggle()
            // $('.indexTop').eq(i).toggleClass('indexTopHide')
            // $('.indexBotton').eq(i).toggleClass('indexBottonHide')
        }

        $('.content').click((e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('stop');
        })
    }

})