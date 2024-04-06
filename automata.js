class Automata {

    constructor(game) {
        Object.assign(this, { game })
        
        this.height = 151
        this.width = 201

        this.tickCount = 0
        this.ticks = 0
        this.speed = parseInt(document.getElementById("speed").value, 10)

        this.running = false

        this.population = []
        for (let i = 0; i < this.width; i++) {
            this.population.push([])
            for (let j = 0; j < this.height; j++) {
                this.population[i][j] = 0
            }
        }

        this.initializeButtons();
        this.random();
    }

    initializeButtons() {
        document.getElementById("start").onclick = e => {this.setRunning(true)}
        document.getElementById("pause").onclick = e => {this.setRunning(false)}
        document.getElementById("random").onclick = e => {this.random()}
        document.getElementById("clear").onclick = e => {this.clear()}
        document.getElementById("columns").onclick = e => {this.alternatingColumns()}
        document.getElementById("checkerboard").onclick = e => {this.checkerboard()}
        document.getElementById("afterburner").onclick = e => {this.afterburner()}
    }

    setRunning(state) {
        console.log("test")
        this.running = state
    }

    reset() {
        this.running = false
        this.tickCount = 0
        this.ticks = 0
        document.getElementById('ticks').innerHTML = "Ticks: " + this.ticks
    }

    clear() {
        this.reset()
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.population[i][j] = 0
            }
        }
    }

    random() {
        this.clear()
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.population[i][j] = randomInt(2)
            }
        }
    }

    alternatingColumns() {
        this.clear()
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width - 1; j++) {
                this.population[i][j] = j % 2 == 0 && j != 0
            }
        }
    }

    checkerboard() {
        this.clear()
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (i % 2 == 0) {
                    this.population[i][j] = j % 2 == 1
                } else {
                    this.population[i][j] = j % 2 == 0
                }
            }
        }
    }

    afterburner() {
        this.clear();
        let initialCondition = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]

        for (let i = 0; i < this.height / 2; i++) {
            for (let j = 0; j < i - 1; j++) {
                if (j > i - 31) this.population[i - 1][j] = i % 2 == 0 || j == i - 2
            }
        }

        for (let i = this.height; i > this.height / 2; i--) {
            if (i % 2 == 1) this.population[i - 1][this.height - i] = 1;
            for (let j = 0; j < this.height - i; j++) {
                if (j > this.height - i - 32) this.population[i - 1][j] = i % 2 == 0
            }
        }

        this.insertShape(initialCondition, 68, 64);
    }

    insertShape(shape, x, y) {
        for (let i = y; i < y + shape.length; i++) {
            for (let j = x; j < x + shape[0].length; j++) {
                this.population[i][j] = shape[i - y][j - x]
            }
        }
    }

    countNeighbors(row, col) {
        let result = 0

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i || j) && this.population[row + i]) {
                    if (this.population[row + i][col + j]) result++
                }
            }
        }
        return result
    }

    update() {
        this.speed = parseInt(document.getElementById("speed").value, 10);
        
        if (this.running && this.tickCount++ >= this.speed) {
            this.tickCount = 0
            this.ticks++
            document.getElementById('ticks').innerHTML = "Ticks: " + this.ticks

            let nextGen = []
            for (let j = 0; j < this.width; j++) {
                nextGen.push([])
            }

            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    let cell = this.population[i][j]
                    let neighbors = this.countNeighbors(i, j)
                    if (cell) {
                        nextGen[i][j] = (neighbors == 2 || neighbors == 3) ? 1 : 0
                    } else {
                        nextGen[i][j] = neighbors == 3 ? 1 : 0
                    }
                }
            }

            this.population = nextGen
        }
    }

    draw(ctx) {
        const SIZE = 6
        const GAP = 1

        ctx.fillStyle = "Black"
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.population[i][j]) ctx.fillRect((SIZE + GAP) * j + 1, (SIZE + GAP) * i + 1, SIZE, SIZE)
            }
        }
    }
}