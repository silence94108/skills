# 复用函数库(ExtendScript)

搭建设计稿前先读这份。所有函数都在 `photoshop_execute_script` 里用。每次 `execute_script` 是独立作用域,函数需在同一次调用里定义。

## 通用头(每个 script 开头)

```javascript
var doc = app.activeDocument;
var cTID=function(s){return charIDToTypeID(s);};
var sTID=function(s){return stringIDToTypeID(s);};
```

## solidShape — 矢量圆角矩形色块(替代"直接图层色块")

真矢量形状图层(`SOLIDFILL`),可无损缩放,圆角干净。用户要求"用矩形工具而非直接图层"时用这个。

```javascript
function solidShape(name,x,y,w,h,color,radius){
  var d=new ActionDescriptor();var ref=new ActionReference();
  ref.putClass(sTID("contentLayer"));d.putReference(cTID("null"),ref);
  var dc=new ActionDescriptor();var dColor=new ActionDescriptor();var dRGB=new ActionDescriptor();
  dRGB.putDouble(cTID("Rd  "),color[0]);dRGB.putDouble(cTID("Grn "),color[1]);dRGB.putDouble(cTID("Bl  "),color[2]);
  dColor.putObject(cTID("Clr "),cTID("RGBC"),dRGB);dc.putObject(cTID("Type"),sTID("solidColorLayer"),dColor);
  var s=new ActionDescriptor();
  s.putUnitDouble(cTID("Top "),cTID("#Pxl"),y);s.putUnitDouble(cTID("Left"),cTID("#Pxl"),x);
  s.putUnitDouble(cTID("Btom"),cTID("#Pxl"),y+h);s.putUnitDouble(cTID("Rght"),cTID("#Pxl"),x+w);
  if(radius&&radius>0){
    s.putUnitDouble(sTID("topLeft"),cTID("#Pxl"),radius);s.putUnitDouble(sTID("topRight"),cTID("#Pxl"),radius);
    s.putUnitDouble(sTID("bottomLeft"),cTID("#Pxl"),radius);s.putUnitDouble(sTID("bottomRight"),cTID("#Pxl"),radius);
    dc.putObject(cTID("Shp "),sTID("rectangle"),s);
  }else{dc.putObject(cTID("Shp "),cTID("Rctn"),s);}
  d.putObject(cTID("Usng"),sTID("contentLayer"),dc);
  executeAction(cTID("Mk  "),d,DialogModes.NO);
  doc.activeLayer.name=name;return doc.activeLayer;
}
```

## nativeGradient — 原生渐变(唯一可靠的渐变方案)

先建像素层 + 选区,再调用。零色带、不超时。

```javascript
// 用法:
// var g=doc.artLayers.add();g.name="bg-hero";
// doc.selection.select([[0,0],[1920,0],[1920,880],[0,880]]);
// nativeGradient(0,0,1920,880,[37,99,235],[124,58,237]); doc.selection.deselect();
function nativeGradient(x1,y1,x2,y2,c1,c2){
  var d=new ActionDescriptor();
  var dF=new ActionDescriptor();dF.putUnitDouble(cTID("Hrzn"),cTID("#Pxl"),x1);dF.putUnitDouble(cTID("Vrtc"),cTID("#Pxl"),y1);d.putObject(cTID("From"),cTID("Pnt "),dF);
  var dT=new ActionDescriptor();dT.putUnitDouble(cTID("Hrzn"),cTID("#Pxl"),x2);dT.putUnitDouble(cTID("Vrtc"),cTID("#Pxl"),y2);d.putObject(cTID("T   "),cTID("Pnt "),dT);
  d.putEnumerated(cTID("Type"),cTID("GrdT"),cTID("Lnr "));
  var dG=new ActionDescriptor();dG.putEnumerated(cTID("GrdF"),cTID("GrdF"),cTID("CstS"));dG.putDouble(cTID("Intr"),4096);
  var cl=new ActionList();
  function stop(col,loc){var ds=new ActionDescriptor();var r=new ActionDescriptor();r.putDouble(cTID("Rd  "),col[0]);r.putDouble(cTID("Grn "),col[1]);r.putDouble(cTID("Bl  "),col[2]);ds.putObject(cTID("Clr "),cTID("RGBC"),r);ds.putEnumerated(cTID("Type"),cTID("Clry"),cTID("UsrS"));ds.putInteger(cTID("Lctn"),loc);ds.putInteger(cTID("Mdpn"),50);cl.putObject(cTID("Clrt"),ds);}
  stop(c1,0);stop(c2,4096);dG.putList(cTID("Clrs"),cl);
  var tl=new ActionList();function ts(loc){var t=new ActionDescriptor();t.putUnitDouble(cTID("Opct"),cTID("#Prc"),100);t.putInteger(cTID("Lctn"),loc);t.putInteger(cTID("Mdpn"),50);tl.putObject(cTID("TrnS"),t);}
  ts(0);ts(4096);dG.putList(cTID("Trns"),tl);
  d.putObject(cTID("Grad"),cTID("Grdn"),dG);
  executeAction(cTID("Grdn"),d,DialogModes.NO);
}
```

## txt — 文字图层

```javascript
function txt(name,content,x,y,size,col,font,center,op){
  var L=doc.artLayers.add();L.kind=LayerKind.TEXT;L.name=name;
  var t=L.textItem;t.font=font||"MicrosoftYaHei";t.size=size;
  var c=new SolidColor();c.rgb.red=col[0];c.rgb.green=col[1];c.rgb.blue=col[2];t.color=c;
  if(center)t.justification=Justification.CENTER;
  t.position=[x,y];t.contents=content;
  if(op!==undefined)L.opacity=op;return L;
}
```

## iconCentered — 精确居中图标(解决图标偏左上)

关键:画完读 `bounds` 算宽高,再 translate 到中心。`(cx,cy)` 是目标中心点。

```javascript
function iconCentered(name,code,cx,cy,size,col){
  var L=doc.artLayers.add();L.kind=LayerKind.TEXT;L.name=name;
  var t=L.textItem;t.font="SegoeMDL2Assets";t.size=size;  // 图标字号 ≥24 防空框
  var c=new SolidColor();c.rgb.red=col[0];c.rgb.green=col[1];c.rgb.blue=col[2];t.color=c;
  t.position=[cx,cy];t.contents=String.fromCharCode(code);
  var b=L.bounds;
  var w=b[2].value-b[0].value, h=b[3].value-b[1].value;
  L.translate(cx-w/2-b[0].value, cy-h/2-b[1].value);
  return L;
}
```

## 图层排序(防遮挡)

```javascript
// 背景色块建完沉到某层下方
bg.move(doc.layers.getByName("参照层名"), ElementPlacement.PLACEAFTER);
```

## 局部裁切预览(检查细节 / 图标探针)

比整页 preview 更清晰,用于验证小元素。导出后用 Read 工具看。

```javascript
function exportCrop(box,path){  // box=[left,top,right,bottom]
  var dup=doc.duplicate("c",true);
  dup.crop(box);dup.flatten();
  var f=new File(path);var o=new JPEGSaveOptions();o.quality=11;
  dup.saveAs(f,o,true);dup.close(SaveOptions.DONOTSAVECHANGES);
}
```

## 批量清理探针/临时图层(按名字前缀)

```javascript
for(var i=doc.artLayers.length-1;i>=0;i--){
  if(doc.artLayers[i].name.indexOf("probe")===0){doc.artLayers[i].remove();}
}
```

## 图标探针模板(验证码位是否有效)

放画布**空白安全区**(避开会被遮挡的位置),大字号(44px),配码位标签,导出后肉眼确认。

```javascript
var codes=[0xE9E9,0xF22C,0xF158,0xE9D5]; // 待验证候选
var x0=250,y0=200;
for(var i=0;i<codes.length;i++){
  var L=doc.artLayers.add();L.kind=LayerKind.TEXT;L.name="probe-"+i;
  var t=L.textItem;t.font="SegoeMDL2Assets";t.size=44;
  var c=new SolidColor();c.rgb.red=255;c.rgb.green=255;c.rgb.blue=255;t.color=c;
  t.position=[x0+(i%6)*180, y0];t.contents=String.fromCharCode(codes[i]);
  var Lb=doc.artLayers.add();Lb.kind=LayerKind.TEXT;Lb.name="probelbl-"+i;
  var tb=Lb.textItem;tb.font="MicrosoftYaHei";tb.size=12;
  var cb=new SolidColor();cb.rgb.red=255;cb.rgb.green=255;cb.rgb.blue=255;tb.color=cb;
  tb.position=[x0+(i%6)*180, y0+30];tb.contents=codes[i].toString(16);
}
```
