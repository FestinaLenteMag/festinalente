Element.prototype.remove = function() {
this.parentElement.removeChild(this);
}
//Change style through buttons
function changeStyle(selectedStyle) {
    var styleDeclaration = document.getElementById('ArticleCss');
	if (styleDeclaration != null && styleDeclaration.length > 0){
		styleDeclaration.remove();
	};
    cssFile = document.createElement('link');
    cssFile.type = "text/css"; 
    cssFile.rel = "stylesheet";
    cssFile.href = selectedStyle;
    cssFile.id= "ArticleCss";
    var renewedStyle = document.getElementsByTagName("head")[0];
	if (renewedStyle != null) {
		renewedStyle.appendChild(cssFile);
	};
}

//Manage active style button
$(document).ready(function(){

    $("#reset").click(function(){
        $('#btn-style>button.btn-active').removeClass("btn-active");
        this.classList.add("btn-active");
  });
  
    $("#hiphop").click(function(){
        $('#btn-style>button.btn-active').removeClass("btn-active");
        this.classList.add("btn-active");
  });
    $("#hippie").click(function(){
        $('#btn-style>button.btn-active').removeClass("btn-active");
        this.classList.add("btn-active");
  });
    $("#victorian").click(function(){
        $('#btn-style>button.btn-active').removeClass("btn-active");
        this.classList.add("btn-active");
  });
    $("#accessible").click(function(){
        $('#btn-style>button.btn-active').removeClass("btn-active");
        this.classList.add("btn-active");
  });
});