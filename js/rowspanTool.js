/**
 * table行合并组件
 * 支持多列、多维、不规则列顺序、指定起始行
 * 注意：如果所有列都要进行合并，则注意存在某些行被全部删除的情况，会出现不是想要的结果
 * @author huzhanyi@gamil.com
 * @date 2018-07-09 16:20
 * @var 1.0
 */
RowspanTool = {
	run:function(config){
		var _this = {};
		var _config = {
			tbody:'tbody',//表jq选择器
			tr:'tr',//行jq选择器
			td:'td',//单元格jq选择器
			startRow:0,//起始行(0则自动获取) 起始值:1
			endRow:0,//结束行(0则自动获取) 起始值:1
			columnNumArr:[]//需要合并的列索引组，按设置的顺序生成对应维度,可以4,2,3,1不规则的顺序 起始值:1
		}
		_config = $.extend(_config,config);
		//
		var $tbody = $(_config.tbody);
		var $rows = $tbody.find(_config.tr);
		//合并
		var _span = function(offset,limit,rowNum){
			//先遍历，得出相同值行索引
			var _map = {};
			var _curMainIndex = 0;
			var _curValue = null;
			for(var i=offset;i<(offset + limit);i++){
				var $td = $rows.eq(i).find(_config.td).eq(rowNum);
				var val = $td.html();
				if(val !== _curValue){
					_curMainIndex =i;
					_curValue = val;
					_map[_curMainIndex] = {};
				}
				_map[_curMainIndex][i] = 1;
			}
			//合并列表
			$.each(_map,function(mainIndex,arr){
				$.each(arr,function(rowIndex,obj){
					var $td = $rows.eq(rowIndex).find(_config.td).eq(rowNum);
					//添加标价标记
					if(mainIndex == rowIndex){
						var jp = new JsonParser(_map[mainIndex]);
						$td.attr("_rs",jp.getLength());
					}else{
						$td.attr("_rs",'remove');
					}
				});
			});
			//
			return _map;
		};
		//迭代方法
		var _iteration = function(os,lm,columnNumArrIndex){
			os = parseInt(os);
			lm = parseInt(lm);
			columnNumArrIndex = parseInt(columnNumArrIndex);
			if(typeof(_config.columnNumArr[columnNumArrIndex]) == 'undefined')
				return ;
			var m = _span(os,lm,_config.columnNumArr[columnNumArrIndex]-1);
			$.each(m,function(i,m2){
				var jp = new JsonParser(m2);
				_iteration(jp.getFirstKey(),jp.getLastKey()-jp.getFirstKey()+1,columnNumArrIndex+1);
			})
		}
		//执行
		var _offest = _config.startRow ? _config.startRow - 1 : 0;
		var _limit = _config.endRow ? (_config.endRow - _offest) : $rows.length;
		_iteration(_offest,_limit,0);
		$.each($rows.find(_config.td).filter("[_rs]"),function(i,n){
			var _rs = $(n).attr("_rs");
			if(_rs == 'remove'){
				$(n).remove();
			}else{
				$(n).attr("rowspan",_rs);
			}
		});
	}
}