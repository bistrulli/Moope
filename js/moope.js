//moope v 0.0.1 | Mootools portfolio & presentation engine
//bisogna progettare una classe pagina che modella la pagina visualizzata, questa concettualmente estenderà
//elements, poi classe riga che modella le righe di items che estende element e rappresenta un div e la classe item che estende item e 
//rappresenta un tag img

// questa classe è pensata per modellare l'oggetto container che conterrà una lista di oggetti pagina
var moope=new Class({
	
	Implements:[Events,Options],
	
	options:{
		divID:null, //id del div contenitore
		itemsPerPageNum:null, //numero di immagini per pagina
		itemList:null, //lista di elementi
		pagesNumber:1, //numero di pagine totale
		currentPage:1, //pagina corrente o pagina iniziale
		thumbsDim:100, //dimensione delle miniature
		pagesItemList:[], //pagine che formeranno la presentazione
		ItemsNum:null,//numero di elementi totali da visualizzare
		MaxItemPerRow:null,//numero massimo di elementi posizionabili all'interno di una riga
		PageRowsNumber:null,//numero di righe in una pagina che non sia l'ultima
		LastPageRows:null,//numero di righe dell'ultima pagina
	},
	
	
	
	/*initialize:function(divId){
		this.setDivId(divId);
	},*/
	initialize:function(options){
		this.setOptions(options);
		this.start();
	},
	setDivId:function(divId){
		this.divID=divId;
	},
	setItemsPageNum:function(n){//setta quanti elementi per vista si devono visualizzare, in base a questo parametro si setteranno le dimensioni delle thumbnails
		if(n==null){
			var x=$(this.divId).get('width').toInt();
			var y=$(this.divId).get('height').toInt();
			
			var col=(x/(this.thumbsMinDim)).toInt();
			var rows=(y/(this.thumbsMinDim)).toInt();
			//da riempire.
		}//calcolare il numero di elementi da inserire in base alla dimensione del div e delle thumbnails di default.
		else{
			this.itemsPerPageNum=n;
		}
	},
	setPagesNumber:function(){
		
		//calcolo del numero delle righe all'interno di una pagina
			//calcolo di elementi massimi per riga
			
			//calcolo del numero delle righe in funzione del numero di elementi per pagina
		
		//calcolo del numero delle pagine
		
	},
	toElement:function(){
		if(this.element)
		return this.element;
		else
		{
			this.element=$(this.options.divID);
		}
		
	},
	getRowsNumber:function(){
		
		console.log('l\'algoritmo presenta problemi nella gestione delle approsimazione'); //il problema sono le altezze dei bordi
		
		
		var ContainerSize=$(this.options.divID).getComputedSize(['width','height']);
		this.options.ItemsNum=this.options.itemList?this.options.itemList.length:false;
		if(!this.options.ItemsNum)
		return false;
		
		//numero massimo di elementi all'interno di una riga
		this.options.MaxItemPerRow=Math.floor(ContainerSize.width/this.options.thumbsDim);
		var gap=ContainerSize.width-(this.options.MaxItemPerRow * this.options.thumbsDim); // spazio che rimane nella riga
		if(gap<(this.options.MaxItemPerRow+1)*15)
		{
			//eliminare almeno un elemento
			this.options.MaxItemPerRow--;
		}
		
		//numero massimo di righe per pagina
		var MaxRow=Math.floor(ContainerSize.height/this.options.thumbsDim); //il numero delle righe è approssimato per diffeto
		var gap=ContainerSize.height-(MaxRow * this.options.thumbsDim); // spazio che rimane in verticale nel container
		console.log('l\' altezza del contenitore è '+ContainerSize.height);
		if(gap<(MaxRow+1)*15)
		{
			console.log('il numero delle righe non rispetta il minimo gap')
			//eliminare almeno una riga
			MaxRow--;
		}
		
		//numero di righe necessarie in una pagina
		if(this.options.itemsPerPageNum<=this.options.MaxItemPerRow*MaxRow)
		{
			this.options.PageRowsNumber=Math.ceil(this.options.itemsPerPageNum/(MaxItemPerRow)); 
		}else
		{ 
			this.options.PageRowsNumber=MaxRow;
			this.options.itemsPerPageNum=this.options.MaxItemPerRow*MaxRow;
		}
		
		//Numero di pagine
		this.options.pagesNumber=Math.ceil(this.options.ItemsNum/this.options.itemsPerPageNum);
		
		//nel caso particolare l'ultima riga coincide con la prima e unica
		var LastPageItems=this.options.ItemsNum-(this.options.pagesNumber-1)*this.options.itemsPerPageNum;//numero di elementi nell'ultima pagina
		
		//calcoliamo numero righe ultima pagina
		this.options.LastPageRows=Math.ceil(LastPageItems/this.options.MaxItemPerRow);
		
	},
	addItems:function(iList){
		if(iList==null){}//non fare nulla, oppure fai qualcosa che ora non mi viene in mente
		else{
			if(this.itemList==null)	this.itemList=new Array();
				if(iList.length)	this.itemList.extend(iList); //ho passato un array, quindi estendi properties
				else	this.itemList.push(iList); //ho passato un elemento, quindi push.
		}
	},
	getItems:function(){
		return this.options.itemList;
	},
	getItemAtIndex:function(index){
		return this.options.itemList[index];
	},
	getThumsDim:function(){
		return this.options.thumbsDim;
	},
	getDivId:function(){
		return this.options.divID;
	},
	//numero di immagini per pagina che l'utente vorrebbe avere
	getItemPerPage:function(){
		return this.options.itemsPerPageNum;
	},
	getPageNumber:function(){
		return this.options.pagesNumber;
	},
	getCurrentPage:function(){
		return this.options.currentPage;
	},
	getPagesItem:function(){
		return this.options.pagesItemList;
	},
	getPageItemAtIndex:function(index){
		return this.options.pagesItemList[index];
	},
	getItemsNum:function(){
		return this.options.ItemsNum;
	},
	getMaxItemPerRow:function()
	{
		return this.options.MaxItemPerRow;
	},
	getPageRowsNumber:function()
	{
		return this.options.PageRowsNumber;
	},
	getLastPageRows:function(){
		return this.optionsLastPageRows;
	},
	start:function(){
		//this.setPagesNumber();
		this.getRowsNumber();
		console.log('numero di elementi totali da visualizzare: '+this.options.ItemsNum);
		console.log('numero massimo di elementi posizionabili all\'interno di una riga: '+this.options.MaxItemPerRow);
		console.log('numero di righe in una pagina che non sia l\'ultima: '+this.options.PageRowsNumber);
		console.log('numero di righe dell\'ultima pagina: '+this.options.LastPageRows);
		console.log('numero di pagine totale: '+this.options.pagesNumber);
	},
	stop:function(){}
});

//classe che modellerà la pagina e che grazie al metodo toElement è comme se estendesse element
//quindi è possibile contemporaneamete pensare a questa classe sia come un div che come un istanza 
//usando il metodo $ su un istanza di questo oggetto sarà ritornato l'element che lo rappresenta
var page=new Class({
	Implements:[Events,Options],
	
	options:{
		parent:null
	},
	
	initialize:function(options){
		this.setOptions(options);
	},
	toElement:function()
	{
		if(this.element)
		return this.element;
		else
		{
			this.element=new Element('div');
		}
	},
	//disegnerà nella pagina le righe passata per paramatro
	draw:function(item){
		
	}
});

var pe_item=new Class({
	properties:null,
	thumbnail:null,
	htmlElement:null,
	thumbDim:null,
	itemId:null,
	exInjected:false,
	
	initialize:function(thumb){
		this.setThumbnail(thumb);
	},
	initialize:function(thumb, props, tDim){
		this.setThumbnail(thumb);
		this.addProps(props);
		this.setThumbDim(tDim);
		this.createElement();
		this.setMouseActions();
	},
	setThumbnail:function(t){
		if(t!=null) this.thumbnail=t;
	},
	setThumbDim:function(tDim){
		this.thumbDim=tDim;
	},
	addProps:function(props){
		
		if(props==null){}//non fare nulla, oppure fai qualcosa che ora non mi viene in mente
		else{
			if(this.properties==null)	this.properties=new Array();
				if(props.length)	this.properties.extend(props); //ho passato un array, quindi estendi properties
				else	this.properties.push(props); //ho passato un elemento, quindi push.
		}
		if(this.exInjected){
			var ex=this.htmlElement.getChildren('.moopeExcerpt')[0];
			if(props.length){
				props.each(function(item, index){
					if(item.isOnExcerpt()){
						alert(item.getElement().get('class'));
						ex.adopt(item.getElement());
						
					}
				}.bind(ex));
			}
			else{
				ex.adopt(props.getElement());
			}
		}
	},
	getProps:function(){
		return this.properties;
	},
	getPropAtIndex:function(index){
		return this.properties[index];
	},
	getThumb:function(){
		return this.thumbnail;
	},
	getThumbDim:function(){
		return this.thumbDim;
	},
	getElement:function(){
		return this.htmlElement;
	},
	setMouseActions:function(){
		var ele=this.getElement();
		
		ele.addEvent('mouseover',function(){
			var ex=ele.getChildren('.moopeExcerpt')[0];
			
			ex.morph({opacity:1});
		}.bind(this));
		
		ele.addEvent('mouseout',function(){
			var ex=ele.getChildren('.moopeExcerpt')[0];
			
			ex.morph({opacity:0});
		}.bind(this));
		
	},
	getExcerpt:function(){
		var props= this.getProps();
		if(props!=null){
			this.exInjected=true;//necessario per l'update dell'excerpt, nell'addProps
			
			var ex=new Element('div',{
				'class':'moopeExcerpt'
			});
		
			props.each(function(item, index){
				//alert(item);
				if(item.isOnExcerpt()){
					//alert(item.getElement().get('class'));
					ex.adopt(item.getElement());
					
				}
			}.bind(ex));
			//ex.setStyle('display','none');
			ex.setStyle('opacity','0');
			
			ex.set('morph',{duration: 300, transition: 'linear'});

			if(ex.getChildren().length>0){
				return ex;
			}
		}
	},
	createElement:function(){
		var ele=new Element('div',{
			'class':'moopeThumb'
		});
		var thumb=new Element('img',{
			'src':this.getThumb(),
		});
		thumb.set('width',this.getThumbDim());
		if(thumb.get('height')>this.getThumbDim()) {
			thumb.erase('width');
			thumb.set('height',this.getThumbDim());
		}
		else{
			ele.setStyle('display','table');
			ele.adopt(thumb);
			ele.adopt(this.getExcerpt());
			this.htmlElement=ele;
		}
	}
});

var pe_prop=new Class({
	icon:null,
	name:null,
	content:null,
	onExcerpt:false,
	htmlElement:null,
	
	initialize:function(iconUrl, n, c, onEx){
		this.setIcon(iconUrl);
		this.setName(n);
		this.setContent(c);
		this.setOnExcerpt(onEx);
		this.createElement();
	},
	setIcon:function(iconUrl){
		this.icon=iconUrl;
	},
	setName:function(n){
		this.name=n;
	},
	setContent:function(c){
		this.content=c;
	},
	setOnExcerpt:function(onEx){
		if(onEx==true) this.onExcerpt=true;
		else this.onExcerpt=false;
	},
	getIcon:function(){
		return this.icon;
	},
	getName:function(){
		return this.name;
	},
	getContent:function(){
		return this.content;
	},
	isOnExcerpt:function(){
		return this.onExcerpt;
	},
	createElement:function(){
		this.htmlElement=new Element('div',{
			'class':'moopeProp'
		});
		
		var i=new Element('div',{
			'class':'moopeIcon',
			'id':this.getName() + 'icon',
			'styles':{'background':'url("'+this.icon+'") no-repeat top left'}
		});
		var pN=new Element('p',{
			'class':'moopeName',
			'html':this.getName()
		});
		var pC=new Element('p',{
			'class':'moopeContent',
			'html':this.getContent()
		});
		this.htmlElement.adopt(i);
		this.htmlElement.adopt(pN);
		this.htmlElement.adopt(pC);
	},
	getElement:function(){
		return this.htmlElement;
	}
	

});