$(document).ready(function() {
  $("#search").click(function() {
    var searchValue = document.getElementById("search-input").value
    console.log(searchValue)
    document.getElementById("search-input").value = ""
    return false
  });

  $("#get-city").click(function() {
    var city = '<p class="city">' + getCity() + '</p>'
    var searchBtn = document.getElementById("city-form")
    searchBtn.insertAdjacentHTML('afterend', city)
    return false
  });
});
