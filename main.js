

var imageFromPath = function (path) {
    var img = new Image();
    //img.onload = function () {
    //    Context.drawImage(img, x, y);
    //}
    img.src = path;

    return img
}
var Paddle = function () {
    var image = imageFromPath('paddle.png')
    var o = {
        image: image,
        x: 100,
        y: 100,
        speed: 3,
    }
    o.moveLeft = function () {
        o.x -= o.speed
    }
    o.moveRight = function () {
        o.x += o.speed

    }
    return o

}
var GuaGame = function () {
    var g = {
        actions: {},
        keydowns: {},
    }
    var canvas = document.getElementById('id-canvas');
    var context = canvas.getContext('2d');
    g.canvas = canvas
    g.context = context
    g.drawImage = function (guaImage) {
        g.context.drawImage(guaImage.image, guaImage.x, guaImage.y);

    }
    window.addEventListener('keydown', function (event) {
        g.keydowns[event.key] = true;
    })
    window.addEventListener('keyup', function (event) {
        g.keydowns[event.key] = false;
    })
    g.registerAction = function (key, callback) {
        g.actions[key] = callback

    }

    setInterval(function () {
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                //如果按键被按下，调用注册的action
                g.actions[key]()
            }
        }
        //update
        g.update()
        //clear
        context.clearRect(0, 0, canvas.width, canvas.height)

        //draw
        g.draw()
    }, 1000 / 30)
    return g
}
var __main = function () {
    var game = GuaGame()
    //paddle等于这个函数的返回值 
    var paddle = Paddle()
    //注册事件
    game.registerAction('a', function () {
        paddle.moveLeft()
    })
    game.registerAction('d', function () {
        paddle.moveRight()
    })

    var leftDown = false
    var rightDown = false

    //event
    window.addEventListener('keydown', function (event) {
        //    console.log(event)
        var k = event.key
        if (k == 'a') {
            leftDown = true
        } else if (k == 'd') {
            rightDown = true
        }
    })
    window.addEventListener('keyup', function (event) {
        //    console.log(event)
        var k = event.key
        if (k == 'a') {
            leftDown = false
        } else if (k == 'd') {
            rightDown = false
        }
    })
    game.update = function () {
        //update x and y


    }
    game.draw = function () {
        //draw
        game.drawImage(paddle)

    }
    setInterval(function () {

    }, 1000 / 30)
}

__main()