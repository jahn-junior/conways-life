class Automata {

    constructor(game) {
        Object.assign(this, { game })
        
        this.height = 150
        this.width = 200

        this.population = []
        for (let i = 0; i < this.width; i++) {
            this.population.push([])
            for (let j = 0; j < this.height; j++) {
                this.population[i][j] = 0
            }
        }

        this.generateRandom();
    }

    generateRandom() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.population[i][j] = randomInt(2);
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