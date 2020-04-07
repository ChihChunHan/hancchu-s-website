

// intro preview

const vh = window.innerHeight
const li = $('.project li')
const preview = $('.intro .preview')
const previewBox = $('.intro .preview .box')
const txtEfct = $('.intro .txtEfct')
const cateEfct = $('.intro .cateEfct')

// init
showPreview(li.eq(0))
let timer

li.mouseenter((e)=>{
    const target = $(e.target) ; 
    const liID = target.index('.project li'); // find nth li
    showPreview(target)

    clearTimeout(timer)
    previewBox.children().fadeOut()
    timer = setTimeout(()=>{
        previewBox.html(`<img src="images/preview/${liID}.jpg">`).hide().fadeIn()
    },300) 
})



function showPreview(liTarget) {
    const getInfo = function(item) {  // building odj
        this.Y = item.offset().top - vh*1.15;
        this.X = item.offset().left;
        this.H = item.outerHeight();
        this.W = item.find('.item').outerWidth() + item.find('span').outerWidth() + 10;
        this.cX = item.parent().offset().left;
        this.coW = item.parent().outerWidth();
        this.ciW = item.outerWidth();
    }

    const item = new getInfo(liTarget)  // new obj
    const cate = new getInfo(liTarget.parents('.col-lg-6').prev().find('.txt'))

    preview.css('top',item.Y + item.H / 2)  // imgview hover

    txtEfct.css({  // txt effect
        'top':item.Y,
        'left':item.X,
        'width':item.W,
    })

    cateEfct.css({  // cate effect
        'top':cate.Y,
        'left':cate.cX - 40,
        'width':cate.coW,
        'height':cate.H,
    })

    cateEfct.find('.white').css({
        'width':cate.coW-cate.ciW - 30
    })
}




// new work
$.get('worksData.json',{},(e)=>{
    console.log(e);
    const data = e ;
    const list = data.worksListData ;
    for (const index in list) {
        const works = list[index] ;
        for (let i = 0; i < works.length; i++) {
            const work = works[i] ; 
            
            // DOM
            // covor
            $(`.indexItem[data-index="${index}"]`).find('.worksBlock').append(`
                <a id="${i}" href="#" class="work fireModal"><img src="${work.id_cover}"></a>
            `)
        }
    }

    // work content show subtitle
    let hoverCate

    $('.workList a').hover((e)=>{
        
        const target = e.target
        const getID = target.id
        const getCate = $(target).parents(".indexItem")[0].dataset.index
        const getWorks = list[getCate]
        const getWork = getWorks[getID]
        const getSubtitle = $(target).parents(".indexItem").find('.sub')
        const getYear = getWork['year']
        const getTitle = getWork['title']

        getSubtitle.find('.work-title').text(getTitle)
        getSubtitle.find('.work-year').text(getYear)
        
        hoverCate = getCate
    },()=>{
        const getSub = $(`.indexItem[data-index="${hoverCate}"]`).find('.sub')
        getSub.children().text('')
    })

    // modal
    $('.fireModal').click((e)=>{
        e.preventDefault()
        const target = e.target
        const getID = target.id
        const getCate = $(target).parents(".indexItem")[0].dataset.index
        const getWorks = list[getCate]
        const getWork = getWorks[getID] ;
        
        

        // img

        $('.modal').append(`
            <div class="modal-dialog modal-lg border-0" >
                <div class="modal-content border-0" id="imgs" data-index="${getCate}">
                </div>
            </div>
        `)
        for (let j = 0; j < getWork.imgs.length; j++) {
            $('#imgs').append(`
                <img src="${getWork.imgs[j]}">
            `)
            
        }

        // tags
        $('.modal').append(`<div class="tags"><ul></ul></div>`)
        const tags = getWork.tags.split(" ")
        
        for (let k = 0; k < tags.length; k++) {
            $('.tags ul').append(`<li>${tags[k]}</li>`)
        }

        // title
        $('.modal').append(`<div class="workTitle">${getWork.title}</div>`)
        
        // close
        $('.modal').append(`
            <div class="close">
                <img src="./images/close-24px.svg" style="transform: scale(1.3);">
            </div>
        `)

        // id/count
        $('.modal').append(`        
            <div class="idNum">
                <div>${getWorks.length-getID}</div>
                <div>${getWorks.length}</div>
            </div>
        `)

        $('#work').modal()
        $('#work').on('hidden.bs.modal', function (e) {
            $('#work').children().remove();
        })
    })
})



// 