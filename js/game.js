var _size = 3;
var _w_h = 420;
var _step = _w_h/_size;


//Game
function Game(id){
    this.element = document.getElementById(id);
    this.button_html = '<canvas id="gameCanvas">Игровое поле</canvas>' +
        '<form>' +
        '<button id="restart">Restart</button>' +
        '</form>';
    this.element.innerHTML = this.button_html;

    this.canvas = new Canvas('gameCanvas');

    this.btn_restart = document.getElementById('restart');

    this.matrix = [];
    this.gen_matrix();

    this.btn_restart.onclick = function(){
        this.gen_matrix();
        this.canvas.clear_canvas(this.matrix);
    }.bind(this);

    this.canvas.canvas.onclick = function(e){
        console.log('Canvas pressed');
        var relativeX = (e.pageX - this.canvas.canvas.offsetLeft);
        var relativeY = (e.pageY - this.canvas.canvas.offsetTop);
        var i = relativeX/_step | 0;
        var j = relativeY/_step | 0;
        this.canvas.fillRect(j, i);
        this.matrix[i][j] = 1;
        console.log(this.matrix);
        this.opponent_move();
        console.log(this.matrix);
        var str;
        if (str = this.check_end()){
            alert(str);
            this.gen_matrix();
        }
    }.bind(this);
}
Game.prototype.gen_matrix = function(){
    for (var i = 0; i<_size; i++) {
        this.matrix[i] = [];
        for (var j = 0; j < _size; j++) {
            this.matrix[i][j] = 0;
        }
    }
};
Game.prototype.opponent_move = function () {
    var i = Math.random()*_size | 0;
    var j = Math.random()*_size | 0;
    if(!this.matrix[i][j]){
        this.matrix[i][j] = 2;
        this.canvas.fillRect(j, i, 'blue');
    } else {
        this.opponent_move();
    }
};
Game.prototype.check_end = function(){
    var m = this.matrix;
    if (m[0][1] == 1 && m[0][2] == 1 && m[0][0] == 1) return 'Победа';
    if (m[1][0] == 1 && m[1][1] == 1 && m[1][2] == 1) return 'Победа';
    if (m[2][0] == 1 && m[2][1] == 1 && m[2][2] == 1) return 'Победа';
    if (m[0][0] == 1 && m[1][0] == 1 && m[2][0] == 1) return 'Победа';
    if (m[0][1] == 1 && m[1][1] == 1 && m[2][1] == 1) return 'Победа';
    if (m[0][2] == 1 && m[1][2] == 1 && m[2][2] == 1) return 'Победа';
    if (m[0][0] == 1 && m[1][1] == 1 && m[2][2] == 1) return 'Победа';
    if (m[0][2] == 1 && m[1][1] == 1 && m[2][0] == 1) return 'Победа';
    if (m[0][1] == 2 && m[0][2] == 2 && m[0][0] == 2) return 'Проигрыш';
    if (m[1][0] == 2 && m[1][1] == 2 && m[1][2] == 2) return 'Проигрыш';
    if (m[2][0] == 2 && m[2][1] == 2 && m[2][2] == 2) return 'Проигрыш';
    if (m[0][0] == 2 && m[1][0] == 2 && m[2][0] == 2) return 'Проигрыш';
    if (m[0][1] == 2 && m[1][1] == 2 && m[2][1] == 2) return 'Проигрыш';
    if (m[0][2] == 2 && m[1][2] == 2 && m[2][2] == 2) return 'Проигрыш';
    if (m[0][0] == 2 && m[1][1] == 2 && m[2][2] == 2) return 'Проигрыш';
    if (m[0][2] == 2 && m[1][1] == 2 && m[2][0] == 2) return 'Проигрыш';
    if (m[0][0] && m[0][1] && m[0][2] && m[1][0] && m[1][1] && m[1][2] && m[2][0] && m[2][1] && m[2][2]) return 'Ничья';
};
//Canvas
function Canvas(id){
    this.canvas = document.getElementById(id);
    this.canvas.width = _w_h;
    this.canvas.height = _w_h;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = 'red';
    this.ctx.strokeStyle = 'gray';
    for (var i = 0; i < _w_h+2; i += _step) {
        this.ctx.moveTo(i, 0);
        this.ctx.lineTo(i, _w_h);
        this.ctx.stroke();
    }
    for (var i = 0; i < _w_h+2; i += _step) {
        this.ctx.moveTo(0, i);
        this.ctx.lineTo(_w_h, i);
        this.ctx.stroke();
    }

}
Canvas.prototype.clear_canvas = function(matrix){
    for (var i = 0; i<_size; i++) {
        for (var j = 0; j < _size; j++) {
            if (matrix[j][i]){
                this.fillRect(j, i, 'white');
            }
        }
    }
};
Canvas.prototype.fillRect = function(i,j, color, w, h){
    color = color || 'red';
    w = w||(_step-2);
    h = h||(_step-2);
    this.ctx.fillStyle = color;
    this.ctx.fillRect(j*_step+1, i*_step+1, w, h);
};
Canvas.prototype.strokeRect = function(i,j){
    this.ctx.strokeStyle = 'gray';
    this.ctx.strokeRect(j*_step, i*_step, _step, _step);
};