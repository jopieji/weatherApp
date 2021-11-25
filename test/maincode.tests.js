//const { expect } = require('@jest/globals');
//const Theme = require('/js/maincode');
//test("Returns #ffffff as beginning current_color", () => {
    //expect(get_current_color()).toBe("#ffffff");
//});

describe("Theme Obj", () => {
    const theme = new Theme();

    expect(theme.current_color).toBe("#ffffff");
});
/*
    it.todo("has current_color");
 
    it.todo('can accept new color via update_color');

    it.todo('can update temp, cond, title color');
})
*/