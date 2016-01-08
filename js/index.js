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
    // displays the remaining lives in the DOM
    function displayLives(numLives) {
      var lives = $("#livesHearts")
      lives.empty()
      var lifeElement = "<i class='material-icons'>favorite</i>"
      for (var i = 0; i < numLives; i++) {
        lives.append($(lifeElement))
      }
    }

    $(".categoryscene").hide()
    if (!category) {
      throw new Error("Category not given")
    }
    var numLives = 5
    displayLives(numLives)
    var categoryWords = words[category]
    var wordToFind = categoryWords[Math.floor(Math.random() * categoryWords.length)]
    var splitWord = wordToFind.split("")
    var silentSplitWord = silentWord(wordToFind).split("")
    displayWord(silentSplitWord)
    listenKeyboardLetters(function (key) {
      var found = false
      silentSplitWord.forEach(function (value, index) {
        // means not currently filled
        if (value == "_") {
          if (splitWord[index] == key) {
            silentSplitWord[index] = splitWord[index]
            found = true
          }
        }
      })
      displayWord(silentSplitWord)

      if (silentSplitWord.join("").search(/_/) == -1) {
        gameWin()
      }
      else if (!found) {
        reduceLife()
      }
    })

    function reduceLife () {
      numLives -= 1
      displayLives(numLives)
      if (numLives == 0) {
        gameOver()
      }
    }

    // in case if the game is won
    function gameWin() {
    }

    // in case of losing the game
    function gameOver() {
      alert("Game over for now!")
    }

    function displayWord (wordArray) {
      $("#wordplay").text(wordArray.join(""))
    }

  }

  function silentWord(word) {
    return word.replace(/[aeiou]/g, "_")
  }

  // listens to keyboard for any keypress
  function listenKeyboardLetters(cb) {
    // listening forr keys all over the document for now
    var element = $(document)
    element.on("keypress", function (event) {
      var key =   String.fromCharCode(event.charCode)
      if (key.search(/[a-zA-Z]/) != -1) {
        cb(key)
      }
    })
  }


  // unlistens the keyboard for the keypresses
  function unListenKeyboard(element) {

  }

  function voWels(word) {
    return word.split("").map(function (letter) {
      if (letter.match(/[aeiou]/i)) {
        word.split("_")
      }
      else {
        return
      }
    })
  }

  // initializing the plugins here
  $(document).ready(function () {
    // $(".lives").hide()
    handleSoundControl()
    var wordsProps = Object.getOwnPropertyNames(words)
    wordsProps.forEach(function (value) {
      $("#selectBox").append($("<option value='" + value + "'>" + value + "</option>"))
    })

    $("select").material_select()
    $("#startButton").on("click", function (el) {
      startGame($("#selectBox").val())
    })
  })


  function resetGame () {
    $(".lives").hide()
    $(".select-category").show()

  }


  // handles the events related to the sound control
  function handleSoundControl() {
    var musicControl = $("#musiccontrol").get(0)
    var soundDisplay = $("#sounddisplay")

    soundDisplay.on("click", function () {
      musicControl.muted = !musicControl.muted
      if (musicControl.muted) {
        soundDisplay.addClass("red-text")
        soundDisplay.text("volume_off")
      }
      else {
        soundDisplay.removeClass("red-text")
        soundDisplay.text("volume_up")
      }
    })
  }

})()
