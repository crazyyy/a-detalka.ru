function mopen(e){mcancelclosetime(),ddmenuitem&&(ddmenuitem.style.visibility="hidden"),ddmenuitem=document.getElementById(e),ddmenuitem.style.visibility="visible"}function mclose(){ddmenuitem&&(ddmenuitem.style.visibility="hidden")}function mclosetime(){closetimer=window.setTimeout(mclose,timeout)}function mcancelclosetime(){closetimer&&(window.clearTimeout(closetimer),closetimer=null)}var timeout=100,closetimer=0,ddmenuitem=0;document.onclick=mclose;