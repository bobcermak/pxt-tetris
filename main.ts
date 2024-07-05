type Piece = {
    x: number,
    y: number
}



type Row = Array<boolean>
type Display = Array<Row>


const dData: Display = [

    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],

]

const dot: Piece = {
    x: 2,
    y: 0,
}

function refresh(display: Display, dot: Piece): void {  //zhasnout celý display  //rozsvítit na zakladě dat v display
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {

            if (display[y][x]) {
                led.plot(x, y)

            }

            


            else {
                led.unplot(x, y)
            }

        }
    }


    led.plot(dot.x, dot.y)



}


pins.touchSetMode(TouchTarget.P0, TouchTargetMode.Capacitive)




let running: boolean = true
let gameOver: boolean = false
let prepinani: boolean = false


let count: number = 0
let funcCount: number = 500





basic.forever(function () {

    basic.pause(funcCount)


    if (running) {

        if (!gameOver) {
            dot.y += 1
        }

        if (dData[dot.y][dot.x]) {
            if (dot.y <= 1) {
                gameOver = true
            }
        }

        if (dot.y === 4) {
            dData[4][dot.x] = true
            dot.y = 0
            dot.x = 2
        }


        if (dData[dot.y + 1][dot.x]) {
            dData[dot.y][dot.x] = true
            dot.y = 0
            dot.x = 2
            basic.pause(50)
        }





        if (dData[dot.y][0] && dData[dot.y][1] && dData[dot.y][2] && dData[dot.y][3] && dData[dot.y][4] || dData[4][0] && dData[4][1] && dData[4][2] && dData[4][3] && dData[4][4]) {

            dData.pop()
            dData.unshift([false, false, false, false, false])
            count += 1
            funcCount -= 100


        }



        if (gameOver) {   //Aby se G O! neopakovalo pořád dokola a šlo poté pouze přeskakovat přes p0/p1
            running = false
            for (let a = 0; a < 3; a++) {
                basic.showLeds(`
                # . . . #
                . # . # .
                . . # . .
                . # . # .
                # . . . #
                `)

                basic.pause(1000)

                basic.showLeds(`
                . . . . .
                . # . # .
                . . # . .
                . # . # .
                . . . . .
                `)
            }
            
            prepinani = true

        }


        refresh(dData, dot)

    }

})



input.onButtonPressed(Button.A, function () {
    dot.x -= 1
    if (dot.x < 0) {
        dot.x = 0
    }

    if (dot.y < -1) {
        dData[dot.y][dot.x] = true
    }



})

input.onButtonPressed(Button.B, function () {
    dot.x += 1
    if (dot.x > 4) {
        dot.x = 4
    }

})


input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    control.reset()
})

input.onPinPressed(TouchPin.P0, function () {
    if (prepinani) {
        basic.showNumber(count)
    }

})

            
