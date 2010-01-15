var p1=new pe_prop("icons/address-book.png", "name","content",true);
var p2=new pe_prop("icons/address-book.png", "twitter","@santennio",true);
var p3=new pe_prop("icons/address-book.png", "fb","santennio",true);
var ar=new Array();
ar.push(p1);
ar.push(p2);

var item1=new pe_item("icons/address-book.png", ar,"100px");
item1.addProps(p3);

/*var p12=new pe_prop("icons/address-book.png", "name","content",true);
var p22=new pe_prop("icons/address-book.png", "twitter","@santennio",true);

var item2=new pe_item("icons/application-blue.png", null,"100px");
item2.addProps(p12);
item2.addProps(p22);

var pf=$('portfolio');

pf.adopt(item1.getElement());
*/
var p=new moope({divID:'portfolio',itemsPerPageNum:15, //numero di immagini per pagina
				itemList:[item1,item1,item1,item1,item1,item1,item1,item1,item1,item1]});