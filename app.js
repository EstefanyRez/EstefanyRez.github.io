$(document).ready(function () {
    const primaryNav = $('section')
    const toggleButton = $('.header__button')
    const darkModeImg = $('#dark-mode-img')
    const gameImg = $('.game')
    const gameContainer = $('.noughts-and-crosses--container')
    const gameClose = $('.noughts-and-crosses--container--close')
    const aboutImg = $('.about')
    const aboutContainer = $('.about--container')
    const aboutClose = $('.about--container--close')
    const contactMeForm = $('.contact-form--bg')
    const contactMeClose = $('.contact-form--close')
    const contactMeImg = $('.contact-me')
    const formSubmit = $('.form-submit')
    const projectsTitle = $('.projects')
    const projectsContainer = $('.projects-container')
    const projectsClose = $('.projects-container--close')
    const mainContainer = $('.main--container')
    var audioElement = document.createElement('audio');
    const earphones = $('.earphones')
    const marker = $('.marker')
    const laptop = $('.laptop')
    const name = $('#name')
    const email = $('#email')
    const message = $('#message')
    const localStorageMode = localStorage.getItem('modeColor')

    init()
    clickSvgToggle()
    setPostit('pink', 'calculator', 'pinky')
    setPostit('blue', 'book-list', 'bluish')
    setPostit('orange', 'colour-flipper', 'orangy')
    setPostit('green', 'cart', 'greeny')
    
    mainContainerPictureClick('marker')
    mainContainerPictureClick('earphones')
    mainContainerPictureClick('laptop')

    titleVisibilitySections(aboutImg, aboutContainer, projectsContainer, gameContainer, contactMeForm)
    titleVisibilitySections(projectsTitle, projectsContainer, aboutContainer, gameContainer, contactMeForm)
    titleVisibilitySections(gameImg, gameContainer, projectsContainer, aboutContainer, contactMeForm)
    titleVisibilitySections(contactMeImg, contactMeForm, aboutContainer, projectsContainer, gameContainer)

    closeContainerButton(gameClose, gameContainer)
    closeContainerButton(aboutClose, aboutContainer)
    closeContainerButton(contactMeClose, contactMeForm)
    closeContainerButton(projectsClose, projectsContainer)

    localStprageScheme(localStorageMode)
    if (localStorageMode === null){
        localStprageScheme('light')
    }

    formSubmit.click(function() {
        sendEmail()
    })

    toggleButton.click(function() {  
        const visibility = primaryNav.attr('data-visible')

        if (visibility === 'false') {
            visibilityStatus(primaryNav, true)
        } else {
            visibilityStatus(primaryNav, false)
        }
    });

    darkModeImg.click(function() {  
        if ($('body').attr('data-mode') === 'light') {
            localStprageScheme('dark')
        } else {
            localStprageScheme('light')
        }
    })

    earphones.click(function() {
        earphonesTrackPlayer()    
    })

    marker.click(function() {
        markerSoundPlayer()
    })

    laptop.click(function() {
        laptopSoundPlayer()
    })

    function mainContainerVisibility(mainNode) {
        if (mainNode.attr('data-visible') === 'true') {
            visibilityStatus(mainContainer, false)
        } else if ($('.main-trigger').attr('data-visible') === 'false' || mainNode.attr('data-visible') === 'false'){
            visibilityStatus(mainContainer, true)
        }
    }

    function titleVisibilitySections(title, mainNode, hiddenNode1, hiddenNode2, hiddenNode3) {
        title.click(function() {
            const visibility = mainNode.attr('data-visible')
            if (visibility === 'false') {
                visibilityStatus(mainNode, true)
                visibilityStatus(hiddenNode1, false)
                visibilityStatus(hiddenNode2, false)
                visibilityStatus(hiddenNode3, false)
                visibilityStatus(primaryNav, false)
            } else {
                visibilityStatus(mainNode, false)
            }
            mainContainerVisibility(mainNode)
        })
    }

    function closeContainerButton(closeButton, container) {
        closeButton.click(function() {
            visibilityStatus(container, false)
            visibilityStatus(mainContainer, true)
        })
    }

    function init() {
        const preloader = $('#preloader')
        const container = $('.container')
        setTimeout(() =>{
            container.css('display', 'block')
            setTimeout(() => {
                preloader.css('opacity', '0')
                preloader.css('display', 'none')
                container.css('opacity', '1')
            }, 50)
        }, 8700)  
    }

    function sendEmail() {
        Email.send({
            SecureToken : "ff7bdf34-9c24-463f-a50e-74945b2ffaa6",
            To : 'estefanym.perezt@gmail.com',
            From : email.val(),
            Subject : "Contact from Estefany Rez",
            Body : message.val()
        }).then(
        message => formSubmitActions()
        );
    }

    function formSubmitActions() {
        const form = $('.contact-form__fields')
        var popupMessage = $('<div>', {'class': 'contact-form__fields--popup-message'})
        var text = $("<p>I'll hit you back as soon as posible!</p>")
        popupMessage.append(text)
        form.append(popupMessage)

        name.val('')
        email.val('')
        message.val('')

        setTimeout(() =>{
            popupMessage.remove()
        }, 3000)
    }

    function localStprageScheme(mode) {  
        $('body').attr('data-mode', mode)
        darkModeImg.attr('src', 'assets/dark-mode-' + '.png')
        colorScheme(mode)

        localStorage.setItem('modeColor', mode)
    }

    function colorScheme(mode) {
        setFile('logo', mode)
        setFile('home', mode)        
        setFile('about', mode)
        setFile('projects', mode)
        setFile('dark-mode', mode)
        setFile('game', mode)
        setFile('contact-me', mode)
        setFile('say-hello', mode)
        setFile('noughts-and-crosses', mode)
        setFile('hello', mode)

        $('.css-scheme').attr('href', 'stylesheets/' + mode + '.css')
    }

    function setFile(file, mode) {
        return $('.' + file).attr('src', 'assets/' + file + '-' + mode + '.png')
    }

    function visibilityStatus(visibleNode, status) {
        visibleNode.attr('data-visible', status)
    }

    function clickSvgToggle() {
    $(document).click(function() {
        $('body').css({
            'cursor': 'url(assets/clicked.svg), auto'
        })
    
        
        setTimeout(() =>{
            $('body').css({
                'cursor': 'url(assets/unclicked.svg), auto'
            })
        }, 150)
    })
    }

   function setPostit(color, title, icons) {
       $('.' + color).css('background-image', 'url(assets/postit-' + color + '-unfolded.png)');
       $('.' + color).css('background-repeat', 'no-repeat')
       $('.' + color).css('background-size', 'cover')

       hoverPostit(color, title, icons)
       leavePostit(color, title, icons)
   }

   function hoverPostit(color, title, icons) {
        $('.' + color).mouseover(function() {
            $('.' + color).css('background-image', 'url(assets/postit-' + color + '-folded.png)');
            $('.' + title).css('visibility', 'hidden')
            $('.' + icons).css('visibility', 'visible')
        })
    }    

   function leavePostit(color, title, icons) {
        $('.' + color).mouseleave(function() {
            $('.' + color).css('background-image', 'url(assets/postit-' + color + '-unfolded.png)');
            $('.' + title).css('visibility', 'visible')
            $('.' + icons).css('visibility', 'hidden')
        })
    }

   function mainContainerPictureClick(picture) {  
       $('.' + picture).click(function() {
           if ($('.' + picture).attr('data-visible') === 'false') {
               visibilityStatus($('.' + picture), true)
           } else {
               visibilityStatus($('.' + picture), false)
           }

           mainContainerPictureAction(picture)
       })
    }

   function mainContainerPictureAction(picture) {
        if ($('.' + picture).attr('data-visible') === 'true') {
            $('.' + picture).attr('src', 'assets/' + picture + '-clicked.png')
        } else {
            $('.' + picture).attr('src', 'assets/' + picture + '-unclicked.png')
        }
   }

   function earphonesTrackPlayer() {
    if (earphones.attr('data-visible') === 'true') {
        audioElement.setAttribute('src', 'assets/track-' + randomTrack() +'.mp3');
        audioElement.play();
        audioElement.addEventListener('ended', function() {
            this.play();
        }, false);
        } else {
        audioElement.pause()
        }
    }
   
    function randomTrack() {
        return Math.floor(Math.random() * 8) + 1
    }

    function markerSoundPlayer() {
        if (marker.attr('data-visible') === 'true') {
            audioElement.setAttribute('src', 'assets/marker-sound.mp3');
            audioElement.play();
            audioElement.addEventListener('ended', function() {
                this.play();
            }, false);
        } else {
            audioElement.pause()
        }
    }

    function laptopSoundPlayer() {
        if (laptop.attr('data-visible') === 'true') {
            audioElement.setAttribute('src', 'assets/laptop-sound.mp3');
            audioElement.play();
            audioElement.addEventListener('ended', function() {
                this.play();
            }, false);
        } else {
            audioElement.pause()
        }
    }

    var origBoard;
    const hPlayer = 'O'
    const aiPlayer = 'X'
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    const cells = $('.cell')

    $('.endgame--replay').click(function() {  
        startGame()
    })

    startGame()

    // Functions
    function startGame() {
        $('.endgame').css('visibility', 'hidden')

        origBoard = Array.from(Array(9).keys())

        for (var i = 0; i < cells.length; i++) {

            cells[i].innerText = null
            cells[i].style.removeProperty('background-color')

            cells[i].addEventListener('click', turnClick, false)
        }
    }

    function turnClick(square) {
        if (typeof origBoard[square.target.id] == 'number') {
            turn(square.target.id, hPlayer)
            if (!checkTie()) turn(bestSpot(), aiPlayer)
        }
    }

    function turn (squareId, player) {
        origBoard[squareId] = player
        document.getElementById(squareId).innerText = player

        let gameWon = checkWin(origBoard, player)
            if (gameWon) gameOver(gameWon)
                
    }

   
    function checkWin(board, player) {
        let plays = board.reduce((accumulator, element, index) => 
            (element === player) ? accumulator.concat(index) : accumulator, []);

        let gameWon = null
        for (let [index, win] of winCombos.entries()) {
            if (win.every(element => plays.indexOf(element) > -1)) {
                gameWon = {index: index, player: player}
                    break;
            }
        }
        return gameWon
    }

    function gameOver(gameWon) {
        for (let index of winCombos[gameWon.index]) {
            document.getElementById(index).style.backgroundColor = gameWon.player == hPlayer ? 'blue' : 'red'
        }

        for (var i = 0; i < cells.length; i++) {
            cells[i].removeEventListener('click', turnClick, false)
        }
        declareWinner(gameWon.player == hPlayer ? 'assets/you-win-light.png' : 'assets/you-lose-light.png')
    }
    
    function checkTie() {
        if (emptySquares().length == 0) {
            for (var i = 0; i < cells.length; i++) {
                cells[i].style.backgroundColor = 'green'
                cells[i].removeEventListener('click', turnClick, false)
            }
            declareWinner('assets/its-a-tie-light.png')
            return true
        }
        return false
    }

    function bestSpot() {
        return minimax(origBoard, aiPlayer).index
    }

    function emptySquares() {
        return origBoard.filter(s => typeof s == 'number')
    }

    function declareWinner(who) {
        $('.endgame').css('visibility', 'visible')
        $('.endgame--result').attr('src', who)
    }

    function minimax(newBoard, player) {
        var availSpots = emptySquares()

        if (checkWin(newBoard, hPlayer)) {
            return {score: -10}
        } else if (checkWin(newBoard, aiPlayer)) {
            return {score: 10}
        } else if (availSpots.length === 0) {
            return {score: 0}
        }
        var moves = []
        for (var i = 0; i < availSpots.length; i++) {
            var move = {}
            move.index = newBoard[availSpots[i]]
            newBoard[availSpots[i]] = player
            
            if (player === aiPlayer) {
                var result = minimax(newBoard, hPlayer)
                move.score = result.score
            } else {
                var result = minimax(newBoard, aiPlayer)
                move.score = result.score
            }

            newBoard[availSpots[i]] = move.index

            moves.push(move)
        }
        var bestMove
        if (player === aiPlayer) {
            var bestScore = -10000
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score
                    bestMove = i
                }
            }
        } else {
            var bestScore = 10000
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score
                    bestMove = i
                }
            }
        }

        return moves[bestMove]
    }
}); 


 
