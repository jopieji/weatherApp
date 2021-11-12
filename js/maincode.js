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


function changeCol() {
    const newColor = document.getElementById("colorPicker").value;
    themeObj.update_color(newColor);
    testHandle.style.color = newColor;
}

//Add logic for retrieving data from API and changing location and temps


