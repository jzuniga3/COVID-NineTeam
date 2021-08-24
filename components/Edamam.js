import fire from './fire';
// background function for api response for the barcode scanner
export async function sendApiRequest(UPC) {
    // application identifiers for edamam
    let APP_ID = "d6a2d254";
    //app access key for edamam
    let API_KEY = "893c02ccf6f4bb530970aa7d0b4a39fa";
    //waits for the api server to return a response and presents a return json file with all food info
    await fetch('https://api.edamam.com/api/food-database/v2/parser?upc=' + UPC + '&app_id=' + APP_ID + '&app_key='+ API_KEY).then(response => {
        return response.json();
        //converts response from server to readable json file
    }).then((data) => {
        if(typeof data.hints == "undefined") { //If Edamam doesn't have the UPC
            storeToDatabase(-1);
        }
        else {
            //searches json file for specified calorie value, may be changed to present different things to the barcode scanner
            const calories = data.hints[0].food.nutrients.ENERC_KCAL;
            storeToDatabase(calories);
        }
    })
}
// stores calorie value into firebase database
function storeToDatabase(calories) {
        fire
        .database()
        .ref('users/' + fire.auth().currentUser.email.replace('.',','))
        .update({
            caloriesConsumed: Math.round(calories),
        });
}
