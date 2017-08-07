;(function( global ){
 

//if current browser is not support localStorage
// use cookie to make a polyfill
if (!window.localStorage ) {
    window.localStorage = {
        setItem: function (key, value) {
            createCookie(key, value, 30);
        },
        getItem: function (key) {
            return readCookie(key);
        },
        removeItem: function (key) {
            createCookie(key, '', -1);
        }
    };
}
   	  
	  
function mrLoading(){
	var that = this,loadmore = {page:1,data:{},status:false,more:true};
 	 
 this.start = function(){
	  var param = {
 			     type: arguments[0].type || "windows",
				 object: arguments[0].object || $('#lists'),
				 loading: arguments[0].loading || "loading",
 			     success: arguments[0].success || function() {},
			     error: arguments[0].error || function() {},
 		};
	if(param.type === 'windows'){
     $(document).ready(function () {  
         $(window).scroll(function () {
             var bottom = 0;  
             if ((bottom + $(window).scrollTop()) >= ($(document).height() - $(window).height())) {
                if(loadmore.status == false){ that.ajaxUrl(param)} 
             }
           });
       });
	}else{
 		$(document).ready(function () {  
			param.object.on('scroll',function(){
		     var viewH = $(this).height(),  contentH =$(this).get(0).scrollHeight, scrollTop =$(this).scrollTop();  
             if (contentH - viewH - scrollTop > 0) { if(loadmore.status === false){that.ajaxUrl(param)}}
           });
		 });
	}
 };
 
	this.ajaxUrl = function(param){
        loadmore.status = true;
		loadmore.page++;
		param.loading.show();
		 if(!param.object.data('url')){param.error('请求地址错误')}
	    $.ajax({
		  url:param.object.data('url'),type:"POST",dataType:"json",data:{page:loadmore.page},success: function(data){
			  loadmore.data = data.data;
			  if(loadmore.data){
			      param.success(loadmore.data)
				 loadmore.status = false;
				 param.loading.hide()
			  }else{
				  loadmore.more = true;
				  loadmore.status = true;
				   param.loading.html('没有更多数据了')
			  }
  		 },error:function(){
			  param.error('加载超时自动重试中');
 			 loadmore.status = false;param.loading.hide();
			 that.ajaxUrl(param);
			 }
	    });	
	};
}
    
var Loading = new mrLoading();global.Loading = Loading;global.mrLoading = mrLoading;
 
})( window );



