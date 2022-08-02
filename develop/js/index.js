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


    // Select
    $('.custom-select').each(function(){
        var $this = $(this), numberOfOptions = $(this).children('option').length;
      
        $this.addClass('select-hidden'); 
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');
        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());
        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }
        var $listItems = $list.children('li');
        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });
        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
            //console.log($this.val());
        });
        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });
    });
    // Select

    //Languaje
    $('.languaje__switch').click(function(e){
        let self = $(this);
        e.preventDefault();
        self.parents('.languaje').find('.languaje__block--active').removeClass('languaje__block--active');
        self.parents('.languaje__setting').find('.button--black').removeClass('button--black');
        self.addClass('button--black');
        if(self.hasClass('languaje__switch--eng')){
            self.parents('.languaje').find('.languaje__eng:first').addClass('languaje__block--active');
        }else{
            self.parents('.languaje').find('.languaje__esp:first').addClass('languaje__block--active');
        }
    });

    //Languaje

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
        dots: true,
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
