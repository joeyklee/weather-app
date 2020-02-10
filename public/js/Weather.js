class Weather {
  constructor(options){
    // api.openweathermap.org/data/2.5/weather?q={city name},{state}
    this.config = {
      API_KEY: options.apiKey || "8a0fb5fc01c4876b3fd44716f18a4141",
      CURRENT_WEATHER_URL: "https://api.openweathermap.org/data/2.5/weather",
      LOCATION_NAME: options.locationName || 'Brooklyn,nyc',
      UNITS:'metric'
    }
    
    this.data = {
      current: {},
    };
  }

  async init(){
    this.initializeForm();
    await this.update();
  }

  /**
   * initialize the form behavior
   */
  initializeForm(){
    const $form = document.querySelector('.form__container');
    
    $form.addEventListener('submit', async (e) => {
      e.preventDefault();
      this.config.LOCATION_NAME = encodeURI(e.target.location.value);
      await this.update();
    })
  }

  // /**
  //  * initialize the form behavior
  //  */
  // initializeForm(){
  //   const $form = document.querySelector('.form__container');
  //   $form.addEventListener('submit', this.submitForm())
  // }

  // /**
  //  * Submit the form
  //  */
  // submitForm(){
  //   return async (e) => {
  //     e.preventDefault();
  //     this.config.LOCATION_NAME = e.target.location.value;
  //     await this.getCurrentWeather();
  //     this.renderCurrentWeather(this.data.current)
  //   }
  // }

  // /**
  //  * initialize the form behavior
  //  */
  // initializeForm(){
  //   const $form = document.querySelector('.form__container');
  //   $form.addEventListener('submit', this.submitForm.bind(this))
  // }

  // async submitForm(e){
  //   e.preventDefault();
  //   this.config.LOCATION_NAME = e.target.location.value;
  //   await this.getCurrentWeather();
  //   this.renderCurrentWeather(this.data.current)
  // }

  /**
   * GET current weather
   */
  async getCurrentWeather(){
    try{
      const {CURRENT_WEATHER_URL,LOCATION_NAME,UNITS, API_KEY} = this.config;
      const requestURL = `${CURRENT_WEATHER_URL}?q=${LOCATION_NAME}&units=${UNITS}&APPID=${API_KEY}`
      const data = await fetch(requestURL);
      this.data.current = await data.json();  
    } catch(err){
      alert(err);
    }
    
  }

  /**
   * Render the current data
   * @param {*} currentData 
   */
  renderCurrentWeather(currentData){
    
    if(currentData.message){
      alert(`uh-oh! Looks like you formatted your city name incorrectly or that city does not exist. \n\n For example: \n ❤️ correct: vancouver,canada \n ✖️ incorrect: vancouver,bc`)
    }

    const currentTemp = Math.round(currentData.main.temp);
    const currentFeelsLikeTemp = Math.round(currentData.main.feels_like);
    const location = currentData.name;
    const desc = currentData.weather[0].description
    
    const el = `
    <section class="current">
      <p class="current__location">${location}</p>
      <p class="current__feels">Feels like ${currentFeelsLikeTemp}°</p>
      <h2 class="current__temperature">${currentTemp}°</h2>
      <p class="current__description">${desc}</p>
    </section>
    `
    
    const $currentEl = this.createElementFromText(el);
    const $current = document.querySelector(".current");
    $current.replaceWith($currentEl)
  }

  async update(){
    await this.getCurrentWeather();
    this.renderCurrentWeather(this.data.current)
  }


  /**
   * Creates an HTML element from a string
   * @param {*} textEl 
   */
  createElementFromText(textEl){
    let $currentEl = document.createElement('div')
    $currentEl.innerHTML = textEl;
    $currentEl = $currentEl.firstElementChild;
    
    return $currentEl;
  }

}