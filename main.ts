
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


let check4: boolean = true
let check5: boolean = false
let check6: boolean = false


let count: number = 0
let funcCount:number = 0





basic.forever(function () {
    basic.pause(500 - funcCount)
    
    
    if (check4) {
        dot.y += 1


        if (dot.y === 4) {
            dData[4][dot.x] = true
            dot.y = 0
            dot.x = 2
        }


        if (dData[dot.y + 1][dot.x] && dot.y <= 3) {
            dData[dot.y][dot.x] = true
            dot.y = 0
            dot.x = 2
            basic.pause(50)
            if (dData[1][dot.x] && dData[2][dot.x]) {
                dData.unshift([dData[0][dot.x]])
                
                if ([dData[0][dot.x]]) {
                    check5 = true
                }
            }
            
        }

        


        if (dData[dot.y][0] && dData[dot.y][1] && dData[dot.y][2] && dData[dot.y][3] && dData[dot.y][4] || dData[4][0] && dData[4][1] && dData[4][2] && dData[4][3] && dData[4][4]) {
            
            dData.pop()
            dData.unshift([false, false, false, false, false])
            count += 1
            funcCount += 100 

            
        }



        if (check5) {   //Aby se G O! neopakovalo pořád dokola a šlo poté pouze přeskakovat přes p0/p1
            basic.showString("G O!")
            check6 = true
            check4 = false

        }


        refresh(dData, dot)

    }

})



input.onButtonPressed(Button.A, function () {
    dot.x -= 1
    dot.y -= 1
    if (dot.x < 0) {
        dot.x = 0
    }



})

input.onButtonPressed(Button.B, function () {
    dot.x += 1
    dot.y -= 1
    if (dot.x > 4) {
        dot.x = 4
    }

})


input.onLogoEvent(TouchButtonEvent.Pressed, function() {
    control.reset()
})


input.onPinPressed(TouchPin.P0, function() {
    if (check6) {
        basic.showString("G O!")
    }
})


input.onPinPressed(TouchPin.P1, function() {
    if (check6) {
        basic.showString("Počet => " + count)
    }
    
})















