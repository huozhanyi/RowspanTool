/**
 * json解析器
 * 主要把json对象模拟成数组对象，可获取长度，头尾键、头尾值
 * @author huzhanyi@gamil.com
 * @date 2018-07-09 16:20
 * @var 1.0
 * 后续可实现next、current等数组对象方法
 */
var JsonParser = function(obj){
	var _this = this;
	var _length=0;
	var _firstKey = null;
	var _firstValue = null;
	var _lastKey = null;
	var _lastValue = null;
	//init
	var _init = function(){
		$.each(obj,function(i,n){
			if(!_length){
				_firstKey = i;
				_firstValue = n;
			}
			_lastKey = i;
			_lastValue = n;
			_length++;
		});
	};
	_init();
	//
	_this.getLength = function(){
		return _length;
	};
	_this.getFirstKey = function(){
		return _firstKey;
	}
	_this.getFirstValue = function(){
		return _firstValue;
	}
	_this.getLastKey = function(){
		return _lastKey;
	}
	_this.getLastValue = function(){
		return _lastValue;
	}
}