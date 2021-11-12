// Theme Class
// Handles color changing of display and text
class Theme {
    constructor(display, data, title) {
        this.display_handle = display;
        this.data_handle = data;
        this.title_handle = title;
        this.default_color = '#ffffff';
        this.current_color = '#ffffff';
    }

    //update color on webpage
    update_color(newcolor) {
        this.set_current_color(newcolor);
        this.display_handle.style.color = this.get_current_color();
        this.data_handle.style.color = this.get_current_color();
        this.title_handle.style.color = this.get_current_color();
        this.data_handle.style.borderRight = `10px solid ${this.get_current_color()}`;
    }

    //set color to default color
    //need add button to set color to white
    paint_default_color() {
        this.set_current_color(this.get_default_color());
        this.display_handle.style.color = this.get_current_color();
        this.data_handle.style.color = this.get_current_color();
        this.title_handle.style.color = this.get_current_color();
    }

    //getters and setters necessary
        
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

// Data Class
// Data Handling class ; changing temps and conditions text
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
    //might need add high/low functionality
    change_today_temps(temp) {
        this.set_today_temps(temp);
        displayHandle.innerHTML = this.get_today_temps();
    } 

    //change today's condition
    change_today_conditions(cond) {
        this.set_today_conditions(cond);
        condHandle.innerHTML = this.get_today_conditions();
    }

    //getters and setter necessary

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

// access to temperature DOM elements
const tempHandle = document.querySelector('.disp');
// access to condition DOM elements
const condHandle = document.querySelector(".testCond")
// choose better name for displayHandle probably
const displayHandle = document.querySelector(".disp");
// access to Day/Display DOM elements
const dataHandle = document.querySelector(".displayGrid");
// access to title DOM elements
const titleHandle = document.getElementById("mainHeader");
// test; connected to temperature DOM elements
const testHandle = document.querySelector(".disp");

//init theme object
//might need change dataHandle input to data object
const themeObj = new Theme(displayHandle, dataHandle, titleHandle);

//init data object
const dataObj = new Data('Current Location', '#ffffff');

//init background object
const backgroundObj = new Background('sunny');

//color changing for theme
function changeCol() {
    const newColor = document.getElementById("colorPicker").value;
    themeObj.update_color(newColor);
    testHandle.style.color = newColor;
}

//call whenever the API is called, after data is received and
//condition is parsed
function dynBg(cond) {
    backgroundObj.dynamic_background(cond);
}

//for testing class and cycle button
function cycleBg() {
    backgroundObj.cycle_background();
}


//Add logic for retrieving data from API and changing location and temps
//Weather Class Functionality

