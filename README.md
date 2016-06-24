# hangman
This hangman game was created within 12 hours using three main web technologies HTML, CSS and JavaScript (ES5).

You can view a live demo of this game at https://abdulhannanali.github.io/hangman


### Tools and frameworks
The libraries and frameworks and other tools which made this project possible are:
- [Materialize](http://materializecss.com/)
- [JQuery](jquery.com)
- [Animate.CSS](https://github.com/daneden/animate.css) used for animations
- [Google Fonts](https://www.google.com/fonts)
- [UglifyJS2](https://github.com/mishoo/UglifyJS2)
- [Giphy](https://giphy.com)
- [Atom.io](https://atom.io)

### Running locally on your computer
In order to run it locally, simple fork this repo and clone this copy
After forking this repo, you can clone it using a command like this:
```bash
git clone https://github.com/**your username here**/hangman
```

### My development process for this game
This is a game made by the manipulation of DOM which is mainly done using JQuery. It's the first game I have ever developed in the JavaScript world, and it was damn really awesome to work on it. Below is a brief summary of my development process.

I have made different scenes using HTML as in DOM for the transitioning through various stages of the game. The three main scenes a user has to through in order to play game are:
- Category selection scene
- Playing scene
- Final scene

#### Category selection scene

##### Selection and words data
The selection and words data has been hard coded at the very top of the index.html, and it's visible there. It's done because I actually didn't bother to make an XHR.

The class for the category scene is `.categoryscene`. Before, the **categoryscene** is made visible to the user, the `<select>` is populated with category options. It's done using the forEach iteration. The code snippet for it will be:
```js
var wordsProps = Object.getOwnPropertyNames(words)
wordsProps.forEach(function (value) {
  $("#selectBox").append($("<option value='" + value + "'>" + value + "</option>"))
})
```
Also, this includes all the initializing of other view elements too.

#### Play scene
In this scene a random key word is given to the user from the category he selected, The main function that contains most of the logic for this function is `startGame(category)`. This is where computer is handling everything such as initialization of lives, number of lives, listening for the keyboard input etc.

After the game has end, we are also unlistening or unbinding any `keypress` events associated with keyboard, in order to keep doubling from happen.

#### Final scene
This is the final scene of the game here we congratulate user on winning and curse him on losing. It's fairly straightforward, it's maintained under class `.finalscene` in HTML and message and image is manipulated using JavaScript in [index.js](js/index.js)


### Purpose of doing it
This is done as task in [Google CodeIn](https://codein.withgoogle.com) with FOSSASIA organization. You can visit FOSSASIA [here](https://fossasia.org). FOSSASIA is an open source organization which is playing a major role in promoting open source development and culture in ASIA and all over the world. FOSSASIA has a goal of solving the major problems humanity is facing using Open Source.

### Contributions
If you find any issue or want to add a feature, feel free to make a PR and raise an issue. It will be really awesome. :smile: :smile: :smile:

#### LICENSE
The code is licensed under MIT LICENSE. See [LICENSE](LICENSE)
