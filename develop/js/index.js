// Custom and NPM Imports
import Dummy from './components/dummy.js';

const ready = (callbackFunc) => {
    if (document.readyState !== 'loading') {
        /**
         * Document is already ready, call the callback directly
         */
        callbackFunc();
    } else if (document.addEventListener) {
        /**
         * All modern browsers to register DOMContentLoaded
         */
        document.addEventListener('DOMContentLoaded', callbackFunc);
    } else {
        /**
         * Old IE browsers
         */
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState === 'complete') {
                callbackFunc();
            }
        });
    }
};

/**
 * Document ready callback
 */
ready(() => {
    console.log('ready!');

    // Example of loading a Class
    if (document.querySelector('body') !== null) {
        const dummy = new Dummy();
        dummy.init();
    }

    $('.home--slider').slick({
        arrows: false,
        adaptiveHeight: false
    });
    
    $(window).scroll(function(){ 
        if ($(this).scrollTop() > 100) { 
            $('#scroll').fadeIn(); 
        } else { 
            $('#scroll').fadeOut(); 
        } 
    }); 
    $('#toTop').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 600); 
        return false; 
    }); 



});
