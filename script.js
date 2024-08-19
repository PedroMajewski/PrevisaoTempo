const Key = '60ef77e775c6c4752b51bd9d06afe257';

async function CallWeatherAPI(City) {
    const CallAPI = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${Key}&lang=pt_br&units=metric`).then(response => response.json())
    .catch((error) => {
        console.error(`Erro ao executar o código: ${error}`)
    });
    if(CallAPI.cod == '404'){
        clearAPI();
        
    }else{
        ShowInfo(CallAPI);
    }
    console.log(CallAPI)
}

function showDate(){
    const Data = document.getElementById('data')
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Adiciona um zero à esquerda se necessário
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Os meses são baseados em zero (0-11), então adiciona 1
    const year = today.getFullYear();
    Data.innerText = `Hoje é dia: ${day}/${month}/${year}`

}

showDate();

function SearchAPI(){
    const cityname = document.getElementById('search').value;
    if(cityname == ''){
    alert('Preencha todos os campos!');
    }else{
        CallWeatherAPI(cityname);
    }
}

function ShowInfo(city){
    const searchBarMessage = document.getElementById('searchBarMessage')
    searchBarMessage.innerText = ''
    searchBarMessage.style.marginTop = '0rem'
    const weatherInfoClass = document.getElementById('weatherInfo');
    weatherInfoClass.classList.add('.aberto')
    weatherInfoClass.style.height = '45%';
    weatherInfoClass.style.padding = '1rem';
    const weatherInfo = document.getElementById('weatherInfoCity');
    weatherInfo.innerText = `Tempo em ${city.name}, ${city.sys.country}`
    const weatherMaxInfoCity = document.getElementById('weatherMaxInfoCity');
    weatherMaxInfoCity.innerText = `Max: ${city.main.temp_max} °C`
    const weatherMinInfoCity = document.getElementById('weatherMinInfoCity');
    weatherMinInfoCity.innerText = `Min: ${city.main.temp_min} °C`
    const weatherConditionInfo = document.getElementById('weatherConditionInfo');
    weatherConditionInfo.innerText = `${city.weather[0].description}`
    const weatherUmityInfo = document.getElementById('weatherUmityInfo');
    weatherUmityInfo.innerText = `Umidade: ${city.main.humidity}%`
    const stateImg = document.querySelector('#stateImg');
    stateImg.src = `./assets/Icons/${city.weather[0].icon}.png`
}


function clearAPI(){
    const searchBar = document.getElementById('searchBar');
    const searchBarMessage = document.getElementById('searchBarMessage')
    searchBarMessage.innerText = 'Cidade não encontrada :('
    searchBarMessage.style.color = '#fff'
    searchBarMessage.style.marginTop = '1rem'
    searchBar.appendChild(searchBarMessage);
    const weatherInfo = document.getElementById('weatherInfoCity');
    weatherInfo.innerText = ``
    const weatherMaxInfoCity = document.getElementById('weatherMaxInfoCity');
    weatherMaxInfoCity.innerText = ``
    const weatherMinInfoCity = document.getElementById('weatherMinInfoCity');
    weatherMinInfoCity.innerText = ``
    const weatherConditionInfo = document.getElementById('weatherConditionInfo');
    weatherConditionInfo.innerText = ``
    const weatherUmityInfo = document.getElementById('weatherUmityInfo');
    weatherUmityInfo.innerText = ``
     const stateImg = document.querySelector('#stateImg');
    stateImg.src = ``
}

