(function() {
    function _g(a) {
        if (typeof window.onload != "function") window.onload = a;
        else {
            var b = window.onload;
            window.onload = function() {
                b();
                a();
            }
        }
    }

    function _height() {
        var a = {};
        for (type in {
            Top: "",
            Left: ""
        }) {
            var b = type == "Top" ? "Y" : "X";
            if (typeof window["page" + b + "Offset"] != "undefined") a[type.toLowerCase()] = window["page" + b + "Offset"];
            else {
                b = document.documentElement.clientHeight ? document.documentElement : document.body;
                a[type.toLowerCase()] = b["scroll" + type]
            }
        }
        return a
    }

    function _l() {
        var a = document.body,
            b;
        if (window.innerHeight) b = window.innerHeight;
        else if (a.parentElement.clientHeight) b = a.parentElement.clientHeight;
        else if (a && a.clientHeight) b = a.clientHeight;
        return b
    }

    function _snow(_array){
        this.parent = document.body;
        this._create(this.parent,_array);
        this.size = Math.random()*5 + 5;
        $(this.el).css({
            width: Math.round(this.size) + 'px',
            height: Math.round(this.size) + 'px'
        });
        this.maxLeft = document.body.offsetWidth - this.size;
        this.maxTop = document.body.offsetHeight - this.size;
        this.left = Math.random()*this.maxLeft;
        this.top = this.parent.offsetTop + 1;
        this.angle = 1.4 + 0.2 * Math.random();
        this.minAngle = 1.4;
        this.maxAngle = 1.6;
        this.angleDelta = 0.01 * Math.random();
        this.speed = 2 + Math.random();
    }

    var _flag = false;

    _g(function(){
        _flag = true;
    });

    var _start = true;

    window.snow = function(_array,_num){
        if(_flag){
            var a = [];
                m = setInterval(function(){
                    _flag && _num > a.length && Math.random() < _num * 0.0025 && a.push(new _snow(_array));
                    !_flag && !a.length && clearInterval(m);
                    for(var e = _height().top, n = _l(), s_num = a.length - 1;s_num >= 0;s_num--){
                        if(a[s_num]){
                            if(a[s_num].top < e || a[s_num].top + a[s_num].size + 5 > e + n ){
                                a[s_num]._remove();
                                a[s_num] = null;
                                a.splice(s_num,1);
                            } else {
                                a[s_num]._move();
                                a[s_num]._draw();
                            }
                        }
                    }
                },40);
        }else _g(function(){
            snow(_array,_num);
        })
    };
    window.removeSnow = function(){
        _start = false;
    }

     _snow.prototype = {
        _create: function(_arrry,_num){
            this.el = document.createElement('img');
            $(this.el).attr('src', _num+'snow'+Math.floor(Math.random()*4)+'.gif');
            $(this.el).addClass('snow');
            $(this.parent).append(this.el);
        },

        _draw: function(){
            $(this.el).css({
                top: Math.round(this.top) + 'px',
                left: Math.round(this.left) + 'px'
            });
        },

        _move: function(){
            if (this.angle < this.minAngle || this.angle > this.maxAngle) this.angleDelta = -this.angleDelta;
            this.angle += this.angleDelta;
            this.left += this.speed * Math.cos(this.angle * Math.PI);
            this.top -= this.speed * Math.sin(this.angle * Math.PI);
            if (this.left < 0) this.left = this.maxLeft;
            else if (this.left > this.maxLeft) this.left = 0
        },

        _remove: function() {
            this.parent.removeChild(this.el);
            this.parent = this.el = null
        }
    }
})();