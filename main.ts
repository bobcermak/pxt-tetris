
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



let check: boolean = false
let check2: boolean = false
let check3: boolean = false
let check4: boolean = false
let check5: boolean = false




loops.everyInterval(500, function () {
    dot.y += 1
    if (dot.y >= 5) {
        dot.y = 0
    }

    if (dot.y === 4) {
        dData[4][dot.x] = true
        check = true
        check2 = true

    }

    if (dot.y === 3 && check && check2) {
        dData[3][dot.x] = true
        led.plot(dot.x, dot.y)
        basic.pause(500)
        dData[3][dot.x] = false
        dData[4][dot.x] = true
    }

    


    if (check5) {
        basic.showString("GAME OVER!")
        basic.pause(500)
        control.reset()
    }







    refresh(dData, dot)

})


input.onButtonPressed(Button.A, function () {
    dot.x -= 1
    if (dot.x < 0) {
        dot.x = 0
    }



})

input.onButtonPressed(Button.B, function () {
    dot.x += 1
    if (dot.x > 4) {
        dot.x = 4
    }

})







