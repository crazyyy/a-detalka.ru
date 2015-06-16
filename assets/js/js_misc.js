function MM_openBrWindow2(theURL1, winName, w, h) { //v2.0
	var tmp = window.open(theURL1,winName,
		'Width='+w+',Height='+h+
		',Left='+Math.ceil(screen.width/2-w/2)+
		',Scrollbars=1,'+
		'Top='+Math.ceil(screen.height/2-h/2-7));
}

function _frm_digits() {
	if ((event.keyCode < 48) || (event.keyCode > 57)) {
		event.returnValue = false;
	}
}

function _frm_digits_float() {
	if ((event.keyCode !=44) && (event.keyCode!=45) && (event.keyCode!=46)) {
		if ((event.keyCode < 48) || (event.keyCode > 57)) {
			event.returnValue = false;
		}
	}
}

// находит единственный чекбокс в каждой строке таблички и отчечает/снимает отметки
function markRows(container_id, is_checked) {
	var rows = document.getElementById(container_id).getElementsByTagName('tr');
	var checkboxs;
	var checkbox;

	for (var i = 0; i < rows.length; i++) {
		checkboxs = rows[i].getElementsByTagName( 'input' );
		for (var j = 0; j < checkboxs.length; j++) {
			checkbox = checkboxs[j];
			if ( checkbox && checkbox.type == 'checkbox' && !checkbox.disabled
					&& typeof(checkbox.name) != 'undefined'
					&& ((checkbox.name.indexOf('mas_edit[') == 0) || (checkbox.name.indexOf('mas_pos[') == 0))) {
				checkbox.checked = is_checked;
			}
		}
	}
	return true;
}

// устанавливает / снимает стиль display: "none" для указанной секции
function showOrHideSection(secNum) {
	secNum.style.display = (secNum.style.display == 'none') ? '' : 'none';
}

function showOrHideSectionById(blockId) {
	var block = document.getElementById(blockId);
	block.style.display = (block.style.display == 'none') ? '' : 'none';
}

function goToURL(sUrl) {
	if (sUrl) {
		parent.document.location.href = sUrl;
	}
}

function getBasketId() {
	if ($("select[name='switchBasketId']").length > 0) {
		return $("select[name='switchBasketId']").val();
	}
	return 0;
}

function updateBasketLegend() {
	if ($("div.basketLegend").is("div")) {
		var goodiesTextArray = ['товар', 'товара', 'товаров'];
		$.ajax({
			url: 'http://admin.abcp.ru/ajax/modules/cart/get.cart.info.php',
			dataType: 'jsonp',
			data: {
				'clientId': clientId,
				'resellerId': resellerId,
				'basketId': getBasketId(),
				'cookies': document.cookie
			},
			type: 'GET',
			success: function(data) {
				if (data && data.status == "ok") {
					$("div.basketLegend .artCount").fadeOut(200,function() {
						$(this).html(data.cnt).fadeIn(200);
					});
					$("div.basketLegend .moneySumm").fadeOut(200,function() {
						$(this).html(data.summ).fadeIn(200);
					});
					$("div.basketLegend .qty").fadeOut(200,function() {
						if (data.qty > 0) {
							$("div.basketLegend").addClass("liveBasketNotEmpty");
						} else {
							$("div.basketLegend").removeClass("liveBasketNotEmpty");
						}
						$(this).html(data.qty).fadeIn(200);
					});
					$("div.basketLegend .goodiesText").fadeOut(200,function() {
						$(this).html(getDeclensionString(data.qty,goodiesTextArray)).fadeIn(200);
					});
					$(document).trigger('basketLegendUpdate');
				}
			}
		});
	}
}
/*
 * копирует значение чекбоксов в скрытые поля для передачи неактивных чекбоксов в POST.
 * пример использования
 * <input type="checkbox" id="enableSendingSms" name="enableSendingSms" {if $tpl_data.enableSendingSms}checked="checked"{/if} class="copyToHidden"/>
 * <input type="hidden" name="enableSendingSms"/>
 */
function copyToHiddenField() {
	var name = $(this).attr('name');
	var value = ($(this).attr('checked') == 'checked') ? 1 : 0;
	$('input[type=hidden][name=' + name + ']').val(value);
}

function selectField(obj) {
	$(obj).select();
}

function basketSwitcher() {
	$('select[name="switchBasketId"]').change(function(event) {
		$('form[name="switchBasketForm"]').submit();
	});
}

function progressBarLoading() {
	document.getElementById('progressbar').style.display = 'block';
	document.getElementById('darkscreen').style.display = 'block';
	document.getElementById('darkscreen_foot').style.display='block';
	document.getElementById('barText').style.display='block';
}

function getDeclensionString(n,stringArray) {
	if (!stringArray) {
		stringArray = ['день', 'дня', 'дней'];
	}
	n = Math.abs(n) % 100;
	n1 = n % 10;
	if (n > 10 && n < 20) {
		return stringArray[2];
	}
	if (n1 > 1 && n1 < 5) {
		return stringArray[1];
	}
	if (n1 == 1) {
		return stringArray[0];
	}
	return stringArray[2];
}

/**
 * @param carapplicability "/carapplicability.json/" - старый вариант, "/wheel_calc.json/" - новый, с группировкой по ET
 */
function carApplicabilityInit(carapplicability) {
	if (carapplicability === undefined) {
		carapplicability = "/carapplicability.json/";
	}
	if (isNoNeedToInitCABlock) {
		$('#carApplicabilityBlock #vendors').removeAttr('disabled');
		if ($.cookie('CAVendorCookie')) {
			$('#carApplicabilityBlock #cars').removeAttr('disabled');
		}
		if ($.cookie('CACarCookie')) {
			$('#carApplicabilityBlock #years').removeAttr('disabled');
		}
		if ($.cookie('CAYearCookie')) {
			$('#carApplicabilityBlock #modifications').removeAttr('disabled');
		}
		carApplicabilityHandlersInit(carapplicability);
	} else {
		$('#carApplicabilityBlock #vendors').html('<option value="">' + chooseVendorDefaultOption + '</option>');
		$('#carApplicabilityBlock #vendors').attr('disabled', 'disabled');
		$('#carApplicabilityBlock #cars').html('<option value="">' + chooseModelDefaultOption + '</option>');
		$('#carApplicabilityBlock #cars').attr('disabled', 'disabled');
		$('#carApplicabilityBlock #years').html('<option value="">' + chooseYearDefaultOption + '</option>');
		$('#carApplicabilityBlock #years').attr('disabled', 'disabled');
		$('#carApplicabilityBlock #modifications').html('<option value="">' + chooseModificationDefaultOption + '</option>');
		$('#carApplicabilityBlock #modifications').attr('disabled', 'disabled');
		$('#CAResults').html('');
		$.ajax({
			url: SiteLocale + carapplicability,
			dataType: "json",
			type: "get",
			success: function(data) {
				if (data) {
					if (data.vendors) {
						$('#carApplicabilityBlock #vendors').html('<option value="">' + chooseVendorDefaultOption + '</option>');
						$.each(data.vendors, function(index, value) {
							$('#vendors').append('<option value="' + value + '">' + value + '</option>');
						});
						$('#carApplicabilityBlock #vendors').removeAttr('disabled');
					}
					carApplicabilityHandlersInit(carapplicability);
				}
			}
		});
		isNoNeedToInitCABlock= true;
	}
}

function carApplicabilityHandlersInit(carapplicability) {
	$('.CASelects').off();
	$('.CASelects').change(function() {
		var vendor = $('#carApplicabilityBlock #vendors').val();
		var car = $('#carApplicabilityBlock #cars').val();
		var year = $('#carApplicabilityBlock #years').val();
		var modification = $('#carApplicabilityBlock #modifications').val();
		var requestParameters = {};
		if ($(this).attr('id') == 'modifications') {
			if (vendor && car && year && modification) {
				requestParameters = {vendors: vendor, cars: car, years: year, modifications: modification};
				$.cookie('CAModificationCookie', modification);
			}
		} else if ($(this).attr('id') == 'years') {
			$('#carApplicabilityBlock #modifications').html('<option value="">' + chooseModificationDefaultOption + '</option>');
			$('#carApplicabilityBlock #modifications').attr('diabled', 'disabled');
			$('#CAResults').html('');
			if (vendor && car && year) {
				requestParameters = {vendors: vendor, cars: car, years: year};
				$.cookie('CAYearCookie', year);
				$.cookie('CAModificationCookie', null);
			}
		} else if ($(this).attr('id') == 'cars') {
			$('#carApplicabilityBlock #years').html('<option value="">' + chooseYearDefaultOption + '</option>');
			$('#carApplicabilityBlock #years').attr('disabled', 'disabled');
			$('#carApplicabilityBlock #modifications').html('<option value="">' + chooseModificationDefaultOption +'</option>');
			$('#carApplicabilityBlock #modifications').attr('disabled', 'disabled');
			$('#CAResults').html('');
			if (vendor && car) {
				requestParameters = {vendors: vendor, cars: car};
				$.cookie('CACarCookie', car);
				$.cookie('CAYearCookie', null);
				$.cookie('CAModificationCookie', null);
			}
		} else if ($(this).attr('id') == 'vendors') {
			$('#carApplicabilityBlock #cars').html('<option value="">' + chooseModelDefaultOption + '</option>');
			$('#carApplicabilityBlock #cars').attr('disabled', 'disabled');
			$('#carApplicabilityBlock #years').html('<option value="">' + chooseYearDefaultOption + '</option>');
			$('#carApplicabilityBlock #years').attr('disabled', 'disabled');
			$('#carApplicabilityBlock #modifications').html('<option value="">' + chooseModificationDefaultOption +'</option>');
			$('#carApplicabilityBlock #modifications').attr('disabled', 'disabled');
			$('#CAResults').html('');
			if (vendor) {
				requestParameters = {vendors: vendor};
				$.cookie('CAVendorCookie', vendor);
				$.cookie('CACarCookie', null);
				$.cookie('CAYearCookie', null);
				$.cookie('CAModificationCookie', null);
			}
		}

		if (requestParameters) {
			$.ajax({
				url: SiteLocale + carapplicability,
				dataType: "json",
				data: requestParameters,
				type: "get",
				success: function(data) {
					if (data) {
						if (data.result) {
							$('#CAResults').html(data.result);
						}
						if (data.cars) {
							$('#carApplicabilityBlock #cars').html('<option value="">' + chooseModelDefaultOption + '</option>');
							$.each(data.cars, function(index, value) {
								$('#carApplicabilityBlock #cars').append('<option value="' + value + '">' + value + '</option>');
							});
							$('#carApplicabilityBlock #cars').removeAttr('disabled');
						}
						if (data.years) {
							$('#carApplicabilityBlock #years').html('<option value="">' + chooseYearDefaultOption + '</option>');
							$.each(data.years, function(index, value) {
								$('#carApplicabilityBlock #years').append('<option value="' + value + '">' + value + '</option>');
							});
							$('#carApplicabilityBlock #years').removeAttr('disabled');
						}
						if (data.modifications) {
							$('#carApplicabilityBlock #modifications').html('<option value="">' + chooseModificationDefaultOption +'</option>');
							$.each(data.modifications, function(index, value) {
								$('#carApplicabilityBlock #modifications').append('<option value="' + value + '">' + value + '</option>');
							});
							$('#carApplicabilityBlock #modifications').removeAttr('disabled');
						}
					}
				}
			});
		}
	});
}

function changeSearchStatus(status) {
	if (status == 'searching') {
		$('#modificationFullNameDiv').html('<span id="carbaseAjaxloader"><img src="//astatic.abcp.ru/common.images/ajaxloader_smll.gif" /></span>');
		$('#carbaseAjaxloader').show();
	} else {
		$('#carbaseAjaxloader').hide();
	}
}

function carbaseFullApplicabilityBlockInit() {
	$('#years').html('<option value="">'+carbaseApplBlockCarYear+'</option>');
	$('#years').attr('disabled', 'disabled');

	$('#manufacturers').html('<option value="">'+carbaseApplBlockCarManufacturer+'</option>');
	$('#manufacturers').attr('disabled', 'disabled');
	$('#manufacturers').val('');

	$('#models').html('<option value="">'+carbaseApplBlockCarModel+'</option>');
	$('#models').attr('disabled', 'disabled');
	$('#models').val('');

	$('#modifications').html('<option value="">'+carbaseApplBlockCarModification+'</option>');
	$('#modifications').attr('disabled', 'disabled');
	$('#modifications').val('');

	$('#garageName').attr('disabled', 'disabled');
	$('#garageName').val('');
	$('#garageVin').attr('disabled', 'disabled');
	$('#garageVin').val('');
	$('#garageMileage').attr('disabled', 'disabled');
	$('#garageMileage').val('');
	$('#garageDescription').attr('disabled', 'disabled');
	$('#garageDescription').val('');
	$('#garageSubmit').attr('disabled', 'disabled');

	changeSearchStatus('searching');
	$.ajax({
		url: "http://admin.abcp.ru/ajax/modules/car.choice/carbase.applicability.json.php",
		dataType: "jsonp",
		type: "get",
		success: function(data) {
			if (data) {
				changeSearchStatus('stopsearching');
				if (data.years) {
					$('#years').html('<option value="" disabled="disabled" selected="selected">'+carbaseApplBlockCarYear+'</option>');
					$.each(data.years, function(index, value) {
						$('#years').append('<option value="' + value + '">' + value + '</option>');
					});
					$('#years').removeAttr('disabled');
					$('#manufacturers').attr('disabled', 'disabled');
					$('#manufacturers').val('');
					$('#models').attr('disabled', 'disabled');
					$('#models').val('');
					$('#modifications').attr('disabled', 'disabled');
					$('#modifications').val('');
				}
				carbaseFullApplicabilityHandlersInit();
			}
		}
	});
}

function carbaseFullApplicabilityHandlersInit() {
	$('.carbaseApplicabilitySelect').off();
	$('.carbaseApplicabilitySelect').change(function() {
		var year = $('#years').val();
		var manufacturer = $('#manufacturers').val();
		var model = $('#models').val();
		var isPopular = true;
		var requestParameters = {};
		if ($(this).attr('id') == 'modifications') {
			return;
		} else if ($(this).attr('id') == 'models') {
			$('#modifications').attr('disabled', 'disabled');
			$('#modifications').val('');
			$('#garageName').attr('disabled', 'disabled');
			$('#garageVin').attr('disabled', 'disabled');
			$('#garageMileage').attr('disabled', 'disabled');
			$('#garageDescription').attr('disabled', 'disabled');
			$('#garageSubmit').attr('disabled', 'disabled');
			if (year && manufacturer && model) {
				requestParameters = {years: year, manufacturers: manufacturer, models: model, isPopular: isPopular};
			}
		} else if ($(this).attr('id') == 'manufacturers') {
			$('#models').attr('disabled', 'disabled');
			$('#models').val('');
			$('#modifications').attr('disabled', 'disabled');
			$('#modifications').val('');
			$('#garageName').attr('disabled', 'disabled');
			$('#garageVin').attr('disabled', 'disabled');
			$('#garageMileage').attr('disabled', 'disabled');
			$('#garageDescription').attr('disabled', 'disabled');
			$('#garageSubmit').attr('disabled', 'disabled');
			if (year && manufacturer) {
				requestParameters = {years: year, manufacturers: manufacturer, isPopular: isPopular};
			}
		} else if ($(this).attr('id') == 'years') {
			$('#manufacturers').attr('disabled', 'disabled');
			$('#manufacturers').val('');
			$('#models').attr('disabled', 'disabled');
			$('#models').val('');
			$('#modifications').attr('disabled', 'disabled');
			$('#modifications').val('');
			$('#garageName').attr('disabled', 'disabled');
			$('#garageVin').attr('disabled', 'disabled');
			$('#garageMileage').attr('disabled', 'disabled');
			$('#garageDescription').attr('disabled', 'disabled');
			$('#garageSubmit').attr('disabled', 'disabled');
			if (year) {
				requestParameters = {years: year, isPopular: isPopular};
			}
		}

		if (requestParameters) {
			changeSearchStatus('searching');
			$.ajax({
				url: "http://admin.abcp.ru/ajax/modules/car.choice/carbase.applicability.json.php",
				dataType: "jsonp",
				data: requestParameters,
				type: "get",
				success: function(data) {
					if (data) {
						changeSearchStatus('stopsearching');
						if (data.manufacturers) {
							$('#manufacturers').html('<option value="" disabled="disabled" selected="selected">'+carbaseApplBlockCarManufacturer+'</option>');
							$.each(data.manufacturers, function(index, value) {
								$('#manufacturers').append('<option value="' + value.id + '">' + value.name.toUpperCase() + '</option>');
							});
							$('#manufacturers').removeAttr('disabled');
						}
						if (data.models) {
							$('#models').html('<option value="" disabled="disabled" selected="selected">'+carbaseApplBlockCarModel+'</option>');
							$.each(data.models, function(index, value) {
								$('#models').append('<option value="' + value.id + '">' + value.name + '</option>');
							});
							$('#models').removeAttr('disabled');
						}
						if (data.modifications) {
							$('#modifications').html('<option value="" disabled="disabled" selected="selected">'+carbaseApplBlockCarModification+'</option>');
							$.each(data.modifications, function(index, value) {
								$('#modifications').append('<option value="' + value.id + '">' + value.name + ' ' + value.hpFrom + ' л.с.</option>');
							});
							$('#modifications').removeAttr('disabled');

							$("select[name='modifications']").change(function() {
								var modificationFullName = $("#manufacturers option:selected").text()+' '+$("#models option:selected").text()+' '+$("#modifications option:selected").text();
								$('#modificationFullNameDiv').html('<span>' + modificationFullName + '</span>');
								$('#garageName').removeAttr('disabled');
								$('#garageVin').removeAttr('disabled');
								$('#garageMileage').removeAttr('disabled');
								$('#garageDescription').removeAttr('disabled');
								$('#garageSubmit').removeAttr('disabled');
							});
						}
					}
				}
			});
		}
	});
}

function carbaseQuickApplicabilityBlockInit() {
	$('.carbaseAutoChoise #years').html('<option value="">'+carbaseApplBlockCarYear+'</option>');
	$('.carbaseAutoChoise #manufacturers').html('<option value="">'+carbaseApplBlockCarManufacturer+'</option>');
	$('.carbaseAutoChoise #models').html('<option value="">'+carbaseApplBlockCarModel+'</option>');
	$('.carbaseAutoChoise #modifications').html('<option value="">'+carbaseApplBlockCarModification+'</option>');

	$.ajax({
		url: "http://admin.abcp.ru/ajax/modules/car.choice/carbase.applicability.json.php",
		dataType: "jsonp",
		type: "get",
		success: function(data) {
			if (data) {
				if (data.years) {
					$('.carbaseAutoChoise #years').html('<option value="" disabled="disabled" selected="selected">'+carbaseApplBlockCarYear+'</option>');
					$.each(data.years, function(index, value) {
						$('.carbaseAutoChoise #years').append('<option value="' + value + '">' + value + '</option>');
					});
					$('.carbaseAutoChoise #years').removeAttr('disabled');
				}
				carbaseQuickApplicabilityHandlersInit();
			}
		}
	});
}

function carbaseQuickApplicabilityHandlersInit() {
	$('.carbaseApplicabilitySelect').off();
	$('.carbaseApplicabilitySelect').change(function() {
		var year = $('.carbaseAutoChoise #years').val();
		var manufacturer = $('.carbaseAutoChoise #manufacturers').val();
		var model = $('.carbaseAutoChoise #models').val();
		var requestParameters = {};
		if ($(this).attr('id') == 'modifications') {
			return;
		} else if ($(this).attr('id') == 'models') {
			$('.carbaseAutoChoise #modifications').attr('disabled', 'disabled');
			$('.carbaseAutoChoise #modifications').val('');
			$('#goToCarbaseBtn').attr('disabled', 'disabled');
			$('.carbaseAutoChoiseImage').html('');
			requestParameters = {isPopular: 1, years: year, manufacturers: manufacturer, models: model};
		} else if ($(this).attr('id') == 'manufacturers') {
			$('.carbaseAutoChoise #models').attr('disabled', 'disabled');
			$('.carbaseAutoChoise #models').val('');
			$('.carbaseAutoChoise #modifications').attr('disabled', 'disabled');
			$('.carbaseAutoChoise #modifications').val('');
			$('.carbaseAutoChoiseImage').html('');
			$('#goToCarbaseBtn').attr('disabled', 'disabled');
			requestParameters = {isPopular: 1, years: year, manufacturers: manufacturer};
		} else if ($(this).attr('id') == 'years') {
			$('.carbaseAutoChoise #manufacturers').attr('disabled', 'disabled');
			$('.carbaseAutoChoise #manufacturers').val('');
			$('.carbaseAutoChoise #models').attr('disabled', 'disabled');
			$('.carbaseAutoChoise #models').val('');
			$('.carbaseAutoChoise #modifications').attr('disabled', 'disabled');
			$('.carbaseAutoChoise #modifications').val('');
			$('.carbaseAutoChoiseImage').html('');
			$('#goToCarbaseBtn').attr('disabled', 'disabled');
			if (year) {
				requestParameters = {isPopular: 1, years: year};
			}
		}

		if (requestParameters) {
			$.ajax({
				url: "http://admin.abcp.ru/ajax/modules/car.choice/carbase.applicability.json.php",
				dataType: "jsonp",
				data: requestParameters,
				type: "get",
				success: function(data) {
					if (data) {
						if (data.manufacturers) {
							$('.carbaseAutoChoise #manufacturers').html('<option value="" disabled="disabled" selected="selected">'+carbaseApplBlockCarManufacturer+'</option>');
							$.each(data.manufacturers, function(index, value) {
								$('.carbaseAutoChoise #manufacturers').append('<option value="' + value.id + '">' + value.name.toUpperCase() + '</option>');
							});
							$('.carbaseAutoChoise #manufacturers').removeAttr('disabled');
						}
						if (data.models) {
							$('.carbaseAutoChoise #models').html('<option value="" disabled="disabled" selected="selected">'+carbaseApplBlockCarModel+'</option>');
							$.each(data.models, function(index, value) {
								$('.carbaseAutoChoise #models').append('<option value="' + value.id + '">' + value.name + '</option>');
							});
							$('.carbaseAutoChoise #models').removeAttr('disabled');
						}
						if (data.modifications) {
							$('.carbaseAutoChoise #modifications').html('<option value="" disabled="disabled" selected="selected">'+carbaseApplBlockCarModification+'</option>');
							var modificationsImageUrls = [];
							$.each(data.modifications, function(index, value) {
								$('#modifications').append('<option value="' + value.id + '">' + value.name + ' ' + value.hpFrom + ' л.с.</option>');
								modificationsImageUrls[value.id] = value.imageUrl;
							});
							$('.carbaseAutoChoise #modifications').removeAttr('disabled');

							$("select[name='modifications']").change(function() {
								var modificationImageUrl = modificationsImageUrls[$('.carbaseAutoChoise #modifications').val()];
								$('.carbaseAutoChoiseImage').html('<img src="' + modificationImageUrl + '" id="carbaseModificationImage" />');
								$('#carbaseModificationImage').css({'max-width' : '130px'});
								$('#goToCarbaseBtn').removeAttr('disabled');
								$('#goToCarbaseBtn').click(function() {
									window.location = SiteLocale + '/carbase/?modificationId=' + $("select[name='modifications']").val();
									return false;
								});
							});
						}
					}
				}
			});
		}
	});
}

jQuery.preloadImages = function () {
	if (typeof arguments[arguments.length - 1] == 'function') {
		var callback = arguments[arguments.length - 1];
	} else {
		var callback = false;
	}
	if (typeof arguments[0] == 'object') {
		var images = arguments[0];
		var n = images.length;
	} else {
		var images = arguments;
		var n = images.length - 1;
	}
	var not_loaded = n;
	for (var i = 0; i < n; i++) {
		jQuery(new Image()).attr('src', images[i]).load(function() {
			if (--not_loaded < 1 && typeof callback == 'function') {
				callback();
			}
		});
	}
}

aTrans = {
	а:"a",
	б:"b",
	в:"v",
	г:"g",
	д:"d",
	е:"e",
	ё:"e",
	ж:"zh",
	з:"z",
	и:"i",
	й:"j",
	к:"k",
	л:"l",
	м:"m",
	н:"n",
	о:"o",
	п:"p",
	р:"r",
	с:"s",
	т:"t",
	у:"u",
	ф:"f",
	х:"h",
	ц:"c",
	ч:"ch",
	ш:"sh",
	щ:"sch",
	ъ:"",
	ы:"y",
	ь:"",
	э:"e",
	ю:"yu",
	я:"ya",
	_:"_",
	a:"a",
	b:"b",
	c:"c",
	d:"d",
	e:"e",
	f:"f",
	g:"g",
	h:"h",
	i:"i",
	j:"j",
	k:"k",
	l:"l",
	m:"m",
	n:"n",
	o:"o",
	p:"p",
	q:"q",
	r:"r",
	s:"s",
	t:"t",
	u:"u",
	v:"v",
	w:"w",
	x:"x",
	y:"y",
	z:"z",
	1:"1",
	2:"2",
	3:"3",
	4:"4",
	5:"5",
	6:"6",
	7:"7",
	8:"8",
	9:"9",
	0:"0",
	"-":"-",
	".":"."
};

function transliterate(sString) {
	sRet = "";
	sString = sString.replace(/ /g,"_");
	if (sString) {
		sRet = sString.replace(/./g,transChar)
	}
	return sRet;
}

function transChar(sStr) {
	sStr = sStr.toLowerCase();
	if (aTrans[sStr]) {
		return aTrans[sStr];
	} else {
		return "";
	}
}

function goToTrash(id_distributor_route, id_article, ds_id, ds_key, eventObj, drForPrice, idSearchArticle, uniqId, crossSource, weightFromApi, usedGroup, code, number, brand) {
	addToTrash(id_distributor_route, id_article, ds_id, ds_key, eventObj, drForPrice, idSearchArticle, uniqId, crossSource, 'go', weightFromApi, usedGroup, code, number, brand);
}

function addToTrash(id_distributor_route, id_article, ds_id, ds_key, eventObj, drForPrice, idSearchArticle, uniqId, crossSource, goToTrash, weightFromApi, usedGroup, code, number, brand) {
	var icon = $(eventObj).html();
	$(eventObj).fadeOut(200, function() {
		$(this).html($("#ajaxloader").clone()).fadeIn(200);
	});
	$.ajax({
		url: SiteLocale + '/add_to_trash/?checkExistingArticleInCart=1',
		dataType: "json",
		data: {'id_article': id_article},
		type: "POST",
		success: function (data) {
			if (data) {
				if (data.isArticleIdExist) {
					// alertMessageAddItemToBasket, answerOptionPositive и answerOptionNegative определяются сразу перед подключением js_misc.js (с учетом локали)
					var alertMessage = alertMessageAddItemToBasket.replace("xx", data.articlesCount);
					$("#dialogConfirm").html(alertMessage);
					$("#dialogConfirm").dialog({
						resizable: false,
						modal: true,
						width: 400,
						zIndex: 16070,
						buttons: [{
							text: answerOptionPositive,
							click: function () {
								add(id_distributor_route, id_article, ds_id, ds_key, eventObj, drForPrice, idSearchArticle, uniqId, crossSource, weightFromApi, usedGroup, goToTrash, icon, code, number, brand);
								$(this).dialog("close");
								return true;
							}
						}, {
							text: answerOptionNegative,
							click: function () {
								$(eventObj).html(icon);
								$(this).dialog("close");
							}
						}],
						close: function () {
							$(eventObj).html(icon);
						}
					});
				} else {
					add(id_distributor_route, id_article, ds_id, ds_key, eventObj, drForPrice, idSearchArticle, uniqId, crossSource, weightFromApi, usedGroup, goToTrash, icon, code, number, brand);
				}
			}
		}
	});
}

//(ToTrash\([^),]*,[^),]*,[^),]*,[^)]*,[^),]*,[^),]*,[^),]*)([^),]*\))
function add(id_distributor_route, id_article, ds_id, ds_key, eventObj, drForPrice, idSearchArticle, uniqId, crossSource, weightFromApi, usedGroup, goToTrash, icon, code, number, brand) {

	try {
		if (googleTrackerId) {
			pageTracker._trackPageview("/ajax/addToBasket");
		}
	} catch(err) {}

	if (!uniqId) {
		uniqId = '';
	}

	if (!ds_id) {
		ds_id = '';
	}

	var quantityText = $('#text_'+ id_distributor_route + '_' + id_article + '_' + ds_id + '_' + uniqId).val();

	var quantity = 1;
	if (quantityText) {
		quantity = quantityText;
	}

	var link = '/add_to_trash/?dr=' + id_distributor_route
		+ '&art=' + id_article + '&quantity=' + quantity;
	var postData = {};
	if (ds_key) {
		postData = {'ds_key' : ds_key};
		link += '&ds_id='+ds_id+"&ds_key="+ds_key;
	}
	if (drForPrice) {
		link += "&dr_for_price="+drForPrice;
	}
	if (idSearchArticle) {
		link += "&artp="+idSearchArticle;
	}
	if (crossSource && parseInt(idSearchArticle) != parseInt(id_article)) {
		link += "&crossSource="+crossSource;
	}
	if (weightFromApi) {
		link += "&weightFromApi="+weightFromApi;
	}
	if (usedGroup) {
		link += "&usedGroup="+usedGroup;
	}
	if (code) {
		link += "&code="+code;
	}
	if (number) {
		link += "&number="+encodeURIComponent(number);
	}
	if (brand) {
		link += "&brand="+encodeURIComponent(brand);
	}
	sTmp = icon;

	$.ajax({
		url: link,
		dataType: "json",
		data: postData,
		type: "POST",
		success: function(data) {
			if (data) {
				sStatus = data.status;
				if (sStatus == 'ok') {
					// popupMessageAddItemToBasket определяется сразу перед подключением js_misc.js (учитывается локаль)
					$.jGrowl("<b>" + popupMessageAddItemToBasket + "</b>", {
						header: " ",
						theme: 'success',
						life: 2000
					});
					$(eventObj).fadeOut(200, function() {
						$(eventObj).html($("#ajaxok").clone()).fadeIn(200).delay(1000).fadeOut(500, function() {
							$(this).html(sTmp).fadeIn(500);
						});
					});
					updateBasketLegend();

					if (goToTrash == 'go') {
						location.href = SiteLocale + '/cart/';
					}
				} else {
					if (sStatus == 'error' && data.msg == 'auth') {
						/*Для добавления товаров в корзину необходимо авторизироваться*/
						ajaxFail(sTmp, eventObj, addToCartAuthError, 3000);
					} else if (sStatus == 'error' && data.msg == 'nodata') {
						/*<b>Ошибка при добавлении в корзину. <br/>Попробуйте перезагрузить страницу с результатами поиска</b>*/
						ajaxFail(sTmp, eventObj, addToCartDataError, 3000, true);
					} else if (sStatus == 'error' && data.msg == 'limit') {
						/*Для дальнейшего добавления новых позиций в корзину необходимо авторизироваться.*/
						ajaxFail(sTmp, eventObj, addToCartLimitError, 3000);
					} else if (sStatus == 'error' && data.msg == 'limitOneCookie') {
						/*Для добавления этого товара в корзину необходимо авторизироваться.*/
						ajaxFail(sTmp, eventObj, addToCartCookieLimitError, 3000);
					} else if (sStatus == 'error' && data.msg == 'already_in_cart') {
						/*Обработка данного товара имеет ограничения. Обновить кол-во позиций вы можете в корзине.*/
						ajaxFail(sTmp, eventObj, addToCartAlreadyInCartError, 6000);
					} else {
						/*Ошибка при добавлении в корзину*/
						ajaxFail(sTmp, eventObj, addToCartError);
					}
				}
			} else {
				/*Ошибка при добавлении в корзину*/
				ajaxFail(sTmp, eventObj, addToCartError);
			}
		},
		error: function(data) {
			/*Ошибка при добавлении в корзину*/
			ajaxFail(sTmp,eventObj, addToCartError);
		}
	});
}

function ajaxFail(sTmp,eventObj, sMsg, iTimeout, bReload) {
	if (sMsg) {
		if (!iTimeout) {
			iTimeout = 7000;
		}

		if (bReload) {
			$.jGrowl("<br />" + sMsg, {
				header: warningCaption,/*Внимание!*/
				life: iTimeout,
				theme: 'warning',
				close: function() {
					location.reload();
				}
			});
		} else {
			$.jGrowl("<br />" + sMsg, {
				header: warningCaption,/*Внимание!*/
				theme: 'warning',
				life: iTimeout
			});
		}
	}
	$(eventObj).fadeOut(200, function() {
		$(eventObj).html($("#ajaxfail").clone()).fadeIn(200).delay(1000).fadeOut(500,function() {
			if (sTmp) {
				$(this).html(sTmp)
			}
			$(this).fadeIn(500);
		});
	});
}

function checkPacking(selectorRowTableTrash) {
	selectorRowTableTrash = typeof selectorRowTableTrash !== 'undefined'
		? selectorRowTableTrash
		: '#trash_table tr.cart_tr2_trash';

	var isError = 0;
	$(selectorRowTableTrash).each(function(key, val) {
		var packingValue = parseInt($(this).find('input[name^="packing"]').val());
		var quantityInput = $(this).find('input[name^="mas_quantity"]');
		var availability = parseInt($(this).find('.positionAvailability').text());
		var brandNumberText = $(this).find('.brandNumberText').text();
		var quantity = $(quantityInput).val();
		if (quantity == 0) {
			quantity = packingValue;
			$(quantityInput).val(quantity);
		}
		if (packingValue > 1 && (!availability || availability >= packingValue)) {
			if (quantity % packingValue != 0) {
				// packingTrashOrderMessage определяется перед подключением js_misc.js
				var alertMessage = packingTrashOrderMessage.replace("{BRAND_NUMBER}", brandNumberText).replace("{PACKING_VALUES}", packingValue + ', ' + (packingValue * 2) + ', ' + (packingValue * 3));
				alert(alertMessage);
				isError = 1;
			}
		}
		return true;
	});
	if (isError != 1) {
		return true;
	} else {
		return false;
	}
}

function checkOnlyOneCheckbox(cb) {
	$("input[name='"+cb.name+"']:checked").not(cb).each(function() {
		this.checked = false;
	});
}

function fixClick(e) {
	if (e && e.stopPropagation) {
		e.stopPropagation();
	} else {
		e = window.event;
		e.cancelBubble = true;
	}
}

function htmlspecialchars_decode(string, quote_style) {
	var optTemp = 0,
		i = 0,
		noquotes = false;
	if (typeof quote_style === 'undefined') {
		quote_style = 2;
	}
	string = string.toString()
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>');
	var OPTS = {
		'ENT_NOQUOTES': 0,
		'ENT_HTML_QUOTE_SINGLE': 1,
		'ENT_HTML_QUOTE_DOUBLE': 2,
		'ENT_COMPAT': 2,
		'ENT_QUOTES': 3,
		'ENT_IGNORE': 4
	};
	if (quote_style === 0) {
		noquotes = true;
	}
	if (typeof quote_style !== 'number') {
		// Allow for a single string or an array of string flags
		quote_style = [].concat(quote_style);
		for (i = 0; i < quote_style.length; i++) {
			// Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
			if (OPTS[quote_style[i]] === 0) {
				noquotes = true;
			} else if (OPTS[quote_style[i]]) {
				optTemp = optTemp | OPTS[quote_style[i]];
			}
		}
		quote_style = optTemp;
	}
	if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
		string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
		// string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
	}
	if (!noquotes) {
		string = string.replace(/&quot;/g, '"');
	}
	// Put this in last place to avoid escape being double-decoded
	string = string.replace(/&amp;/g, '&');

	return string;
}

function disallowGarageWarning() {
	alert('Проводится обновление баз данных. Функции работы с гаражом временно отключены.');
}

$(document).ready(function() {
	basketSwitcher();

	$('.copyToHidden').each(function() {
		copyToHiddenField.call(this);
	});
	$('.copyToHidden').click(function() {
		copyToHiddenField.call(this);
	});

	$('#carapplicability').fancybox({
		autoDimensions: false,
		transitionIn: 'fade',
		transitionOut: 'fade',
		speedIn: 400,
		speedOut: 200,
		width: 800,
		height: 600,
		titleShow: false,
		centerOnScroll: true,
		afterShow: function() {
			carApplicabilityInit("/carapplicability.json/");
		}
	});

	$('#carbaseApplicability').fancybox({
		autoDimensions: false,
		transitionIn: 'fade',
		transitionOut: 'fade',
		speedIn: 400,
		speedOut: 200,
		width: 240,
		height: 370,
		titleShow: false,
		centerOnScroll: true,
		afterShow: function() {
			carbaseFullApplicabilityBlockInit();
		}
	});

	$('#carbaseApplicability-disabled').click(function() {
		disallowGarageWarning();
	});

	$('.brandInfoLink').unbind('click');
	$('.brandInfoLink').bind('click', function() {
		$.fancybox({
			href: this.href,
			autoDimensions: false,
			width: 500,
			height: 200,
			autoScale: true,
			transitionIn: 'none',
			transitionOut: 'none',
			type: 'ajax',
			ajax: {
				dataType: 'jsonp'
			},
			helpers: {
				overlay: {
					locked: false
				}
			}
		});
		return false;
	});

	// Обработка обновления капчи
	$('.captchaReload').click(function() {
		var url = $('.captchaImg').attr('src');
		$('.captchaImg').attr('src', url + Math.random());

		return false;
	});

	$('.brandNameInput').autocomplete({
		source: function( request, response ) {
			$.ajax({
				url: SiteLocale + "/brandname.json/",
				dataType: "json",
				data: {
					maxResult: 12,
					nameStartsWith: request.term
				},
				success: function( data ) {
					response( $.map( data.brandsData, function( item ) {
						return {
							label: item.name,
							value: item.name
						}
					}));
				}
			});
		},
		minLength: 2
	});

	$('.positionMenuButtonStar').click(function() {
		var menu = $(this).find('#positionMenu');
		var imgStarTitle = $(this).find('img').attr('title');
		if ($(this).find('#positionMenu > ul').length > 0) {
			$('.positionMenuButtonStar > #positionMenu >ul').remove();
		} else {
			$('.positionMenuButtonStar > #positionMenu >ul').remove();
			var currentTr = $(this).parents('.analogRow');
			var articleId1 = currentTr.find('#articleId1').val();
			var articleId2 = currentTr.find('#articleId2').val();
			var articleOriginal = currentTr.find('#articleOriginal').val();
			var articleAnalog = currentTr.find('#articleAnalog').val();
			var menuBody = $('.serviceArticleMenu > ul').clone(true);
			if (imgStarTitle) {
				menuBody.html('<div class="validAnalogMsg">' + imgStarTitle + '</div>' + menuBody.html());
			}
			menuBody.find('#report_about_bad_analog').attr(
				'href', '/ajax_bad_analog_report/?articleId1=' + articleId1 + '&articleId2=' + articleId2 +
					'&articleOriginal=' + articleOriginal + '&articleAnalog=' + articleAnalog);
			menu.append(menuBody);
		}
	});

	// Стиль ссылок-кнопок.
	$('a.link-button').button();

	/**
	 * Чекбокс "Отметить все".
	 * Может быть несколько штук на одной странице.
	 * В качестве селектора "подопечных" чекбоксов выступает класс указанный в атрибуте rel.
	 */
	$('.select-all').each(function() {
		var $selectAll = $(this);
		$selectAll.click(function() {
			var $checkboxes = $('.' + $selectAll.attr('rel'));
			if ($selectAll.is(':checked')) {
				$checkboxes.attr('checked', 'checked');
			} else {
				$checkboxes.removeAttr('checked');
			}
		});
	});

	// Уведомление о смене раскладки поискового запроса.
	if (document.location.href.search('&layout_flipped') != -1
			&& !$('#page-search-no-result').size()) {
		$.jGrowl('Раскладка клавиатуры была исправлена, т.к. по исходному запросу ничего не нашлось.');
	}

	// Кнопка перехода на страницу "Обработка заказов".
	$('#goto-orders-process').click(function() {
		var orderIds = [];
		$('.selected-orders:checked').each(function() {
			orderIds.push($(this).val());
		});
		orderIds = orderIds.join(',');
		document.location.href = '/orders/?process&orders=' + orderIds;
	});

	/* Инициализация плагина вывода структур jVD */
	$('.jVD').accordion({
		collapsible: true,
		active: false,
		autoHeight: false
	});

	$('.jVDActive').accordion({
		collapsible: true,
		autoHeight: false
	});

	$('.caseInfo').click(function(e) {
		fixClick(e);
	});

	$('tr.startSearching').on('click', function(e) {
		if (!$(e.target).hasClass('info') && !$(e.target).hasClass('brandInfoLink') && !$(e.target).is('a')) {
			var link = $(this).data('link');
			if (link) {
				window.location = link;
			}
		}
	});

	$('a.edBlocksImages').fancybox({
		type: 'image',
		titleShow: false,
		centerOnScroll: true
	});

	if ($('div.carbaseAutoChoise').length > 0) {
		carbaseQuickApplicabilityBlockInit();
	}

	$('.cartClearButton').click(function() {
		if (!confirm(confirmCartClear)) {
			return false;
		}
		$('<input type="hidden" name="cartClear" value="1"/>').insertAfter($(this));
		$(this).parents('form').submit();
	});
});
