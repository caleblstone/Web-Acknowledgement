


(function($) {

})(jQuery);
// Order of things
// 1. Get URL
// 2. Use URL to get Lat Lng
// 3. Use Lat Lng to feed into native land
// 4. Draw shit on the page

var url

(function() {
    chrome.runtime.onMessage.addListener(function(message) {
        url = message.parameter.url;
        one()
    });
})();


let places = []
let properties = []
let names = []
let slug = []
let link = []
let city
let region
let country
let lat
let lng


function one() {
  var url2 = url.split("/")
  var urlFin = url2[2]
  var ip = "134.201.250.155";
  // var api_key = "at_TRRchhd42ohdYhBwd5qs5R8BiZPNS";


  $(function () {
     $.ajax({
         url: "https://geo.ipify.org/api/v1",
         data: {apiKey: api_key, domain:urlFin},
         success: function(data) {
             //$("body").append("<pre>"+ JSON.stringify(data,"",2)+"</pre>");
             console.log(data.location.lat, data.location.lng);
             lat = data.location.lat
             lng = data.location.lng
             city = data.location.city
             region = data.location.region
             country = data.location.country
             console.log(data.location.city);
             dothething()
         }
     });

  });
}


function dothething() {
  let nativeURL = 'https://native-land.ca/api/index.php?maps=languages&position=' + lat + "," + lng
  console.log(nativeURL);
  fetch(nativeURL)
  .then(response => response.json())
  .then(data => obj = data)
  // .then(() => console.log(obj))
  .then(data => {
    for(var i = 0; i<= data.length - 1; i++){
        places.push(data[i])
        properties[i] = places[i]
        names[i]=properties[i].properties.Name
        slug[i]=properties[i].properties.Slug
     }
   })
  .then(data => makeBox());
}


function makeBox(){

  console.log(names);
  const newDiv = document.createElement("div");
  const newDiv2 = document.createElement("div");
  const newDiv3 = document.createElement("div");
  newDiv.classList.add("specialDiv")
  newDiv2.classList.add("specialDiv2")
  newDiv3.classList.add("specialDiv3")

  newDiv3.style.position = "fixed"
  newDiv3.style.zIndex = "200"
  newDiv3.style.clear = "both"
  newDiv3.style.justifyContent = "center"
  newDiv3.style.alignItems = "center"
  newDiv3.style.top = "0px"
  newDiv3.style.left = "0px"
  newDiv3.style.width = "100%"
  newDiv3.style.height = "100vh"
  newDiv3.style.backgroundColor = "rgba(255,255,255,.5)"

  newDiv.style.position = "fixed"
  newDiv.style.zIndex = "200"
  newDiv.style.clear = "both"
  newDiv.style.display = "flex"
  newDiv.style.justifyContent = "center"
  newDiv.style.alignItems = "center"
  newDiv.style.top = "0px"
  newDiv.style.left = "0px"
  newDiv.style.width = "100%"
  newDiv.style.height = "100vh"

  newDiv.style.backdropFilter = "blur(4px)"

  newDiv2.style.width = "60%"
  newDiv2.style.border = "4px solid black"
  newDiv2.style.padding = "5vw"
  newDiv2.style.zIndex = "201"
  newDiv2.style.fontSize = "4vw"
  newDiv2.style.lineHeight = "1.3"
  newDiv2.style.fontFamily = "Arial"
  newDiv2.style.color = "black"


  for (var i = 0; i < names.length; i++) {

    link[i] = document.createElement('a');
    var text = document.createTextNode(names[i]);
    link[i].appendChild(text);
    link[i].title = names[i]
    link[i].href = "https://native-land.ca/maps/territories/" + slug[i]
    link[i].target = "_blank"
    console.log(link[i].href);
    link[i].style.color = "blue"
    link[i].style.textDecoration = "underline"

  }


  let response = document.createElement('p');

  if (names < 1) {
    response1 = "This website occupies land not indexed by "
    if (country == "US") {
      response1_2 = " " + "(" + city + ", " + region + ")"
    }
    else {
      response1_2 = " " + "(" + city + ", " + country + ")"
    }
    native_land = document.createElement('a')
    nlText = document.createTextNode("native-land.ca")
    native_land.appendChild(nlText)
    native_land.href = "https://native-land.ca/"
    responseNode1 = document.createTextNode(response1)
    responseNode1_2 = document.createTextNode(response1_2)
    newDiv2.appendChild(responseNode1);
    newDiv2.appendChild(native_land);
    newDiv2.appendChild(responseNode1_2);
  }
  else {
    response1 = "This website occupies "
    response1_2 = " territory. (" + city + ", " + region + ")"
    responseNode1 = document.createTextNode(response1)
    responseNode1_2 = document.createTextNode(response1_2)
    newDiv2.appendChild(responseNode1)
    if (link.length > 1) {
      for (var i = 0; i < link.length; i++) {
        newDiv2.appendChild(link[i])
        and = document.createTextNode(" and ")
        if (i < link.length - 1) {
          newDiv2.appendChild(and)
        }
      }
    }
    else {
      newDiv2.appendChild(link[0])
    }
    newDiv2.appendChild(responseNode1_2)
  }
  buttonDiv = document.createElement("div")
  button = document.createElement("a")
  lineBreak = document.createElement("br")
  buttonTxt = document.createTextNode("Return to site.")
  newDiv2.appendChild(lineBreak)
  button.appendChild(buttonTxt)
  buttonDiv.appendChild(button)
  button.title = "Return to site."
  button.style.fontSize = "4vw"
  button.style.lineHeight = "1.3"
  buttonDiv.style.marginTop = "5.2vw"
  buttonDiv.style.marginBottom = "-1.3vw"
  button.style.fontFamily = "Arial"
  button.style.color = "blue"
  button.style.textDecoration = "underline"
  newDiv2.appendChild(buttonDiv)


  newDiv.appendChild(newDiv2);

  const currentDiv = document.getElementById("div1");
  document.body.insertBefore(newDiv3, currentDiv);
  document.body.insertBefore(newDiv, currentDiv);

  button.addEventListener("click", function(){
    newDiv.style.display = "none"
    newDiv2.style.display = "none"
    newDiv3.style.display = "none"
  })
}
