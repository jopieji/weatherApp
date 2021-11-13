class Theme {
    constructor(display, data, title) {
        this.display_handle = display;
        this.data_handle = data;
        this.title_handle = title;
        this.default_color = '#ffffff';
        this.current_color = '#ffffff';
    }

    update_color(newcolor) {
        this.set_current_color(newcolor);
        this.display_handle.style.color = this.get_current_color();
        this.data_handle.style.color = this.get_current_color();
        this.title_handle.style.color = this.get_current_color();
    }

    paint_default_color() {
        this.set_current_color(this.get_default_color());
        this.display_handle.style.color = this.get_current_color();
        this.data_handle.style.color = this.get_current_color();
        this.title_handle.style.color = this.get_current_color();
    }


        
    get_current_color() {
        return this.current_color;
    }
    set_current_color(newcolor) {
        this.current_color = newcolor;
    }

    get_default_color() {
        return this.default_color;
    }
    
    get_display_handle() {
        return this.display_handle;
    }

    get_data_handle() {
        return this.data_handle;
    }

    get_title_handle() {
        return this.title_handle;
    }


}

class Data {
    constructor(location, color) {
        this.location = location;
        this.current_color = color;
        this.today_temps = 0;
        this.today_conditions = 'Condition';
    }

    //change location in header
    change_location(loc) {
        this.set_current_location(loc);
        titleHandle.innerHTML = toTitle(loc);
    }

    //change today's temperature
    change_today_temps(temp) {
        this.set_today_temps(temp);
        displayHandle.innerHTML = this.get_today_temps();
    } 

    //change today's condition
    change_today_conditions(cond) {
        this.set_today_conditions(cond);
        condHandle.innerHTML = this.get_today_conditions();
    }


    get_current_location() {
        return this.location;
    }

    set_current_location(location) {
        this.location = location;
    }

    get_today_temps() {
        return this.today_temps;
    }

    set_today_temps(temp) {
        this.today_temps = temp;
    }

    get_today_conditions() {
        return this.today_conditions;
    }

    set_today_conditions(cond) {
        this.today_conditions = cond;
    }

}

class Background {
    constructor(cond) {
        this._links = [
            "/Users/jakeopie/weatherApp/images/sunnyWeather.jpeg",
            "/Users/jakeopie/weatherApp/images/rainyWeather.jpeg",
            "/Users/jakeopie/weatherApp/images/starsInSky.jpeg"
        ];
        this._default_background = 0;
        this._current_background = 0;
        this._conditions = '';
        this._current_conditions = cond;
    }

    //let w = 0 ;;; w is not _current_background;
    //cycle_background to next background; mainly used for testing
    //can add button to call this method
    cycle_background() {
        let myNum = this.get_current_background();
        if (myNum == 2) {
            this.set_current_background(0);
        }
        else {
            this.set_current_background(myNum += 1);
        }
        document.body.style.background = `url(${this._links[this.get_current_background()]}) no-repeat`;
        document.body.style.backgroundSize = 'cover';
    }

    //set background to default in case of extra condition (hail, etc)
    default_background() {
        document.body.style.background = `url(${this._links[0]}) no-repeat`;
        document.body.style.backgroundSize = 'cover';
    }

    //main background changing function
    //need to pass in weather[0]['main'] as cond, i think
    //if not, use weather[0]['id'] and use condition codes
    dynamic_background(cond) {
        if (cond.includes("thunderstorm") || cond.includes("rain")) {
            this.set_current_background(1);
            document.body.style.background = `url(${this._links[1]}) no-repeat`;
            document.body.style.backgroundSize = 'cover';
        }
        else if (cond.includes("clouds") || cond.includes("sky")) {
            this.set_current_background(0);
            document.body.style.background = `url(${this._links[0]}) no-repeat`;
            document.body.style.backgroundSIze = 'cover';
        }
        // add third snowy condition?
    }

    //plain black background
    //add button to call this function
    clear_background() {
        document.body.style.backgroundColor = 'black'; 
    }

    //getters and setters necessary
    get_current_conditions() {
        return this._current_conditions;
    }
    set_current_conditions(cond) {
        this._current_conditions = cond;
    }

    get_current_background() {
        return this._current_background;
    }
    set_current_background(bg) {
        this._current_background = bg;
    }

    get_default_background() {
        return this._default_background;
    }
}

//Inputs Class to handle inputs and API Request Frequency
//maybe add method to get date and date for better display
class Inputs {
    constructor() {
        this.current_location = "Chicago";
        this.default_location = "Chicago";
        this.date_obj = new Date();
        this._last_time = this.date_obj.getSeconds();
        this._current_time = this.date_obj.getSeconds();
    }

    //for submitting location from field to weather api class
    submit_location() {
        let header = document.getElementById('mainHeader')
        let field = document.getElementById("locationField").value
        // code below gets the value of the input field
        header.innerHTML = toTitle(field)
        //return field ;;; maybe to pass into weather API or
        // can keep them separate
    }
    
    //update last time to signify last time api was called
    update_time() {
        this.set_last_time();
    }

    //check this condition before calling API to prevent overloading requests
    check_time_diff() {
        if (Math.abs(this.get_current_time() - this.get_last_time()) < 3) {
            return false;
        }
        return true;
    }

    //error shown when request too soon
    show_error() {
        alert("Couldn't process request");
    }

    //getters and setters
    get_current_location() {
        return this.current_location;
    }
    set_current_location(loc) {
        this.current_location = loc;
    }

    get_default_location() {
        return this.default_location;
    }

    get_last_time() {
        return this._last_time;
    }
    set_last_time() {
        this._last_time = this.date_obj.getSeconds();
    }

    get_current_time() {
        this._current_time = this.date_obj.getSeconds();
        return this._current_time;
    }


}

class Weather {
    constructor(key, url) {
        this._key = key;
        this._url = url;
        this.location = 'Chicago';
        this.current_temp = 0;
        this.current_high = 0;
        this.current_low = 0;
        this.current_condition = "Clear";
    }

    create_URL(city) {
        let city = document.getElementById("locationField").value;
        return 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+OWA_KEY+'&units=imperial'
    }

    fetch_weather() {
        let city = document.getElementById("locationField").value;
    fetch(this.create_URL(city))
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        const { temp } = data.main;
        const { description } = data.weather[0];

        dataObj.change_today_temps(temp);
        dataObj.change_location(city);
        dataObj.change_today_conditions(description);
        //cond.innerHTML = `${description}`;
        //temper.innerHTML = `${temp}`;
    });
    
    }

    get_current_temp() {
        return this.current_temp;
    }

    set_current_temp(temp) {
        this.current_temp = temp;
    }

    get_current_high() {
        return this.current_high;
    }

    set_current_high(highTemp) {
        this.current_high = highTemp;
    }

    get_current_low() {
        return this.current_low;
    }

    set_current_low(lowTemp) {
        this.current_low = lowTemp;
    }

    get_current_condition() {
        return this.current_condition;
    }

    set_current_condition(cond) {
        this.current_condition = cond;
    }

    get_location() {
        return this.location;
    }

    set_location(loc) {
        this.location = loc;
    }
}