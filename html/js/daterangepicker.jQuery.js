jQuery.fn.daterangepicker=function(e){function t(e){if(!e.getDate())return"";{var t=(e.getDate(),e.getMonth());e.getFullYear()}t++;var a=c.dateFormat;return jQuery.datepicker.formatDate(a,e)}function a(){"closed"==h.data("state")&&(n(),h.fadeIn(300).data("state","open"),c.onOpen())}function r(){"open"==h.data("state")&&(h.fadeOut(300).data("state","closed"),c.onClose())}function i(){"open"==h.data("state")?r():a()}function n(){var e=j||d,t=e.offset(),a="left",r=t.left,i=jQuery(window).width()-r-e.outerWidth();r>i&&(a="right",r=i),h.parent().css(a,r).css("top",t.top+e.outerHeight())}function s(e,t,a,r){if(e.is(".ui-daterangepicker-specificDate"))r.hide(),a.show(),t.find(".title-start").text(c.presets.specificDate),t.find(".range-start").restoreDateFromData().css("opacity",1).show(400),t.find(".range-end").restoreDateFromData().css("opacity",0).hide(400),setTimeout(function(){r.fadeIn()},400);else if(e.is(".ui-daterangepicker-allDatesBefore"))r.hide(),a.show(),t.find(".title-end").text(c.presets.allDatesBefore),t.find(".range-start").saveDateToData().datepicker("setDate",c.earliestDate).css("opacity",0).hide(400),t.find(".range-end").restoreDateFromData().css("opacity",1).show(400),setTimeout(function(){r.fadeIn()},400);else if(e.is(".ui-daterangepicker-allDatesAfter"))r.hide(),a.show(),t.find(".title-start").text(c.presets.allDatesAfter),t.find(".range-start").restoreDateFromData().css("opacity",1).show(400),t.find(".range-end").saveDateToData().datepicker("setDate",c.latestDate).css("opacity",0).hide(400),setTimeout(function(){r.fadeIn()},400);else if(e.is(".ui-daterangepicker-dateRange"))r.hide(),a.show(),t.find(".title-start").text(c.rangeStartTitle),t.find(".title-end").text(c.rangeEndTitle),t.find(".range-start").restoreDateFromData().css("opacity",1).show(400),t.find(".range-end").restoreDateFromData().css("opacity",1).show(400),setTimeout(function(){r.fadeIn()},400);else{r.hide(),t.find(".range-start, .range-end").css("opacity",0).hide(400,function(){a.hide()});var i="string"==typeof e.data("dateStart")?Date.parse(e.data("dateStart")):e.data("dateStart")(),n="string"==typeof e.data("dateEnd")?Date.parse(e.data("dateEnd")):e.data("dateEnd")();t.find(".range-start").datepicker("setDate",i).find(".ui-datepicker-current-day").trigger("click"),t.find(".range-end").datepicker("setDate",n).find(".ui-datepicker-current-day").trigger("click")}return!1}var d=jQuery(this);if(0==d.length)return this;if("undefined"==typeof window.langDateRange)var o={today:"Сегодня",lastSevenDay:"За последние 7 дней",thisMonth:"За этот месяц",thisYear:"За этот год",thisLastYear:"За последний год",previousMonth:"Предыдущий месяц",specificDate:"Один день",allDatesBefore:"Все даты до",allDatesAfter:"Все даты после",dateRange:"Выбрать дни",rangeStartTitle:"С:",rangeEndTitle:"По:",nextLinkText:"След.",prevLinkText:"Пред."};else var o=window.langDateRange;var c=jQuery.extend({presetRanges:[{text:o.today,dateStart:"today",dateEnd:"today"},{text:o.lastSevenDay,dateStart:"today-7days",dateEnd:"today"},{text:o.thisMonth,dateStart:function(){return Date.parse("today").moveToFirstDayOfMonth()},dateEnd:"today"},{text:o.thisYear,dateStart:function(){var e=Date.parse("today");return e.setMonth(0),e.setDate(1),e},dateEnd:"today"},{text:o.previousMonth,dateStart:function(){return Date.parse("1 month ago").moveToFirstDayOfMonth()},dateEnd:function(){return Date.parse("1 month ago").moveToLastDayOfMonth()}},{text:o.thisLastYear,dateStart:function(){return Date.parse("1 year ago")},dateEnd:"today"}],presets:{dateRange:o.dateRange},rangeStartTitle:o.rangeStartTitle,rangeEndTitle:o.rangeEndTitle,nextLinkText:o.nextLinkText,prevLinkText:o.prevLinkText,doneButtonText:"ОК",earliestDate:Date.parse("-15years"),latestDate:Date.parse("+15years"),constrainDates:!1,rangeSplitter:"-",dateFormat:"dd.mm.yy",closeOnSelect:!0,arrows:!1,appendTo:"body",onClose:function(){},onOpen:function(){},onChange:function(){},datepickerOptions:null},e),u={onSelect:function(e,a){h.find(".ui-daterangepicker-specificDate").is(".ui-state-active")&&h.find(".range-end").datepicker("setDate",h.find(".range-start").datepicker("getDate")),$(this).trigger("constrainOtherPicker");var i=t(h.find(".range-start").datepicker("getDate")),n=t(h.find(".range-end").datepicker("getDate"));2==d.length?(d.eq(0).val(i),d.eq(1).val(n)):d.val(i!=n?i+" "+c.rangeSplitter+" "+n:i),c.closeOnSelect&&(h.find("li.ui-state-active").is(".ui-daterangepicker-dateRange")||h.is(":animated")||r()),c.onChange()},defaultDate:0};d.bind("change",c.onChange),c.datepickerOptions=e?jQuery.extend(u,e.datepickerOptions):u;var l,p,f,g=Date.parse("today");2==d.size()?(p=Date.parse(d.eq(0).val()),f=Date.parse(d.eq(1).val()),null==p&&(p=f),null==f&&(f=p)):(p=Date.parse(d.val().split(c.rangeSplitter)[0]),f=Date.parse(d.val().split(c.rangeSplitter)[1]),null==f&&(f=p)),null!=p&&(l=p),null!=f&&(g=f);{var h=jQuery('<div class="ui-daterangepicker ui-widget ui-helper-clearfix ui-widget-content ui-corner-all"></div>');!function(){var e=jQuery('<ul class="ui-widget-content"></ul>').appendTo(h);jQuery.each(c.presetRanges,function(){jQuery('<li class="ui-daterangepicker-'+this.text.replace(/ /g,"")+' ui-corner-all"><a href="#">'+this.text+"</a></li>").data("dateStart",this.dateStart).data("dateEnd",this.dateEnd).appendTo(e)});var t=0;return jQuery.each(c.presets,function(a,r){jQuery('<li class="ui-daterangepicker-'+a+" preset_"+t+' ui-helper-clearfix ui-corner-all"><span class="ui-icon ui-icon-triangle-1-e"></span><a href="#">'+r+"</a></li>").appendTo(e),t++}),e.find("li").hover(function(){jQuery(this).addClass("ui-state-hover")},function(){jQuery(this).removeClass("ui-state-hover")}).click(function(){return h.find(".ui-state-active").removeClass("ui-state-active"),jQuery(this).addClass("ui-state-active"),s(jQuery(this),h,D,v),!1}),e}()}jQuery.fn.restoreDateFromData=function(){return jQuery(this).data("saveDate")&&jQuery(this).datepicker("setDate",jQuery(this).data("saveDate")).removeData("saveDate"),this},jQuery.fn.saveDateToData=function(){return jQuery(this).data("saveDate")||jQuery(this).data("saveDate",jQuery(this).datepicker("getDate")),this};var D=jQuery('<div class="ranges ui-widget-header ui-corner-all ui-helper-clearfix"><div class="range-start"><span class="title-start">Start Date</span></div><div class="range-end"><span class="title-end">End Date</span></div></div>').appendTo(h);D.find(".range-start, .range-end").datepicker(c.datepickerOptions),D.find(".range-start").datepicker("setDate",l),D.find(".range-end").datepicker("setDate",g),D.find(".range-start, .range-end").bind("constrainOtherPicker",function(){c.constrainDates&&($(this).is(".range-start")?h.find(".range-end").datepicker("option","minDate",$(this).datepicker("getDate")):h.find(".range-start").datepicker("option","maxDate",$(this).datepicker("getDate")))}).trigger("constrainOtherPicker");var v=jQuery('<button class="btnDone ui-state-default ui-corner-all">'+c.doneButtonText+"</button>").click(function(){h.find(".ui-datepicker-current-day").trigger("click"),r()}).hover(function(){jQuery(this).addClass("ui-state-hover")},function(){jQuery(this).removeClass("ui-state-hover")}).appendTo(D);if(jQuery(this).click(function(){return i(),!1}),D.hide().find(".range-start, .range-end, .btnDone").hide(),h.data("state","closed"),D.find(".ui-datepicker").css("display","block"),jQuery(c.appendTo).append(h),h.wrap('<div class="ui-daterangepickercontain"></div>'),c.arrows&&1==d.size()){var y=jQuery('<a href="#" class="ui-daterangepicker-prev ui-corner-all" title="'+c.prevLinkText+'"><span class="ui-icon ui-icon-circle-triangle-w">'+c.prevLinkText+"</span></a>"),k=jQuery('<a href="#" class="ui-daterangepicker-next ui-corner-all" title="'+c.nextLinkText+'"><span class="ui-icon ui-icon-circle-triangle-e">'+c.nextLinkText+"</span></a>");jQuery(this).addClass("ui-rangepicker-input ui-widget-content").wrap('<div class="ui-daterangepicker-arrows ui-widget ui-widget-header ui-helper-clearfix ui-corner-all"></div>').before(y).before(k).parent().find("a").click(function(){var e=D.find(".range-start").datepicker("getDate"),t=D.find(".range-end").datepicker("getDate"),a=Math.abs(new TimeSpan(e-t).getTotalMilliseconds())+864e5;return jQuery(this).is(".ui-daterangepicker-prev")&&(a=-a),D.find(".range-start, .range-end ").each(function(){var e=jQuery(this).datepicker("getDate");return null==e?!1:void jQuery(this).datepicker("setDate",e.add({milliseconds:a})).find(".ui-datepicker-current-day").trigger("click")}),!1}).hover(function(){jQuery(this).addClass("ui-state-hover")},function(){jQuery(this).removeClass("ui-state-hover")});var j=d.parent()}return jQuery(document).click(function(){h.is(":visible")&&r()}),h.click(function(){return!1}).hide(),this};