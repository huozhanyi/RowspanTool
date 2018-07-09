# RowspanTool
js实现table行合并组件  支持多列、多维、不规则列顺序、指定起始行

默认配置

tbody:'tbody',//表jq选择器

tr:'tr',//行jq选择器

td:'td',//单元格jq选择器

startRow:0,//起始行(0则自动获取) 起始值:1

endRow:0,//结束行(0则自动获取) 起始值:1

columnNumArr:[]//需要合并的列索引组，按设置的顺序生成对应维度,可以4,2,3,1不规则的顺序 起始值:1


使用实例

//对第3,4列分别进行合并

RowspanTool.run({

  tbody:'#tb-1 tbody',
  
  columnNumArr:[3,4]
  
});
