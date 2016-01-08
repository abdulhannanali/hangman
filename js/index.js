(function () {

  var words = {
    "animals": [
      "Barb",
      "Bandicoot",
      "Tiger",
      "Caterpillar",
      "Badger"
    ],
    "countries": [
      "India",
      "Zimbabwe",
      "Russia",
      "Puerto Rico",
      "Chile"
    ],
    "apps": [
      "snapchat",
      "facebook",
      "blinq",
      "whatsapp",
      "telegram",
      "airbnb"
    ],
    "people": [
      "Mother Teresa",
      "Pitbull",
      "Justin Bieber",
      "Selena Gomez",
      "Taylor Swift"
    ]
  }


  // starts the game according to the category
  function startGame(category) {
    if (!category) {
      throw new Error("Category not given")
    }
    var maxLives = 5
    var categoryWords = words[category]
    var wordToFind = categoryWords[Math.floor(Math.random() * categoryWords.length)]
  }

  // initializing the plugins here
  $(document).ready(function () {

    var wordsProps = Object.getOwnPropertyNames(words)
    wordsProps.forEach(function (value) {
      $("#selectBox").append($("<option value='" + value + "'>" + value + "</option>"))
    })

    $("select").material_select()
    $("#startButton").on("click", function (el) {
      startGame($("#selectBox").val())
    })
  })

})()
