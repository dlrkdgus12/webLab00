document.observe("dom:loaded", function() {
    $("b_xml").observe("click", function(){
    	new Ajax.Request("songs_xml.php",{
    		method: "GET",
    		parameters: {top: $F("top")},
    		onSuccess : showSongs_XML,
    		onException: ajaxFailed,
    	});
    });
    $("b_json").observe("click", function(){
        //construct a Prototype Ajax.request object
        new Ajax.Request("songs_json.php",{
    		method: "GET",
    		parameters: {top: $F("top")},
    		onSuccess : showSongs_JSON,
    		onException: ajaxFailed,
    	});
    });
});

function showSongs_XML(ajax) {
	xmldoc=ajax.responseXML;
	var top = xmldoc.getElementsByTagName("title").length;
	while($("songs").firstChild){
		$("songs").removeChild($("songs").firstChild);
	}
	for(var $i=0;$i<top;$i++){
	var string = "";
	var title = xmldoc.getElementsByTagName("title")[$i].firstChild.nodeValue;
	var artist = xmldoc.getElementsByTagName("artist")[$i].firstChild.nodeValue;
	var genre= xmldoc.getElementsByTagName("genre")[$i].firstChild.nodeValue;
	var time = xmldoc.getElementsByTagName("time")[$i].firstChild.nodeValue;
	string = '<li>'+title+' - '+artist +"["+genre+"]"+"("+time+')</li>';
	$("songs").insert(string);
	}

	//$("#songs").append(songs);
	

}
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function showSongs_JSON(ajax) {
	var data = JSON.parse(ajax.responseText);
	while($("songs").firstChild){
		$("songs").removeChild($("songs").firstChild);
	}
	for (var i=0 ; i<data.songs.length; i++){
		var li = document.createElement("li");
		li.innerHTML = data.songs[i].title +" - "+data.songs[i].artist+"["+
		data.songs[i].genre+"]"+"("+data.songs[i].time+")";
		$("songs").appendChild(li);	
	}
}

function ajaxFailed(ajax, exception) {
	var errorMessage = "Error making Ajax request:\n\n";
	if (exception) {
		errorMessage += "Exception: " + exception.message;
	} else {
		errorMessage += "Server status:\n" + ajax.status + " " + ajax.statusText + 
		                "\n\nServer response text:\n" + ajax.responseText;
	}
	alert(errorMessage);
}
