var drinksCard = $(".drinksCard")
var yesBtn = $(".yes")
var noBtn = $(".no")
var buttonsDiv = $(".yesOrNo")
const APIKey = '9973533';
const APIURL = 'https://www.thecocktaildb.com/api/json/v2/9973533/';

/*the autocomplete function takes two arguments: the text field element and an array of possible autocompleted values:*/
const dogsList = ["affenpinscher", "african", "airedale", "akita", "appenzeller", "australian", "basenji", "beagle", "bluetick", "borzoi", "bouvier", "boxer", "brabancon", "briard", "buhund", "bulldog", "bullterrier", "cairn", "cattledog", "chihuahua", "chow", "clumber", "cockapoo", "collie", "coonhound", "corgi", "cotondetulear", "dachshund", "dalmatian", "dane", "deerhound", "dhole", "dingo", "doberman", "elkhound", "entlebucher", "eskimo", "finnish", "frise", "germanshepherd", "greyhound", "groenendael", "havanese", "hound", "husky", "keeshond", "kelpie", "komondor", "kuvasz", "labrador", "leonberg", "lhasa", "malamute", "malinois", "maltese", "mastiff", "mexicanhairless", "mix", "mountain", "newfoundland", "otterhound", "ovcharka", "papillon", "pekinese", "pembroke", "pinscher", "pitbull", "pointer", "pomeranian", "poodle", "pug", "puggle", "pyrenees", "redbone", "retriever", "ridgeback", "rottweiler", "saluki", "samoyed", "schipperke", "schnauzer", "setter", "sheepdog", "shiba", "shihtzu", "spaniel", "springer", "stbernard", "terrier", "vizsla", "waterdog", "weimaraner", "whippet", "wolfhound"];

const subBreedObj = {affenpinscher: [ ], african: [ ], airedale: [ ], akita: [ ], appenzeller: [ ], australian: ["shepherd"], basenji: [ ], beagle: [ ], bluetick: [ ], borzoi: [ ], bouvier: [ ], boxer: [ ], brabancon: [ ], briard: [ ], buhund: ["norwegian"], bulldog: ["boston", "english", "french"], bullterrier: ["staffordshire"], cairn: [ ], cattledog: ["australian"], chihuahua: [ ], chow: [ ], clumber: [ ], cockapoo: [ ], collie: ["border"], coonhound: [ ], corgi: ["cardigan"], cotondetulear: [ ], dachshund: [ ], dalmatian: [ ], dane: ["great"], deerhound: ["scottish"], dhole: [ ], dingo: [ ], doberman: [ ], elkhound: ["norwegian"], entlebucher: [ ], eskimo: [ ], finnish: ["lapphund"], frise: ["bichon"], germanshepherd: [ ], greyhound: ["italian"], groenendael: [ ], havanese: [ ], hound: ["afghan","basset","blood","english", "ibizan","plott","walker"], husky: [ ], keeshond: [ ], kelpie: [ ], komondor: [ ], kuvasz: [ ], labrador: [ ], leonberg: [ ], lhasa: [ ], malamute: [ ], malinois: [ ], maltese: [ ], mastiff: ["bull","english", "tibetan"], mexicanhairless: [ ], mix: [ ], mountain: ["bernese","swiss"], newfoundland: [ ], otterhound: [ ], ovcharka: ["caucasian"], papillon: [ ], pekinese: [ ], pembroke: [ ], pinscher: ["miniature"], pitbull: [ ], pointer: ["german","germanlonghair"], pomeranian: [ ], poodle: ["miniature","standard","toy"], pug: [ ], puggle: [ ], pyrenees: [ ], redbone: [ ], retriever: ["chesapeake","curly","flatcoated","golden"], ridgeback: ["rhodesian"], rottweiler: [ ], saluki: [ ], samoyed: [ ], schipperke: [ ], schnauzer: ["giant","miniature"], setter: ["english", "gordon","irish"], sheepdog: ["english", "shetland",], shiba: [ ], shihtzu: [ ], spaniel: ["blenheim","brittany","cocker","irish","japanese","sussex","welsh"], springer: ["english"], stbernard: [ ], terrier: ["american","australian","bedlington","border","dandie","fox","irish","kerryblue","lakeland","norfolk","norwich","patterdale","russell","scottish","sealyham","silky","tibetan","toy","westhighland","wheaten","yorkshire"], vizsla: [ ], waterdog: ["spanish"], weimaraner: [ ], whippet: [ ], wolfhound: ["irish"]};


function autocomplete(inp, arr) {
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);

        /*check if each item starts with the same letters as the text field value:*/
        for (i = 0; i < arr.length; i++) {
            let n = arr[i].toUpperCase().indexOf(val.toUpperCase());
            if (n >= 0) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = arr[i].substr(0, n) + "<strong>" + arr[i].substr(n, val.length) + "</strong>" + arr[i].substr(n + val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists(); // close the list of autocompleted values
                });
                a.appendChild(b);

                if (a.childElementCount > 10) break; // limits the number of suggestions to the first 10
            }
        }
    });

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    /*a function to classify an item as "active":*/
    function addActive(x) {
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    /*a function to remove the "active" class from all autocomplete items:*/
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    /*close all autocomplete lists in the document, except the one passed as an argument:*/
    function closeAllLists(elmnt) {

        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}


$(document).on("input", "#breed", function() {
    // var input = $(this).val();
    var inputEl = event.target;
    autocomplete(inputEl, dogsList);
});
    

$("#search").on("click", searchForDogs); // the submit button will start the search query

$("#myInput").on("keydown", function (e) { // the enter button wills start the search query
    if (!$("#myInput").val()) return;
    if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        searchForDogs(e);
    }
});


// the submit button will start the search query
function searchForDogs(event) {
    event.preventDefault();
    //get the elements of class ".input-group" and assign them to inputEls
    var breed = $("#breed").val();
    var subBreed = $("#sub-breed").val();
    var qty = parseInt($("#qty").val());
    console.log(qty)

    var qURL = "https://dog.ceo/api/breed/" + breed + "/images";

    if(!qURL) {
        let card = $('<div class="col m4 s6"><h5>Please check the input</h5></div>');
        $("#results").append(card);
    } else {
        $.ajax({
            url: qURL,
            method: "GET"
        }).then(function(response) {
            var result = response.message;
                populateMealList(result, qty); //🍏
        })
    }
}

//     var inputEls = $(".myInput")
//     var urlArr = [];
//     for(var i=0; i<inputEls.length; i++) {
//         if(inputEls[i].value) { 
            
//             var qURL = "https://dog.ceo/api/breed/"
//             + inputEls[i].value + "/images";
//             //put the url to the urlArr array.
//             urlArr.push(qURL)
//         };
//     };
//     // set the level at 0
//     var l = 0;
//     if(!urlArr[l]) {
//         let card = $('<div class="col m4 s6"><h5>Please check the input</h5></div>');
//         $("#results").append(card);
//     } else {
//         $.ajax({
//             url: urlArr[l],
//             method: "GET"
//         }).then(function(response0) {
//             var result = response0.message;
//             console.log("0",result)
//             l++;
//             if(!urlArr[l]) {
//                 // resultOfMeals("meals",result);
//                 populateMealList(result, qty); //🍏
//             } 
//         }); //end of level 0
//     }
// }; //end of "search"

function populateMealList(list, qty) {
    $("#results").empty(); // reset the results div
    $("#query").empty();
    var length;
    if(isNaN(qty)) { length = list.length} else {length = qty}
    console.log(length)
    if (length === 0) { // the query failed to return any results
        let card = $('<div class="col m4 s6"><h5>No dogs found</h5></div>');
        $("#results").append(card);
    } else {
        for (i = 0; i < length; i++) {
            let card = $('<div class="col l12 m12 s12"></div>');
            let body = $('<div class="card">');
            let image = $('<div class="card-image"><img src="' + list[i] + '" class="responsive-img"></div>');
            body.append(image); // content
            card.append(body);
            $("#results").append(card);
        }

    }

};

// on click, we make sure the content-reveal card has its proper content. We do this with another API call
function populateReveal(event) {
    let mealID = event.target.dataset.id;
    let node = $('#card-reveal-' + mealID);
    if (node.text()) return; // don't repeat API alls for items that already have content in them

    $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealID,
        type: "GET"
    }).then(function (response) {
        let ingredientList = "";
        for (i = 1; i < 16; i++) {
            let m = response.meals[0]['strIngredient' + i];
            let n = response.meals[0]['strMeasure' + i];
            if (m === null) {
                ingredientList = ingredientList.slice(0, ingredientList.length - 2);
                ingredientList += '<br><br>';
                break;
            };
            if (m !== "") ingredientList += m + '/' + n + ', ';
        }
        node.html('<b>Ingredients:</b><br>' + ingredientList + '<br><br><b>Instructions:</b><br>' + response.meals[0].strInstructions +
        '<br><br><a href="' + response.meals[0].strYoutube + '" target="_blank"><b>YouTube video</b></a>'
        + '<br><i class="material-icons save-icons" data-mealid="' + mealID + '">save</i>');
        
        console.log(node);
        console.log(response.drinks[0].strInstructions);
    });

}

$(document).on("click",".save-icons", function() {
    console.log(event.target.dataset.mealid)
    if(!localStorage.getItem("mealid")) {
        //check if there is previous storage
        //create a new array if there is not previous storage
        var arr = [];
        var item = $(this)
        arr.push(event.target.dataset.mealid)
        localStorage.setItem("mealid",JSON.stringify(arr));
    } else {
        //assign the previous storage to arr, and insert the current id to beginning of the array.
        var arr = JSON.parse(localStorage.getItem("mealid"));
        var id = event.target.dataset.mealid;
        if (arr.indexOf(id) > -1) {
            alert("This meal has been saved before");
        } else {
            arr.unshift(event.target.dataset.mealid)
            localStorage.setItem("mealid",JSON.stringify(arr));
        }

    };

});

$("#saved").on("click", populateSavedList); // the submit button will start the search query


function populateSavedList() {
    event.preventDefault();
    $("#results").empty(); // reset the results div
    $("#query").empty();

    var list = JSON.parse(localStorage.getItem("mealid"));
    console.log(list);
    if(!list) {
        let card = $('<div class="col m4 s6"><h5>No saved meals</h5></div>');
        $("#results").append(card);
    } else {
        for(var i=0; i<list.length; i++) {
            $.ajax({
                url: "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + list[i],
                type: "GET"
            }).then(function(response) {
                console.log(response)
                let card = $('<div class="col l4 m6 s12"></div>');
                let body = $('<div class="card">');
                let image = $('<div class="card-image"><img src="' + response.meals[0].strMealThumb + '" class="responsive-img"></div>');
                let title = $('<span class="card-title activator" data-id="' + response.meals[0].idMeal + '">' + response.meals[0].strMeal + '</span>');
                // let content = $('<div class="card-content"></div>');
                let reveal = $('<div class="card-reveal"><span class="card-title grey-text text-darken-4">' + response.meals[0].strMeal + '<i class="material-icons right">close</i></span><p id="card-reveal-' + response.meals[0].idMeal + '"></p></div>');
                // document.on("click",image, populateReveal);
                title.on("click", populateReveal);
        
                image.append(title);
                body.append(image, reveal); // content
                card.append(body);
                $("#results").append(card);
            });
        };
    };

};