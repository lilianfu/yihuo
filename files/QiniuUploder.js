;(function($, window, document, undefined) {
	var _QiniuUpload = function(obj, opt) {
		 this.obj = obj;
 		 this.defaults = {
              uptoken_url: arguments[1].uptoken_url || this.obj.data('uptoken_url'),
			  domain: arguments[1].domain || this.obj.data('domain'),
			  ele: arguments[1].ele || this.obj.data('ele'),
			  unique_names: arguments[1].unique_names || this.obj.data('unique_names'),
			  max_file_size: arguments[1].max_file_size || this.obj.data('max_file_size'),
			  chunk_size: arguments[1].chunk_size || this.obj.data('chunk_size'),
			  max_retries: arguments[1].max_retries || this.obj.data('max_retries'),
			  BeforeUpload: arguments[1].BeforeUpload || function(){},
			  PreviewSuccess: arguments[1].PreviewSuccess || function(){},
			  PreviewError: arguments[1].PreviewError || function(){},
			  FileTypeError: arguments[1].FileTypeError || function(){},
			  Error: arguments[1].Error || function(){},
			  FileUploaded: arguments[1].FileUploaded || function(){},
			  UploadProgress: arguments[1].UploadProgress || function(){},
			  FilesAdded: arguments[1].FilesAdded || function(){},
			  width: arguments[1].width ||this.obj.data('width')
 			 
  		 };
		 this.params = $.extend({}, this.defaults, opt);
		
	 };
	_QiniuUpload.prototype.init = function(){
		               params = this.params;
		               params.ele = params.ele || 'qiniu_uplaoder';
		               params.unique_names = params.unique_names || true;
		               params.max_file_size = params.max_file_size || 5;
		               params.chunk_size = params.chunk_size || 4;
		               params.max_retries = params.max_retries || 3;
 		
		               if((mOxie.Env.OS.toLowerCase()==="android") && is_weixn()){
		                  params.filters = {
						      max_file_size : params.max_file_size+'mb',
						      prevent_duplicates: true,
 						      }
		               }else{
						  params.filters = {
						      max_file_size : params.max_file_size+'mb',
						      prevent_duplicates: true,
						      mime_types: [
  						       {title : "", extensions : "jpg,gif,png"}, // 限定jpg,gif,png后缀上传
						       //{title : "Zip files", extensions : "zip"} // 限定zip后缀上传
						       ]
						     }
						} 
		               this.obj.parent().attr('id','parent_'+params.ele +'_'+ this.obj.index());//生成父级随机ID
		               this.obj.attr('id','myself_'+params.ele +'_'+ this.obj.index());//生成自身随机ID
		               params.container = this.obj.parent().attr('id');
		               params.browse_button = this.obj.attr('id');
   				 	   var uploader = Qiniu.uploader({
                            runtimes: 'html5,flash,html4',    //上传模式,依次退化
                            browse_button: params.browse_button,       //上传选择的点选按钮，**必需**
                            uptoken_url:  params.uptoken_url,            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
                            // uptoken : 'token', //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
                            unique_names:  params.unique_names, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
                            save_key: false,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
		                    domain: params.domain,   //bucket 域名，下载资源时用到，**必需**
                            get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
                            container: params.container,           //上传区域DOM ID，默认是browser_button的父元素，
                            max_file_size: params.max_file_size+'mb',           //最大文件体积限制
                            flash_swf_url: '/static/plupload/2.1.2/js/Moxie.swf',  //引入flash,相对路径
                            max_retries: params.max_retries,                   //上传失败最大重试次数
                            dragdrop: true,                   //开启可拖曳上传
                            drop_element: params.container,        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                            chunk_size: params.chunk_size+'mb',                //分块上传时，每片的体积
                            auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
		                    multi_selection: false,
						   // multi_selection: !(mOxie.Env.OS.toLowerCase()==="ios"),
		                     prevent_duplicates : true, //不允许选取重复文件
						     filters : params.filters,
 						     resize: {width: params.width,crop: false,quality: 90,preserve_headers: false},
		     		         
                             init: {
                                 'FilesAdded': function(up, files) {
									 params.FilesAdded(up,files);
 									if (files[0].type != 'image/gif' && files[0].type != 'image/jpg' && files[0].type != 'image/jpeg' && files[0].type != 'image/png'  ){
								         up.stop();
										 params.FileTypeError(up, files);
									}else{
									  try{previewImage(files[0],params.width, function (imgsrc) {params.PreviewSuccess(up, files,imgsrc)})}catch(e){params.PreviewError(up, files)}	
									}
									 
                                  },
                                 'BeforeUpload': function(up, file) {
									  params.BeforeUpload(up,file);
										
                                   },
                                'UploadProgress': function(up, file) {
									params.UploadProgress(up, file);
  									 
                                 },
                                'FileUploaded': function(up, file, info) {
                                      var domain = up.getOption('domain');
 									  params.FileUploaded(up, file, $.parseJSON(info));
                                  },
                                'Error': function(up, err, errTip) {
 									  params.Error(up, err, errTip);
 									 
                                 },
                                'UploadComplete': function() {
									
                                 },
                                'Key': function(up, file) {
                                    // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                                    // 该配置必须要在 unique_names: false , save_key: false 时才生效
                                    // var key = TimeObjectUtil.longMsTimeConvertToDateTime2(TimeObjectUtil.getCurrentMsTime())+'_'+file.name;
                                    // do something with key here
                                   // return key;
                                }
                            }
                        });
 		
  	};
	var  is_weixn = function (){  
    var ua = navigator.userAgent.toLowerCase();  
    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
        return true;  
    } else {  
        return false;  
    }  
} 
	 var previewImage  = function (file, width,callback) {  
		    
                if (!file || !/image\//.test(file.type)) {return false} //确保文件是图片
                if (file.type == 'image/gif') { 
                    var fr = new mOxie.FileReader();
                    fr.onload = function () {
                        callback(fr.result);
                        fr.destroy();
                        fr = null;
                    }
                    fr.readAsDataURL(file.getSource());
                } else {
                    var preloader = new mOxie.Image();
                    preloader.onload = function () {
                         preloader.downsize(width);//压缩图片
                        var imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 90) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
                        callback && callback(imgsrc);  
                        preloader.destroy();
                        preloader = null;
                    };
                    preloader.load(file.getSource());
                }
			
   };
	
	$.fn.QiniuUploader = function(options) {new _QiniuUpload(this, options).init()}
	
})(jQuery, window, document);