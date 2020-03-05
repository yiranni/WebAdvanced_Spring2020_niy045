
$.ajax({
    url: "https://data.cityofnewyork.us/resource/buk3-3qpr.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "ywjdiw9kJXaTv85lSVH57QJE3"
    }
}).done(function(data) {
   
   console.log(data)
});


$('.wrapper').find('a[href="#"]').on('click', function (e) {
    e.preventDefault();
    this.expand = !this.expand;
    $(this).text(this.expand ? "Click to collapse" : "Click to read more");
    $(this).closest('.wrapper').find('.small, .big').toggleClass('small big');
});

window.addEventListener('DOMContentLoaded', function () {
    loadData("/data.json");
});

function loadData(data) {
    $.getJSON(data, (data) => {
        generateTable(data)
    })
}
generateTable = (data) => {
    let source = $("#tbl-template").html();
    let template = Handlebars.compile(source);
    let result = template(data)
    let list = $(".list")
    list.append(result)

}

// loadData()



// var data = {
//     "data": [
//         {   
//             "district": "Bronx",
//             "name": "227th Street Playground",
//             "location": "Bronx Boulevard between East 226 and East 228 streets",
//             "open": true,
//             "accessibility": true
//         },
//         {
//             "district": "Brooklyn",
//             "name": "100% Playground",
//             "location": "Glenwood Road, East 100 & East 101 streets",
//             "open": true,
//             "accessibility": false
//         },
//         {
//             "district": "Manhattan",
//             "name": "119th Street Tennis Courts",
//             "location": "119th Street on the middle level",
//             "open": true,
//             "accessibility": false
//         }
//     ]
// }