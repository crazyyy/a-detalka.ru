function emLink(hiddenA, text)
{
  document.write('<a title=\"Click here to send an e-mail\" href=\"{index.php?id=nojs}\" ONMOUSEOVER=this.href=\"'+'m'+''+'ai'+'lt'+'o:'
   +hiddenA+'\">'+text+'</a>');
}

function displayEM(user, host, caption)
{
  var a = user+'&#0064;'+ host;
  if (caption.length) emLink(a, caption); else emLink(a, a);
}