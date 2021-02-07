const totalWidth = 700
const totalHeight = 400
const playerSize = 20
const pointSize = 10
const initialSpeed = 5

class Snake { 
    game
    speed
    ctx
    player
    activePoint
    direction
    
    constructor() {
        
    }

    start(){
        let c = document.getElementById("canvas");
        this.ctx = c.getContext("2d");
        this.ctx.clearRect(0,0,totalWidth,totalHeight)
        this.player = []
        this.speed = initialSpeed
        this.direction = { x: this.speed, y: 0, type: 'l' }
        this.addBodyToPlayer(totalWidth / 2,totalHeight / 2)
        this.setActivePoint();
        document.addEventListener('keydown', this.changeDirection.bind(this));
        this.game = setInterval(() => {
            this.move();
        }, 50)
        
    }
		
    gameOver(){
        
        let restartGame = confirm('Has perdido, ¿Quieres volver a intentarlo?');
        if(restartGame) 
            this.start()
        else
            this.ctx.clearRect(0, 0, totalWidth, totalHeight)
    }
    
    addBodyToPlayer(x,y){
        let body = {x: x, y: y, w: playerSize , h: playerSize}
        this.player.push(body);
        this.drawPoint(body.x,body.y,body.w,body.h);
    }
    
    setActivePoint(){
        if(this.activePoint) this.ctx.clearRect(this.activePoint.x, this.activePoint.y, this.activePoint.w, this.activePoint.h)
        this.activePoint = {x: Math.floor(Math.random() * (totalWidth - 10)), y: Math.floor(Math.random() * (totalHeight - 10)), w: pointSize, h: pointSize}
        this.drawPoint(this.activePoint.x, this.activePoint.y, this.activePoint.w, this.activePoint.h, "#FF0000")
    }
    
    move(){
        for(let point of [...this.player.slice(5, this.player.length)]){
            if(this.checkCollision(this.player[0], point)){
                clearInterval(this.game)
                this.gameOver()
            }
        }
        if(this.checkCollision(this.player[0], this.activePoint)) 
            this.pointEaten()
        else 
            this.drawPoint(this.activePoint.x, this.activePoint.y, this.activePoint.w, this.activePoint.h, "#FF0000")
        let lastPoint
        for(let point of this.player){
            this.ctx.clearRect(point.x,point.y,playerSize,playerSize)
        
            if(!lastPoint){
                lastPoint = {...point}
                
                point.x += this.direction.x
                point.y += this.direction.y
                
            }else{
                let currentPoint = {...point}
                
                point.x = lastPoint.x 
                point.y = lastPoint.y 
                lastPoint = {...currentPoint}		
            }
            
            this.drawPoint(point.x, point.y,playerSize, playerSize)
        
            if(point.x >= totalWidth + playerSize) point.x = -playerSize
            if(point.y > totalHeight + playerSize) point.y = -playerSize
            if(point.x < -playerSize) point.x = totalWidth + playerSize
            if(point.y < -playerSize) point.y = totalHeight + playerSize
            
        }
    }
    
    checkCollision(targetA, targetB){
    
        let rightA, bottomA, rightB, bottomB
        
        rightA = targetA.x + targetA.w
        
        bottomA = targetA.y + targetA.h
        
        rightB = targetB.x + targetB.w
        
        bottomB = targetB.y + targetB.h
        
        return !(targetA.x > rightB || targetB.x > rightA  || targetA.y > bottomB || targetB.y > bottomA);
    }
    
    pointEaten(){
        this.setActivePoint()
        let lastBodyPlayer = this.player[this.player.length - 1] 
        switch(this.direction.type){
            case "l":
                this.addBodyToPlayer(lastBodyPlayer.x + playerSize + this.direction.x, lastBodyPlayer.y)
            break
            case "r":
                this.addBodyToPlayer(lastBodyPlayer.x - playerSize + this.direction.x, lastBodyPlayer.y)
            break
            case "t":
                this.addBodyToPlayer(lastBodyPlayer.x,lastBodyPlayer.y + playerSize + this.direction.y)
            break
            case "b":
                this.addBodyToPlayer(lastBodyPlayer.x,lastBodyPlayer.y - playerSize + this.direction.y)
            break
        }
        if(this.speed < playerSize)
            this.speed += 1
    }
    
    drawPoint(x=200, y=200, width = 20, height = 20, color="#000000" ){
        this.ctx.fillStyle = color
        this.ctx.fillRect(x, y,width,height)
    }
    
    changeDirection(event){
        switch(event.keyCode){
            case 38:
                if(this.player.length == 1 || this.direction.type != 'b')
                    this.direction = {x: 0, y : -this.speed, type: 't'}
            break
            case 39:
                if(this.player.length == 1 || this.direction.type != 'l')
                    this.direction = {x: this.speed, y : 0, type: 'r'}
            break
            case 40:
                if(this.player.length == 1 || this.direction.type != 't')
                    this.direction = {x: 0, y : this.speed, type: 'b'}
            break
            case 37:
                if(this.player.length == 1 || this.direction.type != 'r')
                    this.direction = {x: -this.speed, y : 0, type: 'l'}
            break
        }
        

    }

}