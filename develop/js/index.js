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


    // Color Picker
    ;(function(){
      "use strict";
      // factory class for colour picker
        function COLOUR_PICKER(args){
            this.element = args.target;
            this.colour = args.colour;
            this.callback = args.callback;

            this.start();
        }
      // function to convert rgb to hex
        function rgbToHex(rgbval){
            rgbval = rgbval.replace('rgba(', '')
                           .replace('rgb(', '')
                           .replace(')', '');
            var rgb = rgbval.split(',').map(v => parseInt(v.trim()) );

            var r = rgb[0] <= 15 ? '0' + rgb[0].toString(16) : rgb[0].toString(16);
            var g = rgb[1] <= 15 ? '0' + rgb[1].toString(16) : rgb[1].toString(16);
            var b = rgb[2] <= 15 ? '0' + rgb[2].toString(16) : rgb[2].toString(16);

            return '#' + r + g + b;
        }
      // function to convert rgb or hex to hsv
        function toHSV(col){
            if(col.indexOf('#') === -1){
                col = rgbToHex(col);
            }

            col = col.replace('#', '');

        if(col.length === 3){
          col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];
        }
            var r = parseInt(col.substring(0,2),16)/255;
            var g = parseInt(col.substring(2,4),16)/255;
            var b = parseInt(col.substring(4,6),16)/255;

            var max = Math.max(r,g,b);
            var min = Math.min(r,g,b);
            var chroma = max - min;

            var hue;

            if(max === min){ 
                return {
                    h: 0,
                    s: chroma === 0 ? 0 : chroma / (1 - Math.abs(2*((max + min) / 2)-1)),
                    v: max
                };
            }   
            else if(max === r){
                hue = ((g - b) / chroma) % 6;
            }
            else if(max === g){
                hue = ((b - r) / chroma) + 2;
            }
            else if(max === b){
                hue = ((r - g) / chroma) + 4;
            }

            hue *=60;


            var res = {
                h: hue < 0 ? hue + 360 : hue,
                s: chroma === 0 ? 0 : (chroma / max) * 100,
                v: max * 100
            };
            console.log(res);
            return res;
        }
      // function to convert hsv to rgb
        function hsvToRGB(hsv){

            var r, g, b;
            var i;
            var f, p, q, t;

            var h = Math.min(360, hsv.h) // this cannot be higher than 360
            var s = hsv.s;
            var v = hsv.v;

            if(s === 0){
                v = v*100;
                return {
                    r: v*255,
                    g: v*255,
                    b: v*255
                }   
            }

            h /= 60;
            i = Math.floor(h);
            f = h - i; // factorial part of h
            p = v * (1 - s);
            q = v * (1 - s * f);
            t = v * (1 - s * (1 - f));

            switch(i) {
                case 0: r = v, g = t, b = p; break;
                case 1: r = q, g = v, b = p; break;
                case 2: r = p, g = v, b = t; break;
                case 3: r = p, g = q, b = v; break;
                case 4: r = t, g = p, b = v; break;
                default:  r = v, g = p, b = q; break; 
            }

            return {
                r: Math.round(r * 255), 
                g: Math.round(g * 255), 
                b: Math.round(b * 255)
            };

        }
      // function to convert hsv(hue only) to rgb
        function hsvToRGBBase(hsv){
            hsv.s = 1;
            hsv.v = 1;
            return hsvToRGB(hsv);
        }
      // function to get position of mouse click on canvas
        function getPosition(e, canvas){
            var x = e.pageX ? e.pageX :  e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;;
            var y = e.pageY ? e.pageY : e.clientY + document.body.scrollTop + document.documentElement.scrollTop;;

            x -=canvas.offsetLeft;
            y -=canvas.offsetTop;

            return {x:x,y:y - 4};
        }
      // start call for colour picker
        COLOUR_PICKER.prototype.start = function(){
            // for now we will use jquery
            this.element.html(
                $('[name=COLOURPICKER].template').html()
            );

            // add reference to object
            var that = this;

            this.canvas_map1 = $('[name=hue]', this.element)[0]; // get reference to canvas 1 (Where we will select final colour)
            this.canvas_map2 = $('[name=base]', this.element)[0]; // get reference to canvas 2 (Where we will select base colour)

            // setup mouse events for canvas 1 (main canvas where colour is chosen)
            this.canvas_map1.addEventListener('mousedown', function(){
                that.dragging = true;   
            });

            this.canvas_map1.addEventListener('mouseup', function(e){
                that.selectColour.bind(that)(e);
                that.dragging = false;
                that.updateValues.bind(that)();
            });

            this.canvas_map1.addEventListener('mousemove', function(e){
                if(that.dragging){
                    that.selectColour.bind(that)(e);
                    that.updateValues.bind(that)();
                }
            });

            // setup mouse events for canvas 2 (canvas where base colour is chosen)
            this.canvas_map2.addEventListener('mousedown', function(){
                that.dragging = true;   
            });

            this.canvas_map2.addEventListener('mouseup', function(e){
                that.selectBaseColour.bind(that)(e);
                that.dragging = false;
                that.updateValues.bind(that)();
            });

            this.canvas_map2.addEventListener('mousemove', function(e){
                if(that.dragging){
                    that.selectBaseColour.bind(that)(e);
                    that.updateValues.bind(that)();
                }
            });

            $('[name=rgb] input').on('change', this.handlekeyup.bind(this));
            $('[name=submit]').on('click', function(){
                if(that.callback){
                    that.callback(that.colour);
                }   
            });

            this.updateValues();
            this.update(); // now we have set this up we can start update cycle
        }
      // update function that gets called on animation frame
        COLOUR_PICKER.prototype.update = function(){
            this.hsv = toHSV(this.colour);

            var rgb = hsvToRGBBase(this.hsv);

            this.base = this.base || rgbToHex(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b})`);

            this.drawMap1();
            this.drawMap2();
            this.drawSelector();
            this.drawBaseCursor();

            window.requestAnimationFrame(this.update.bind(this));
        }
      // function that drawas 'main' canvas where colour is selected
        COLOUR_PICKER.prototype.drawMap1 = function(){
            var canvas = this.canvas_map1;
            var ctx = canvas.getContext('2d');

            ctx.clearRect(0,0, canvas.width, canvas.height);

            ctx.fillStyle = this.base;
            ctx.fillRect(0,0,canvas.width, canvas.height);

            var GradientLight = ctx.createLinearGradient(0, canvas.height, canvas.width, canvas.height);
            GradientLight.addColorStop(0,"rgba(255,255,255,1)");
            GradientLight.addColorStop(1,"rgba(255,255,255,0)");

            ctx.fillStyle=GradientLight;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            var GradientDark = ctx.createLinearGradient(0, 0, 0, canvas.height);
            GradientDark.addColorStop(0,"rgba(0,0,0,0)");
            GradientDark.addColorStop(1,"rgba(0,0,0,1)");

            ctx.fillStyle=GradientDark;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      // function to draw second canvas which is the 'hue' / 'base' colour
        COLOUR_PICKER.prototype.drawMap2 = function(){
            var canvas = this.canvas_map2;
            var ctx = canvas.getContext('2d');

            var GradientAll = ctx.createLinearGradient(0, 0, 0, canvas.height);

            for(var i = 0; i < 360; i++){
                var rgb = hsvToRGBBase({h: 360 - i, s:0 ,v:0 });
                var percentile = 1 / 360;
                GradientAll.addColorStop(percentile * i,rgbToHex(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b})`));
            }

            ctx.fillStyle=GradientAll;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      // on click of second canvas
        COLOUR_PICKER.prototype.selectBaseColour = function(e){ 
            var y = getPosition(e, this.canvas_map2).y;

            this.baseCursorPos = y;
            // we only care about y;
            var h = this.canvas_map2.height;
            var percentile = (y/h) * 100 // this is the percent wayz down we've clicked

            var hue = 360 * (percentile/100);
            hue =   hue === 360 ? 0 : 
                    hue === 0 ? 360 : 
                    hue < 180 ? 360-hue : 
                    hue - ((hue % 180) * 2);

            var currenctHSV = toHSV(this.colour);
            var hsv = {
                h: hue,
                s: currenctHSV.s / 100,
                v: currenctHSV.v / 100
            }

            var rgb = hsvToRGB(hsv);
            var base = hsvToRGBBase(hsv);

            this.base = rgbToHex(`rgba(${base.r}, ${base.g}, ${base.b})`);
            this.colour = rgbToHex(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b})`);
        }
      // on click of main canvas
        COLOUR_PICKER.prototype.selectColour = function(e){
            var pos = getPosition(e, this.canvas_map1);
            var x = pos.x;
            var y = pos.y;
            var canvasWidth = this.canvas_map1.width;
            var canvasHeight = this.canvas_map1.height;

            var percentileY = (y/canvasHeight) * 100;
            var percentileX = (x/canvasWidth) * 100;

            percentileY =   percentileY === 100 ? 0 :
                            percentileY === 0 ? 0 :
                            percentileY < 50 ? 100 - percentileY : 
                            percentileY - ((percentileY % 50) * 2);

            var basehsv = toHSV(this.base);
            var hsv = {
                h: basehsv.h,
                s: percentileX / 100,
                v: percentileY / 100
            }

            var rgb = hsvToRGB(hsv);

            this.colour = rgbToHex(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b})`);
            console.log(this.colour);
        }
      // draw the selector on main canvas
        COLOUR_PICKER.prototype.drawSelector = function(){
            var canvas = this.canvas_map1;
            var ctx = canvas.getContext('2d');

            var hsv = toHSV(this.colour);
            var x = canvas.width * (hsv.s/100);
            var y = canvas.height * ((100-hsv.v)/100);

            // fill colour
            ctx.beginPath();
            ctx.arc(x,y,6,0,Math.PI*2);
            ctx.fillStyle = this.colour;
            ctx.fill();
            // create white outline for dark areas
            ctx.beginPath();
            ctx.arc(x,y,6,0,Math.PI*2);
            ctx.strokeStyle = '#fff';
            ctx.stroke();
            // create dark outline for light areas
            ctx.beginPath();
            ctx.arc(x,y,7,0,Math.PI*2);
            ctx.strokeStyle = '#000';
            ctx.stroke();
        }
      // draw cursor on base colour/hue canvas
        COLOUR_PICKER.prototype.drawBaseCursor = function(){
            if(this.baseCursorPos){
                var canvas = this.canvas_map2;
                var width = canvas.width;
                var ctx = canvas.getContext('2d');

                ctx.beginPath();
                ctx.rect(0,this.baseCursorPos, width, 1);
                ctx.fillStyle = '#000';
                ctx.fill();

                ctx.beginPath();
                ctx.rect(0,this.baseCursorPos - 1, width, 1);
                ctx.fillStyle = '#fff';
                ctx.fill();
            }
        }
      // update values in inputs
        COLOUR_PICKER.prototype.updateValues = function(){
            var res = $('[name=output]', this.element);
        var r = $('[name=r] input', this.element);
        var g = $('[name=g] input', this.element);
        var b = $('[name=b] input', this.element);
        var hex = $('[name=hex] input', this.element);

        var hsv = toHSV(this.colour);
        hsv.s = hsv.s/100;
        hsv.v = hsv.v/100;

        var rgb = hsvToRGB(hsv);
        var full = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

        r.val(rgb.r);
        g.val(rgb.g);
        b.val(rgb.b);

        hex.val(rgbToHex(full).replace('#', ''));

        res.css('background-color', full);
        }
      // on keyup of the values --- this was actually change to change event but forgot to change function name
        COLOUR_PICKER.prototype.handlekeyup = function(e){
            var value = $(e.target).closest('li').attr('name');
        if(value === 'hex'){
          this.colour = e.target.value;
          this.colour = this.colour.indexOf('#') === -1 ? '#' + this.colour : this.colour;
        }
        else{
          var hsv = toHSV(this.colour);
          hsv.s = hsv.s/100;
          hsv.v = hsv.v/100;
          var currentRGB = hsvToRGB(hsv); 
          this.base = hsvToRGBBase(hsv);

          var nr = value === 'r' ? parseInt(e.target.value) : currentRGB.r;
          var ng = value === 'g' ? parseInt(e.target.value) : currentRGB.g;
          var nb = value === 'b' ? parseInt(e.target.value) : currentRGB.b;

          this.colour = rgbToHex(`rgb(${nr}, ${ng}, ${nb})`);
        }

        var newHSV = toHSV(this.colour);
        newHSV.s = newHSV.s/100;
        newHSV.v = newHSV.v/100;

        var newRGB = hsvToRGBBase(newHSV);

        this.base = rgbToHex(`rgb(${newRGB.r}, ${newRGB.g}, ${newRGB.b})`)
        this.updateValues();
        this.callback(this.colour);
        }
      // a custom object that is global and accessible by user
        window.ColourPicker = {
            init: function(colour, callback){
                // i shall use jquery for element selection and manipulation as it's really quick and really not my main focus
          
          //TODO have it so that we can give this function our desired root element rather than hard coding here
          // TODO remove jquery as its not used loads and just adds overhead
                var root = $('[name=ColourPicker].component');
                var container = $('[name=picker]', root);

                var cp = new COLOUR_PICKER({
                    target: container,
                    colour: colour,
                    callback: function(c){ alert(c) }
                });
            }
        }   
    })();
    // initialize the colour picker with a given colour
    // atm I think we can only give a hash colour here
    // TODO allow to accept any type of colour
    ColourPicker.init('#7000ff');

    // Color Picker


});
