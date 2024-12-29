

var city= document.getElementById('findLocation')
async function get(city) {
    if(city.length>2){
    let res=await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${city}&days=3&key=f5ff979005d74323a2a163356242812`);
    
  let result = await res.json();
        console.log(result)
        display(result)
    
}}

city.addEventListener('input',function(e){
    get(e.target.value)
}
)

function display(data){
    let today= new Date (data.current.last_updated)

   
    document.getElementById('todayName').innerHTML =  today.toLocaleString('en-us',{weekday:'long'});
document.getElementById('todayDate').innerHTML = today.getDate()+' '+today.toLocaleString('en-us',{month:'long'})
document.getElementById('location').innerHTML = data.location.name;
document.getElementById('todayTemp').innerHTML = data.current.temp_c;
document.getElementById('todayIcon').setAttribute('src',`https:${data.current.condition.icon}`)
document.getElementById('todayCondition').innerHTML = data.current.condition.text;
document.getElementById('humidity').innerHTML = data.current.humidity+'%';
document.getElementById('wind-speed').innerHTML = data.current.wind_kph+'km/h';
document.getElementById('wind-dir').innerHTML =data.current.wind_dir;
let cartoona =""
 for (let i=1;i<=2;i++){
  let dateNext = new Date (data.forecast.forecastday[i].date)
  console.log(dateNext)
  cartoona = 
              ` 
              <div class="forecast-card  ${i==1?'mid':''}  row-data text-white text-center h-100">
                  <div class="mid  first p-2 mb-5 ">${dateNext.toLocaleString('en-us',{weekday:'long'})}</div>
                  
                    <img src="https:${data.forecast.forecastday[i].day.condition.icon}" alt="" width="90">
                
                      <div class="fs-1">${data.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C</div>
                      <div class="fs-1">${data.forecast.forecastday[i].day.mintemp_c}<sup>o</sup>C</div>
             
                  <div class="text-primary">${data.forecast.forecastday[i].day.condition.text}</div>
                
                  </div> 
            </div> 
              `
              document.querySelectorAll('.card-days')[i-1].innerHTML = cartoona
 }

}

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
      console.log(pos)
      let lat = pos.coords.latitude;
      let lon = pos.coords.longitude;
      getDataApi(`${lat},${lon}`)
    })
  }

  const links = document.querySelectorAll('.nav-link');
  console.log(links)
  
  for(let i = 0;i<links.length;i++){
    links[i].addEventListener('click',function(e){
      e.preventDefault()
      links.forEach(function(x){
        x.classList.remove('active')
      })
      links[i].classList.add('active');
      
    })
  }