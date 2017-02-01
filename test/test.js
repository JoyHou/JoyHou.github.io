/**
 * Created by Joy on 10/6/16.
 */

function httpGetAsync(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            var Js = JSON.parse(xmlHttp.responseText);
            if (Js.inhale) {
                document.getElementById('lung').innerHTML = "inhale";
            } else {
                document.getElementById('lung').innerHTML = "exhale";
            }

        //document.getElementById('lung').innerHTML = Js.inhale;
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function setContent(text) {

}
//httpGetAsync("http://google.com", setContent)

httpGetAsync("http://linserv1.cims.nyu.edu:25804/lung")
var i = 2;