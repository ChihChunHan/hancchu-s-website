
var bar = new ProgressBar.Line('#pregressbar', {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#555',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: {width: '100%', height: '100%'},
    text: {
        style: {
        // Text color.
        // Default: same as stroke color (options.color)
        color: '#999',
        position: 'absolute',
        left: '50%',
        top: '30px',
        padding: 0,
        margin: 0,
        transform: 'translateX(-50%)'
        },
        autoStyleContainer: false
    },
    from: {color: '#333'},
    to: {color: '#fff'},
    step: (state, bar) => {
        bar.setText(Math.round(bar.value() * 100) + ' %');
        bar.path.setAttribute('stroke', state.color);
    }
    });

    bar.animate(1.0,()=>{// Number from 0.0 to 1.0
        // $('.loading').fadeOut(1000)
        $('.loading').remove()
        $('.top').addClass('clip')
        $('html, body').scrollTop(0);
        enableScroll()
    });  

    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
    e.preventDefault();
    }

    function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
    }

    // modern Chrome requires { passive: false } when adding event
    var supportsPassive = false;
    try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; } 
    }));
    } catch(e) {}

    var wheelOpt = supportsPassive ? { passive: false } : false;
    var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

    // call this to Disable
    function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    }

    // call this to Enable
    function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    }
    
    disableScroll()
    