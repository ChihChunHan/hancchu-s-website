var nowWorks

var workCoverData = [
    './images/cover/05-web.png',
    './images/cover/04-webl.jpg',
    './images/cover/03-3D.jpg',
    './images/cover/02-EDM.jpg',
    './images/cover/01-KV.png',
    './images/cover/00-poster.jpg',
]

// // cursor tracer
// $(document).mousemove(function (e) {
//     $('.tail').css({ left: e.pageX, top: e.pageY })
// })

// rwd navBar
let show = 0;
$(document).ready(() => {

    //navbar init

    let width = ($(window).width() > 992) ? "lg" : "sm"; // 偵測x寬度
    $('.closeIcon').hide();

    if (width == "lg") { // lg
        $('.menuIcon').addClass('hide');
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
        if (window.scrollY < window.innerHeight) $('.menuIcon-sm').hide()  // 偵測scroll top是否超過100vh
        $('.navBar').addClass('hide')
        $('.navBar').addClass('navBar_sm')

        $(document).scroll(() => {
            if (window.scrollY > window.innerHeight) showMenuIcon_sm()
            else $('.menuIcon-sm').hide()
        })
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
            if (show == 0) $('.navBar').addClass('hide')
            showMenuIcon_sm()
            width = 'sm';
        }
        // 變大
        if (width == 'sm' && reWidth > 992) {
            navRemoveEvent();
            $('.navBar').toggleClass('navBar_lg');
            $('.navBar').toggleClass('navBar_sm')
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

    function showMenuIcon_lg() {  // 開啟選單  事件
        $('.navBar').mouseleave(hideNavBar_lg)

        $('.menuIcon').removeClass('hide').mouseenter(navBarShow).click(navBarShow);
        
        $('.menuIcon-sm').hide();
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

    function showMenuIcon_sm() {
        $('.menuIcon').addClass('hide');
        $('.menuIcon-sm').show();
        $('.menuIcon-sm').click(() => {
            $('.navBar').toggleClass('navBarHide');
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

// side index
$(document).ready(() => {
    const screenH = window.innerHeight
    const worksTop = $('.workList').offset().top
    const contactsTop = $('#contacts').offset().top


    const intro = $('.sd-intro')
    const works = $('.workList .index')
    $(document).scroll(() => {
        let scrolled = window.scrollY

        if (scrolled < screenH && intro.css('position')!='absolute') intro.css('position', 'absolute') 

        if (scrolled > screenH && intro.css('position')!='fixed') {
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

        // if (scrolled > contactsTop && works.css('position')!='absolute') works.css('position', 'absolute')
    })
})

// project preview
// $(document).ready(()=>{
//     $('.preview').hide()
//     const lis = $('.project').find('li')
//     const pres = $('.project').find('.preview')
//     console.log(pres,lis);

//     for (let i = 0; i < pres.length; i++) {
//         lis.eq(i).hover(()=>{
//             pres.eq(i).show()
//         },()=>{
//             pres.eq(i).hide()
//         })
        
//     }
    
// })

// work list
let workList = []
$(document).ready(() => {
    for (let i = 0; i < $('.showWorkBox').length; i++) {
        workList[i] = 0;
        let thisWorkBox = $('.showWorkBox').eq(i);
        let getWorkTitle = thisWorkBox.find('.indexBotton .workIndexTitle').text()
        let getWorkSubTitle = thisWorkBox.find('.indexTop .workIndexTitle div').text()

        console.log(getWorkSubTitle);


        thisWorkBox.click(() => { // 點擊按鈕
            // indexOpenToggle(i)
            workList[i] = (!workList[i]);

            let windowHeight = $(window).height()
            let h80vh = windowHeight * 0.8
            let getTop = thisWorkBox.offset().top;

            if (!workList[i]) {  // close
                indexClose(i)
                HUDinit();  // 開啟HUD
                setTimeout(()=>{
                    $('.hud').removeClass('hide');
                },1000)

                if (window.innerWidth > 992) $('.menuIcon').show();  // 開啟menu
                else $('.menuIcon').show();

                $('.indexTop span').show()

                $('html, body').stop().animate({  // scroll
                    scrollTop: getTop - h80vh / 2
                    }, 500, 'easeInOutQuad', () => {
                        $('html').css('overflow', 'auto');
                    });
                for (let i = 0; i < 2; i++) {
                    thisWorkBox.find('.marquee').eq(i).animate({ 'opacity': "0" }, 1000, () => {
                        thisWorkBox.find('.marquee').remove()
                    })
                }

                $('.works').animate({ 'opacity': 0 }, 1000, () => {
                    // $('.test').slick('unslick');
                    // $('.test').remove();
                    $('.slickBox').remove();
                })

                nowWorks = '';

            } else {  // open
                indexOpen(i)
                clearTimeout(timer);
                $('.zoom').off('mouseenter').off('mouseleave')  // 關掉HUD事件
                $('.left').eq(i).removeClass('animated fadeInUp faster').addClass('animated fadeOutUp faster');
                $('.right').eq(i).removeClass('animated fadeInDown faster').addClass('animated fadeOutDown faster');
                $('.hud').addClass('hide');

                if (window.innerWidth > 992) $('.menuIcon').hide();  // 關掉menu
                else $('.menuIcon-sm').hide();

                $('html, body').stop().animate({  // scroll
                    scrollTop: getTop
                }, 500, 'easeInOutQuad', () => {
                    $('html').css('overflow', 'hidden');
                });

                $('.indexTop span').hide()


                // 跑馬燈 
                for (let i = 0; i < 2; i++) {
                    thisWorkBox.find('.indexHide').eq(i).append(`<div class="marquee ${(i == 0) ? 'marqueeTop' : 'marqueeBottom'}"><span class="marqueeItem">${getWorkTitle + getWorkSubTitle}</span></div>`)
                    thisWorkBox.find('.marquee').eq(i).delay(500).animate({ 'opacity': 1 }, 1000)
                }

                const itemWidth = $('.marqueeItem').width() / 2 + 20
                for (let i = window.innerWidth - itemWidth; i - itemWidth > 0; i -= itemWidth) {
                    $('.marquee').append(`<span class="marqueeItem">${getWorkTitle + getWorkSubTitle}</span>`);
                }

                nowWorks = getWorkTitle.replace(/\s+/g, '').replace("-", '').replace("&", '')

                if ($('.test').length == 0) {

                    $.get('./works.html', (e) => {
                        $('.works').eq(i).append(e).css('opacity', 0)
                        // slickInit('.test')
                        $('.works').eq(i).delay(1000).animate({ 'opacity': 1 }, 1000)
                    })
                }
                
            }
        });



        function indexOpen(index) {
            $('.workBlock').eq(index).addClass('workBlockOpen')
            $('.zoom').eq(index).addClass('zoomOpen')
            $('.content').eq(index).addClass('contentOpen')
            $('.line').addClass('lineOpen')
            $('.workIndexTitle').addClass('workIndexTitleHide')
            $('.indexTop').addClass('.indexTopClip')
        }

        function indexClose(index) {
            $('.workBlock').eq(index).removeClass('workBlockOpen')
            $('.zoom').eq(index).removeClass('zoomOpen')
            $('.content').eq(index).removeClass('contentOpen')
            $('.line').removeClass('lineOpen')
            $('.workIndexTitle').removeClass('workIndexTitleHide')
            $('.indexTop').removeClass('.indexTopClip')
        }



        $('.content').click((e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('stop');
        })

        // index hover

    }

    let timer;
    function HUDinit() {
        for (let i = 0; i < $('.showWorkBox').length; i++) {
            $('.zoom').eq(i).hover(() => {
                $('.zoom').eq(i).find('.indexHide').addClass('font-lg')
                timer = setTimeout(() => {
                    $('.left').eq(i).removeClass('animated fadeOutUp faster').addClass('animated fadeInUp faster');
                    $('.right').eq(i).removeClass('animated fadeOutDown faster').addClass('animated fadeInDown faster');
                }, 300)
            }, () => {
                $('.zoom').eq(i).find('.indexHide').removeClass('font-lg')
                clearTimeout(timer);
                $('.left').eq(i).removeClass('animated fadeInUp faster').addClass('animated fadeOutUp faster');
                $('.right').eq(i).removeClass('animated fadeInDown faster').addClass('animated fadeOutDown faster');
            })
            $(document).scroll(()=>{  // scoll event
                if($('.left').attr('class')=="left animated fadeInUp faster") {
                    $('.left').eq(i).removeClass('animated fadeInUp faster').addClass('animated fadeOutUp faster');
                    $('.right').eq(i).removeClass('animated fadeInDown faster').addClass('animated fadeOutDown faster');
                }
            })
        }
    }
    HUDinit();

})



