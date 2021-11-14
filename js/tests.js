// THEME 
// Theme Class
class ThemeObj {
    constructor() {
        this.current_color = '#ffffff';
        
    }
    
    get_current_color() {
        return this.current_color;
    }
    set_current_color(newcolor) {
        this.current_color = newcolor;
    }

    update_color(newColor) {
        this.set_current_color(newColor);
        this.current_color = this.get_current_color();
        //set cond, temp, location to newColor
    }

}

//Theme Test
describe("Theme Object", () => {
    it('updates color', () => {
        const themeTest = new ThemeObj();
        const newColor = "#f5f8c2";

        expect(themeTest.current_color).toBe('#ffffff');
        
        themeTest.update_color(newColor);

        expect(themeTest.current_color).toBe("#f5f8c2");

    });

});

//Background Class
class Background {
    constructor() {
        this._links = [
            "C:\\Users\\Jake Opie\\testTesting\\testing\\images\\sunnyWeather.jpeg",
            "C:\\Users\\Jake Opie\\testTesting\\testing\\images\\rainyWeather.jpeg",
            "C:\\Users\\Jake Opie\\testTesting\\testing\\images\\starsInSky.jpeg"
        ];
        this._default_background = 0;
        this._current_background = 0;
        this._current_url = 'C:\\Users\\Jake Opie\\testTesting\\testing\\images\\sunnyWeather.jpeg';
        this._conditions = '';
        this._current_conditions = '';
    }

    //cycle_background to next background
    cycle_background() {
        let myNum = this.get_current_background();
        if (myNum == 2) {
            this.set_current_background(0);
        }
        else {
            this.set_current_background(myNum += 1);
        }
        this._current_url = `${this._links[this.get_current_background()]}`;
    }

    //change background dynamically
    dynamic_background(cond) {
        if (cond.includes("thunderstorm") || cond.includes("rain") || cond.includes("snow") || cond.includes("drizzle")) {
            this.set_current_background(1);
            this._current_url = `${this._links[this.get_current_background()]}`;
        }
        else if (cond.includes("clouds") || cond.includes("sky") == cond.includes("clear")) {
            this.set_current_background(0);
            this._current_url = `${this._links[this.get_current_background()]}`;
        }
    }

    get_current_background() {
        return this._current_background;
    }
    set_current_background(bg) {
        this._current_background = bg;
    }
}

//Background Test
describe("Background Object", () => {
    
    it('cycles to next background', () => {
        const bgObj = new Background();

        expect(bgObj.get_current_background()).toBe(0);

        bgObj.cycle_background();

        expect(bgObj.get_current_background()).toBe(1);
        expect(bgObj._current_url).toBe("C:\\Users\\Jake Opie\\testTesting\\testing\\images\\rainyWeather.jpeg");
    });

    it('has dynamic changing', () => {
        const bgObj = new Background();
        bgObj.set_current_background(0);
        const rainy = 'heavy rain';
        const sunny = 'clear';

        expect(bgObj._current_url).toBe("C:\\Users\\Jake Opie\\testTesting\\testing\\images\\sunnyWeather.jpeg");

        bgObj.dynamic_background(rainy);

        expect(bgObj._current_url).toBe("C:\\Users\\Jake Opie\\testTesting\\testing\\images\\rainyWeather.jpeg");


    })

});


//Inputs Test
class Inputs {
    constructor() {
        this.current_location = "Chicago";
        this.default_location = "Chicago";
    }

    //update location to feed DOM
    get_current_location() {
        return this.current_location;
    }
    set_current_location(loc) {
        this.current_location = loc;
    }
    
    
}

//Inputs Test
describe('Inputs Object', () => {
    
    it('properly sets location', () => {
        const inputObj = new Inputs();
        const formerCity = inputObj.default_location;
        const newCity = 'Temecula';
        
        expect(inputObj.get_current_location()).toBe(formerCity);

        inputObj.set_current_location(newCity);

        expect(inputObj.get_current_location()).toBe(newCity);

    })
});

//WEATHER
//Weather class
class Weather {
    constructor(key) {
        this._key = key;
        this.location = 'Chicago';
    }

    //constructs URL using specific key and city name
    create_URL() {
        let cityName = this.location;
        return 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid='+this._key+'&units=imperial'
    }
}

//Weather Test
describe("Weather Object", () => {

    it('builds API call URL', () => {
        const APIKEY = 'mykeyhere';
        const weatherObj = new Weather(APIKEY);

        expect(weatherObj.create_URL()).toBe('https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=mykeyhere&units=imperial')

        //sss
    })

})