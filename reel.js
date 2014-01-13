(function() {
      
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                || window[vendors[x]+'CancelRequestAnimationFrame'];
        }
}());
var images = [
    {src:"http://fc04.deviantart.net/fs71/f/2012/129/4/5/mlp_slot_machine___special_feature_reel_5_luna_by_xfizzle-d4z61i3.png"},
    {src:"http://fc05.deviantart.net/fs70/f/2012/129/1/b/mlp_slot_machine___special_feature_reel_1_celestia_by_xfizzle-d4z5z66.png"},
    {src:"http://fc08.deviantart.net/fs70/f/2012/129/1/6/mlp_slot_machine___high_pay_1_cmc_by_xfizzle-d4z3vx3.png"},
    {src:"http://fc01.deviantart.net/fs70/f/2012/128/e/9/mlp_slot_machine___rariqueen_icon_by_xfizzle-d4z0kp6.png"},
    {src:"http://fc03.deviantart.net/fs70/f/2012/128/4/e/mlp_slot_machine___rainbow_king_icon_by_xfizzle-d4z0m90.png"},
    {src:"http://fc04.deviantart.net/fs70/f/2012/128/d/0/mlp_slot_machine___pinkie_ten_icon_by_xfizzle-d4z0j78.png"},
    {src:"http://fc02.deviantart.net/fs70/f/2012/128/d/3/mlp_slot_machine___acelight_sparkle_icon_by_xfizzle-d4z0nxr.png"},
    {src:"http://fc03.deviantart.net/fs71/f/2012/128/0/f/mlp_slot_machine___applejack_icon_by_xfizzle-d4z0d15.png"},
    {src:"http://fc06.deviantart.net/fs71/f/2012/129/1/7/mlp_slot_machine___derpy_wild_by_xfizzle-d4z3ptb.png"},
    {src:"http://fc00.deviantart.net/fs70/f/2012/129/9/7/mlp_slot_machine___high_pay_2_princess_harmony_by_xfizzle-d4z40jb.png"},
    {src:"http://fc05.deviantart.net/fs70/f/2012/129/d/5/mlp_slot_machine___elements_of_harmony_bonus_icon_by_xfizzle-d4z4fv8.png"},
    {src:"http://fc06.deviantart.net/fs71/f/2012/129/6/2/mlp_slot_machine___discord__s_free_spin_chaos_icon_by_xfizzle-d4z4lae.png"}
]
var REEL = function(){
    var Super = this;
    this.imagesLoaded = false;
    this.el = '';
    this.isSpinning = false;
    this.rotation = 0;
    this.animId = null;
    //properties
    
    
    this._loadImages = function(images){
        for(var i = 0; i< images.length; i++){
            var imgSrc = images[i].src;
            img = new Image();
            img.src = imgSrc;
            img.onload =  function(){
               images[i] = img; 
            }
             
            if(i === images.length-1){
               Super.imagesLoaded = true;
            }
            
        }
    }
    
    
    this.randomImagesGen = function(){
        var randomImagesArray = [];
        for(var i = 0; i<images.length; i++){
             var randNum = Math.floor(Math.random()*11);
             randomImagesArray.push(images[randNum]);
        }
        return randomImagesArray;
    }
    
    this.build = function(el){
        var self = this;
       var imageArray =  Super.randomImagesGen();
       self.el = el;
       Super._loadImages(images)
       var interval= setInterval(function(){
            if(Super.imagesLoaded === true){
               clearInterval(interval);
            
            
            build();
            };
         
       });
        
        function build(){
           for(var i in imageArray){
                $(el).append("<div class='block'><img src='"+imageArray[i].src+"'/></div>");
           }
           var block = $(el).find($('.block'));  
           var deg = 0;

           for(var i = 0; i<images.length; i++){
             $(block[i]).css({
                "-webkit-transform":"rotateX("+deg+"deg) translateZ("+$(block[0]).width()*1.8+"px)",
                 "-moz-transform":"rotateX("+deg+"deg) translateZ("+$(block[0]).width()*1.8+"px)",
             });       
            deg = deg+30;
           }
        }
        
        return this;
    }
    
    
    this.spin = function(){
      var self = this;
      if(!self.isSpinning){
          $(self.el).addClass('beginSpin');
          setTimeout(function(){
            $(self.el).removeClass('beginSpin').addClass('spinning');
          },500);
          
          self.isSpinning = true;
      }
        
        
    }
    
this.startSpinFrame = function(animId){
      var self = this;
      var then = new Date().getTime();
      var step = this.rotation;
      
      function anim(){
            animId = requestAnimationFrame(anim);
            var now = new Date().getTime();
           
//            if(step <= -360){
//                step = 0;
//            }else{
//                step = step+Math.round((((then-now)/1000))*360)
//            }
            step = step+Math.round((((then-now)/1000))*-90)
           
        
            $(self.el).css({
                "-webkit-transform":"rotateX("+step+"deg)",
                  "-moz-transform":"rotateX("+step+"deg)"
            });
          
           self.rotation = step;
          
          then = now;
         
          if(step >= 30){
            cancelAnimationFrame(animId);
            self.spinFrame();
          }
      }
        
     anim();
     
        
    }
    
    this.spinFrame = function(step) {
      var self = this;
      var then = new Date().getTime();
      var step = 0;
      function anim(){
            self.animId = requestAnimationFrame(anim);
            var now = new Date().getTime();
//            if(step <= -360){
//                step = 0;
//            }else{
//                step = step+Math.round((((then-now)/1000))*360)
//            }
          step = step+Math.round((((then-now)/1000))*360)
           
        
            $(self.el).css({
                "-webkit-transform":"rotateX("+step+"deg)",
                "-moz-transform":"rotateX("+step+"deg)"
            });
          
            then = now;
            self.rotation = step;
      }
        
     anim();
  
    }
    
    
 
    
    
    this.stopSpinFrame = function(){
        cancelAnimationFrame(this.animId);
        this.finalAnimation();
        return this;
    }
    
    this.finalAnimation = function(){
        var then = new Date().getTime();
        var self = this;
        
        var step = self.rotation;
       
        function anim(){
            
            self.animId = requestAnimationFrame(anim);
            
        
          
            
            var now = new Date().getTime();
      
            step = step+Math.ceil((((then-now)/1000))*180)
           
        
            $(self.el).css({
                "-webkit-transform":"rotateX("+step+"deg)",
                "-moz-transform":"rotateX("+step+"deg)"
            });
          
          
          
          then = now;
          if(step % 30 === 0){
            cancelAnimationFrame(self.animId);
            self.reset();
          }
         
      }
        
        anim();
    }
    
    
    this.reset = function(){
        this.isSpinning = false;
        this.rotation = 0;
        this.animId = null;
            
    }
    
    
    return this;
    
};



