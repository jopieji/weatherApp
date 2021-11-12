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