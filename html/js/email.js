function emLink(e,i){document.write('<a title="Click here to send an e-mail" href="{index.php?id=nojs}" ONMOUSEOVER=this.href="mailto:'+e+'">'+i+"</a>")}function displayEM(e,i,n){var t=e+"&#0064;"+i;n.length?emLink(t,n):emLink(t,t)}