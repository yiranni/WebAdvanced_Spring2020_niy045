

// fetchData()
// $.ajax({
//     url: "https://data.cityofnewyork.us/resource/buk3-3qpr.json",
//     type: "GET",
//     data: {
//       "$limit" : 5000,
//       "$$app_token" : "ywjdiw9kJXaTv85lSVH57QJE3"
//     }
// }).done(function(data) {
//     fs.writeFileSync("")

// });

fetch('https://data.cityofnewyork.us/resource/buk3-3qpr.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });