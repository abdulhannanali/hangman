(function () {

  var words = {
    "animals": [
      "Barb",
      "Bandicoot",
      "Tiger",
      "Caterpillar",
      "Badger"
    ],
    "internet slangs": [
      "LMAO",
      "ROFL",
      "WWWY",
      "SHIZZLE",
      "OKAY",
      "IIGHT",
      "FOOTY"
    ],
    "countries": [
      "India",
      "Zimbabwe",
      "Russia",
      "Puerto Rico",
      "Chile",
      "China",
      "United Arab Emirates",
      "Afghanistan",
      "Uruguay",
      "Estonia",
      "Luxembourg"
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

  // listens to keyboard for any keypress
  function listenKeyboardLetters(cb) {
    // listening forr keys all over the document for now
    var element = $(document)
    return element.on("keypress", function (event) {
      var key =   String.fromCharCode(event.charCode)
      if (key.search(/[a-zA-Z]/) != -1) {
        cb(key)
      }
    })
  }


  // unlistens the keyboard for the keypresses
  function unListenKeyboard(element) {
    if (!element) {
      var element = $(document)
    }
    element.off("keypress")
  }


  // starts the game according to the category
  function startGame(category) {
    $(".categoryscene").hide()
    $(".lives").show()
    $(".playscene").show()

    // displays the remaining lives in the DOM
    function displayLives(numLives) {
      var lives = $("#livesHearts")
      lives.empty()
      var lifeElement = "<i class='material-icons'>favorite</i>"
      for (var i = 0; i < numLives; i++) {
        lives.append($(lifeElement))
      }
    }
    var lastLetter = ""

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
      if (key.search(/[aeiou]/ig) != -1) {
        showErrorMessage("You entered a vowel!")
        return;
      }
      if (key == lastLetter) {
        showErrorMessage("You can't enter the same key again")
        return;
      }
      lastLetter = key
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
      puzzleEnd(true)
    }

    // in case of losing the game
    function gameOver() {
      puzzleEnd(false)
    }

    function puzzleEnd(win) {
      $(".categoryscene").hide()
      $(".playscene").hide()
      unListenKeyboard()

      var finalMessage = $("#finalMessage")

      var image;
      var images = {
        gameOverImages: [
          "gameover1.gif",
          "gameover2.gif"
        ],
        youWinImages: [
          "youwin.gif"
        ]
      }

      if (win) {
        image = images.youWinImages[Math.floor(Math.random() * images.youWinImages.length)]
        finalMessage.attr("class", "green-text hangStyle")
        finalMessage.html("You Won! Now go to <a href='https://fossasia.org'>FOSSASIA.org</a>")
      } else {
        finalMessage.attr("class", "red-text hangStyle")
        finalMessage.html("Did you really go to school?")
        image = images.gameOverImages[Math.floor(Math.random() * images.gameOverImages.length)]
      }

      $("#finalImage").attr("src", "assets/"+image)
      $(".finalscene").show()
    }

    function displayWord (wordArray) {
      $("#wordplay").text(wordArray.join(""))
    }

  }

  function silentWord(word) {
    return word.replace(/[bcdfghjklmnpqrstvwxyz]/ig, "_")
  }


  // initializing the plugins here
  $(document).ready(function () {
    // $(".lives").hide()
    handleSoundControl()
    resetGame()
    var wordsProps = Object.getOwnPropertyNames(words)
    wordsProps.forEach(function (value) {
      $("#selectBox").append($("<option value='" + value + "'>" + value + "</option>"))
    })

    $("select").material_select()
    $("#startButton").on("click", function (el) {
      startGame($("#selectBox").val())
    })

    $("#tryagainbutton").click(function (el) {
      resetGame()
    })

    $("#resetcontrol").click(function (el) {
      resetGame()
    })
  })


  function resetGame () {
    $(".lives").hide()
    $(".errorscene").hide()
    $(".playscene").hide()
    // $(".error")
    $(".finalscene").hide()
    unListenKeyboard()
    $(".categoryscene").show()
  }

  function showErrorMessage(message) {
    var errorMessage = $("#errormessage")
    var errorScene = $(".errorscene")
    var errorTimeout = 2000
    errorMessage.text(message)
    errorScene.show()
    setTimeout(function () {
      if (errorMessage.text() == message) {
        errorScene.hide()
      } 
    }, errorTimeout)
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
