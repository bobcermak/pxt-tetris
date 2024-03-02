
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



let check5: boolean = false
let check6: boolean = false
let down: boolean = false
let count: number = 0

loops.everyInterval(500, function () {
    dot.y += 1
    if (dot.y === 4) {
        dData[4][dot.x] = true
        dot.y = 0
    }


    if (dData[0][dot.x]) {
        check5 = true

    }
    
    if (dData[dot.y + 1][dot.x] && dot.y <= 3) {
        dData[dot.y][dot.x] = true

    }


    if (dData[dot.y][0] && dData[dot.y][1] && dData[dot.y][2] && dData[dot.y][3] && dData[dot.y][4]) {

        dData[dot.y][0] = false
        dData[dot.y][1] = false
        dData[dot.y][2] = false
        dData[dot.y][3] = false
        dData[dot.y][4] = false

        down = true
        count += 100

    }

    if (dData[0][dot.x]) {
        check5 = true
    }

    


    if (check5 && !check6) {
        basic.showString("GAME OVER!")
        basic.pause(500)
        basic.showString("Získal jste " + count + " bodů")
        check6 = true
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


input.onLogoEvent(TouchButtonEvent.Pressed, function() {
    control.reset()
})





