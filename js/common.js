//dom加载完成后执行的js
 
lrFixFooter(".footer"); 
function lrFixFooter(obj){var footer = $(obj),doc = $(document);
function fixFooter(){if(doc.height()-4 <= $(window).height()){footer.css({position:"absolute",left:0,bottom:0});}else{footer.css({position:"absolute"})}}
fixFooter();
$(window).on('resize.footer', function(){fixFooter()});
$(window).on('scroll.footer',function(){fixFooter();});	}


	//ajax get请求
	$('.ajax-get').click(function() {
		var target;
		var that = this;
		var tip = '确认要执行该操作吗?';
		if ($(this).attr('tip')) {
			tip = $(this).attr('tip')
		};
		if ($(this).hasClass('confirm')) {
			if (!confirm(tip)) {
				return false;
			}
		}
		if ((target = $(this).attr('href')) || (target = $(this).attr('url'))) {
			$.get(target).success(function(data) {
				if (data.status >= 1) {
					if (data.url) {
						setTimeout(function(){
							window.location.href = data.url;
						 },1000)
 					} else {
						maoren.msg({info:data.info});
					}
				} else {
					maoren.msg({info:data.info});
				}
			});

		}
		return false;
	});


	//ajax post submit请求
	$('.ajax-post').click(function() {
		var target, query, form, target_form = $(this).attr('target'),callback=$(this).data('callback');
		var that = this,
			loadingText = $(this).attr('loadingText'),
			oldText = $(this).html(),
			tips = $(this).attr('tips');
		var nead_confirm = false;
		var ajax_login = $(this).attr('ajax-login');
		
		if (!$(this).attr('type') && !$(this).attr('href') && !$(this).attr('url')) {
			maoren.msg({info:'表单类型错误'});return false;
		}
  		if (($(this).attr('type') == 'submit') || (target = $(this).attr('href')) || (target = $(this).attr('url'))) {
			form = $('.' + target_form);
			if ($(this).attr('hide-data') === 'true') {
				form = $('.hide-data');
				query = form.serialize();
 			} else if (form.get(0) == undefined) {
  				maoren.msg({info:'无表单数据提交'});
				return false;
			} else if (form.get(0).nodeName == 'FORM') {
				if ($(this).hasClass('confirm')) {if (!confirm('确认要执行该操作吗?')) {return false}}
				if ($(this).attr('url') !== undefined) {target = $(this).attr('url')} else {target = form.get(0).action}
				query = form.serialize();
			} else if (form.get(0).nodeName == 'INPUT' || form.get(0).nodeName == 'SELECT' || form.get(0).nodeName == 'TEXTAREA') {
				form.each(function(k, v) {
					if (v.type == 'checkbox' && v.checked == true) {nead_confirm = true}
				})
				if (nead_confirm && $(this).hasClass('confirm')) {
					if (!confirm('确认要执行该操作吗?')) {return false}
				}
				query = form.serialize();
			} else {
				if ($(this).hasClass('confirm')) {if (!confirm('确认要执行该操作吗?')) {return false}}
				query = form.find('input,select,textarea').serialize();
			}

			$(that).attr('autocomplete', 'off').prop('disabled', true);
		  	 if (loadingText) { $(that).html(loadingText) }
			$.ajax({
				url: target,
				type: "POST",
				dataType: "json",
				data: query,
				success: function(data) {
  					maoren.msg({info:data.info});
					if(callback){
 						 window[callback](data);
 					 }
					if (data.url) {
						 setTimeout(function(){
							window.location.href = data.url;
						 },1000)} 
					$(that).prop('disabled', false);
					if (loadingText) {$(that).html(oldText)}
					
				},
				error: function(data) {
					maoren.msg({info:'请求超时，请重试！'});
					$(that).prop('disabled', false);
					if (loadingText) {$(that).html(oldText)}
				}
			});
		}
		return false;
	});  
	
 
/**输入框删除小图标*/
 $('.input-del').find('input').keyup(function(){
	 var s = $(this).val().length,browser=navigator.appName ;
	  if(s>0 && browser != "Microsoft Internet Explorer"){$(this).parent().find('i').css('display','inline-block')}else{$(this).parent().find('i').hide()}
  });
$('.icon-input-del').click(function(){$(this).parent().find('input').val('');$(this).hide()})
 

function SetHome(obj, vrl) {
	try {
		obj.style.behavior = 'url(#default#homepage)';
		obj.setHomePage(vrl);
	} catch (e) {
		if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			} catch (e) {
				alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
			}
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage', vrl);
		} else {
			alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入：" + vrl + "点击确定。");
		}
	}
}

function shoucang(sTitle, sURL) {
	try {
		window.external.addFavorite(sURL, sTitle);
	} catch (e) {
		try {
			window.sidebar.addPanel(sTitle, sURL, "");
		} catch (e) {
			alert("加入收藏失败，请使用Ctrl+D进行添加");
		}
	}
}
 function as(obj){obj.addClass('am-animation-shake')}
 function rs(obj){obj.removeClass('am-animation-shake')}
 function isMobile(mobile){var r=false;if(!mobile){r=false}if(mobile.match(/^(((13[0-9]{1})|159|153)+\d{8})$/)) { r=true; }return r;}
 function is_weixin(){if(window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'){return true;}else{return false}}
 
 
 
 