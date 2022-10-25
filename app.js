const onSubmit=()=>{
    let divimg=document.getElementById("images")
    const temperaturedesc=document.getElementById("temperature")
    const weatherdescription=document.getElementById("weather")
    const errordisplay=document.getElementById("error")
    errordisplay.innerText=""
    temperaturedesc.innerText=""
    weatherdescription.innerText=""
    divimg.innerText=""
    console.log("clicked")
    const city=document.getElementById("cityname").value
    const apiid="60b9ddbffa8ad3ca675c8182d59fefd0";
    const unitschosen=document.getElementById("units")
    var value=unitschosen.options[unitschosen.selectedIndex].text
    var units;
    var measurement;
    switch(value){
        case "Celsius": {units="metric"
        measurement="℃"
        break
        }
        case "Fahrenheit": {units="imperial"
        measurement="℉"
        break
        }
        case "Kelvin":{ units="standard"
        measurement="K"
        break
        }
    }
    console.log(city)
    async function funcRequest(url){
        await fetch(url)
           .then((response) => {
             return response.json(); // data into json
           })
           .then((weatherdata) => {
             // Here we can use the response Data
             var weatherdesc=""
             let weatherinfo=[]
             let weatherimg=[]
             let weatherurl=[]
             for(let i=0;i<weatherdata.weather.length;i++){
                 weatherinfo[i]=weatherdata.weather[i].description;
                 if(i!=weatherdata.weather.length-1)
                 weatherdesc=weatherdesc+weatherinfo[i]+" and ";
                 else
                 weatherdesc=weatherdesc+weatherinfo[i]
                 weatherimg[i]=weatherdata.weather[i].icon;
                 weatherurl[i]="http://openweathermap.org/img/wn/"+weatherimg[i]+"@2x.png"
                 console.log(weatherinfo[i])
             }
             const temperature=weatherdata.main.temp;
             console.log(temperature)
             document.getElementById("addClass").className = "alert alert-success";
             temperaturedesc.innerText = "The temperature in " + weatherdata.name + " is " + temperature + measurement
             weatherdescription.innerText="The weather is currently "+weatherdesc
             for(let i=0;i<weatherdata.weather.length;i++){
             var img=document.createElement("img")
             img.setAttribute("id","img{i}")
             img.src=weatherurl[i]
             divimg.appendChild(img)
             }
           })
           .catch(function(error) {
             errordisplay.innerText = "Incorrect City Name Please check the city name"
             errordisplay.className="alert alert-danger"
           });
       }
          const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiid+"&units="+units;
          funcRequest(url);
    //     resp.on("data",function(data){
    //         const weatherdata=JSON.parse(data)
  
    //     })
    // })
}
