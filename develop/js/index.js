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

    $('#sandwich').click(function(e){
        e.preventDefault();
        $('.menu__table').stop().slideToggle();
    });

    $('.tester-switch').click(function(e){
        let self = $(this);
        let parent = self.parents('.testerparent');
        e.preventDefault();
        if(self.hasClass('tester--noclass')){
            self.removeClass('tester--noclass');
            self.addClass('tester--contrast');
            parent.removeClass('testerparent--noclass');
            parent.addClass('testerparent--contrast');
        }else{
            if(self.hasClass('tester--contrast')){
                self.removeClass('tester--contrast');
                self.addClass('tester--bg');
                parent.removeClass('testerparent--contrast');
            parent.addClass('testerparent--bg');
            }else{
                if(self.hasClass('tester--bg')){
                    self.removeClass('tester--bg');
                    self.addClass('tester--noclass');
                    parent.removeClass('testerparent--bg');
                    parent.addClass('testerparent--noclass');
                }
            }
        }
    });

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
