var TitleRollover = function(element)
{	 
	var that = this;	
	var str = element.src;	
	str = str.replace("t-", "");	
    this.image = getImgByAttr(cakepics, str);
    this.old = this.image.src;    
    this.newImg =  addHoverToStr(this.old);
   
    element.onmouseover = function()
    {
    	that.image.src = that.newImg;
    }	
    element.onmouseout = function()
    {
    	that.image.src = that.old;    	
    }
    
}

function getImgByAttr(images, src)
{
	for (i = 0; images.length; i++)
	{
		if (images[i].src == src)
			return images[i];
	}
}

var Rollover = function(element, newImageURL)
{
	var that = this;	
	this.newImageURL = newImageURL;
	this.image = element;
	if (!this.image)
	{
		throw new Error("Rollover: Image ID not found");
	}
	if (this.image.nodeType !== 1 || this.image.nodeName != "IMG")
	{
		throw new Error("Rollover: Image ID is not an aimg tag");
	}
	this.oldImageURL = this.image.src;
	
	this.image.onmouseover = function()
	{
		that.image.src = that.newImageURL;
	}
	this.image.onmouseout = function()
	{
		that.image.src = that.oldImageURL;
	}
} 

function addHoverToStr(str)
{
	str = str.replace(".jpg", "hover.jpg");	
	return str;
}

cakepics = document.getElementsByClassName("cakepic");

subtitles = document.getElementsByClassName("subtitle");

window.onload = function()
{		
	for (i = 0; i < cakepics.length; i++)
	{
		rollover = new Rollover(cakepics[i], addHoverToStr(cakepics[i].src));
	}	
	
	for (i = 0; i < subtitles.length; i++)
	{
		titleRollover = new TitleRollover(subtitles[i]);
	}
	
	
	
	$(".subtitle").click(function()
	{
		
		$("#imageDiv").hide();		
		var src = $(this).attr("src").replace("t-", "");	
		var value = $(this).attr("value");					
		$("#frontimg").attr("src", src);	
		src = removePath(src);
		fillProductInfo(src);
		 $( "#imageDiv" ).fadeIn(1200);		 
		$("#description").text(value);
		$("#imageDiv").height($("#infotable").height() + 100);
		if ($("#imageDiv").height() < 300)
			$("#imageDiv").height(300);
		
	});
	
	$("#closeDesc").click(function()
	{
		$("#imageDiv").hide();
	});
	
	$(".cakepic").click(function()
	{
		$("#imageDiv").hide();		
		var src = $(this).attr("src");
		src = src.replace("hover", "");			
		var value = $(this).attr("value");
		
		$("#frontimg").attr("src", src);		
		$( "#imageDiv" ).fadeIn(1200);
		src = removePath(src);	
		fillProductInfo(src);		 
		$("#description").text(value);
		$("#imageDiv").height($("#infotable").height() + 100);
		if ($("#imageDiv").height() < 300)
			$("#imageDiv").height(300);
	});
	
	function fillProductInfo(src)
	{
		var element = $("a[id='" + src + "']");
		var inputs = $("a[id='" + src + "']").nextAll();
		var prodDatas = $(".prodData");
		for(var i = 0; i < inputs.length; i++)
		{
			$(prodDatas[i]).text($(inputs[i]).val());
		}	
	}
	
	function removePath(src)
	{
		num = src.lastIndexOf("/");
		src = src.substring(num+1);	
		return src;	
	}
	
	
}
