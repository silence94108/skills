# 建站通2.0 服务端 HTTP 接口（业务型：支付/票务/人力资源）

来源：官方 showdoc 文档原文归档（抓取于 2026-07）。做电商、票务、人才/租房类站点才需要；普通企业官网用不到，不必读。

## 目录

1. [微信扫码支付](#微信扫码支付)（支付相关）
2. [订单支付状态查询](#订单支付状态查询)（支付相关）
3. [创建订单（新）](#创建订单（新）)（支付相关）
4. [订单列表](#订单列表)（支付相关）
5. [订单完成](#订单完成)（支付相关）
6. [微信小程序支付](#微信小程序支付)（支付相关）
7. [支付宝扫码支付](#支付宝扫码支付)（支付相关）
8. [微信退款](#微信退款)（支付相关）
9. [支付宝退款](#支付宝退款)（支付相关）
10. [票务列表](#票务列表)（票务管理）
11. [日票务详情列表](#日票务详情列表)（票务管理）
12. [票务订单列表](#票务订单列表)（票务管理）
13. [创建票务订单](#创建票务订单)（票务管理）
14. [日票务类型列表](#日票务类型列表)（票务管理）
15. [票务列表(按日期搜索)](#票务列表(按日期搜索))（票务管理）
16. [票务详情](#票务详情)（票务管理）
17. [票务类型列表（按日期筛选）](#票务类型列表（按日期筛选）)（票务管理）
18. [票务分类列表](#票务分类列表)（票务管理）
19. [修改票务订单](#修改票务订单)（票务管理）
20. [职位列表](#职位列表)（人力资源/职位）
21. [职位发布/编辑](#职位发布/编辑)（人力资源/职位）
22. [人才列表](#人才列表)（人力资源/人才）
23. [人才简历发布/编辑](#人才简历发布/编辑)（人力资源/人才）
24. [区域列表](#区域列表)（人力资源/地域）
25. [分类列表](#分类列表)（人力资源/分类）
26. [房列表](#房列表)（人力资源/租房）
27. [租房发布/编辑](#租房发布/编辑)（人力资源/租房）

---

## 微信扫码支付

> 分组：支付相关

##### 简要描述

- 微信扫码支付接口

##### 请求URL
- `https://jzt2.china9.cn/api/pay/wxpay`
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string | 站点id    |
|type |是  |string | 支付类型（"wx-scancode"）    |
|order_sn |是  |string | 订单编号（创建订单接口返回）    |
|order_desc |是  |string | 订单介绍（例如：'开通会员'、'购买商品'）    |
|tick |否  |int | 票务支付必传此值  固定值为1    |

##### 请求示例
```
$.post("https://jzt2.china9.cn/api/pay/wxpay", {
	site_id: '5c38ed055aafe70b47c01bb85fec06fa',
	type: 'wx-scancode',
	order_sn: '5c38ed055aafe70b47c01bb85fec06fa',
	money: 0.01,
	order_desc: '开通会员'
}, function (res) {
	if (res.code === 200) {
		// 获取成功  通过订单支付状态查询接口查询是否支付成功
	} else {
		// 获取失败
	}
})
```
##### 返回参数说明

|参数名|类型|说明|
|:----    |:---|:-----   |
|code | number | 状态码（成功：200）    |
|data | string | 微信支付二维码    |
|msg | string | 提示信息    |
##### 返回示例 

``` 
  {
    "code": 200,
	"data": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcwAAAHMAQMAAABiFQrFAAAABlBMVEX..",
    "msg": "操作成功"
  }
```

---

## 订单支付状态查询

> 分组：支付相关

##### 简要描述

- 订单支付状态查询接口

##### 请求URL
- `https://jzt2.china9.cn/api/SiteOrder/selInfo`
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|user_id |是  |string | 会员id    |
|site_id |是  |string | 站点id    |
|order_sn |是  |string | 订单编号（需要查询的订单编号）    |

##### 请求示例
```
$.post("https://jzt2.china9.cn/api/pay/wxpay", {
	user_id: '6352679462e52a19f57c2d06',  // 会员id
	site_id: '6352679462e52a19f57c2d06',  // 站点id
	order_sn: '5c38ed055aafe70b47c01bb85fec06fa',  // 需要查询的订单编号
}, function (res) {
	if (res.code === 200) {
		// 查询成功
		if(res.data.status == 1) {
			// 已支付
		}
	} else {
		// 获取失败
	}
})
```
##### 返回参数说明

|参数名|类型|说明|
|:----    |:---|:-----   |
|code | number | 状态码（成功：200）    |
|data.site_id | string | 站点id    |
|data.order_sn | string | 订单编号    |
|data.status | number | 支付状态（1：已支付；0：未支付）    |
|data.id | string | 订单id （主键id）  |
|msg | string | 提示信息    |
##### 返回示例 

``` 
  {
    "code": 200,
	"data":  {
		"site_id": "6352679462e52a19f57c2d06",
		"order_sn": "5c38ed055aafe70b47c01bb85fec06fa",
		"status": 0,
		"id": "64128413ef15a54bb234abe0"
	},
    "msg": "操作成功"
  }
```

---

## 创建订单（新）

> 分组：支付相关

##### 简要描述

- 创建订单接口

##### 请求URL
- `https://jzt2.china9.cn/api/SiteOrder/addOrder`
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|user_id |是  |string | 会员id    |
|site_id |是  |string | 站点id    |
|product_id |是  |string | 商品id    |
|buy_num |是  |int | 购买数量    |
|take_status |否  |int | 收货状态   传1  开启收货信息验证    |
|take_username |否  |string | 收货人姓名    |
|take_phone |否  |string | 收货人手机号    |
|take_address |否  |string | 收货地址    |
|可自定义信息  |否  |    |  其他   |

##### 请求示例
```
$.post("https://jzt2.china9.cn/api/SiteOrder/addOrder", {
	site_id: '6352679462e52a19f57c2d06',  // 站点id
	product_id: '6352679462e52a19f57c2d06',  // 商品id
	buy_num: 2  // 购买数量
}, function (res) {
	if (res.code === 200) {
		// 创建订单成功
	} else {
		// 创建订单失败
	}
})
```
##### 返回参数说明

|参数名|类型|说明|
|:----    |:---|:-----   |
|code | number | 状态码（成功：200）    |
|data.site_id | string | 站点id    |
|data.order_sn | string | 订单编号    |
|data.status | number | 支付状态    |
|msg | string | 提示信息    |
##### 返回示例 

``` 
  {
    "code": 200,
	"data": {
		"site_id": "6352679462e52a19f57c2d06",
		"order_sn": "8218de431cc0309526889ff3e398ea59",
		"status": 0
	},
    "msg": "操作成功"
  }
```

---

## 订单列表

> 分组：支付相关

##### 简要描述

- 订单支付列表查询接口

##### 请求URL
- `https://jzt2.china9.cn/api/SiteOrder/selMsg`
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string | 站点id    |
|user_id |否  |string | 会员id    |
|status |否  |int | 0待支付 1已支付  2已发货  3已完成    |

##### 请求示例
```
$.post("https://jzt2.china9.cn/api/SiteOrder/selMsg", {
	site_id: '6352679462e52a19f57c2d06',  // 站点id
	order_sn: '5c38ed055aafe70b47c01bb85fec06fa',  // 需要查询的订单编号
}, function (res) {
	if (res.code === 200) {
		// 查询成功
		if(res.data.status == 1) {
			// 已支付
		}
	} else {
		// 获取失败
	}
})
```
##### 返回参数说明

|参数名|类型|说明|
|:----    |:---|:-----   |
|code | number | 状态码（成功：200）    |
|data.site_id | string | 站点id    |
|data.order_sn | string | 订单编号    |
|data.status | number | 支付状态（1：已支付；0：未支付）    |
|data.id | string | 订单id （主键id）  |
|data.buy_num | int | 购买数量  |
|data.take_username | string | 收货人姓名  |
|data.take_phone | string | 收货人手机号  |
|data.take_address | string | 收货地址  |
|msg | string | 提示信息    |
##### 返回示例 


 ``` 
 {
  "code": 200,
  "msg": "查询成功",
  "data": {
    "total": 1,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1,
    "data": [
      {
        "site_id": "6358f79e50ea651811158850",
        "product_id": "6465f7105f6eb129332eab37",
        "buy_num": "1",
        "take_status": "1",
        "take_username": "qiao",
        "take_phone": "16634288298",
        "take_address": "太原",
        "order_sn": "017604c9df4bdb1a455ce5c89cb814a3",
        "status": 0,
        "product_title": "1111",
        "product_img": "",
        "product_price": "12",
        "product_stock": "100",
        "money": "12.00",
        "id": "6466f3042e37cf434207d995"
      }
    ]
  }
} 

 ```

---

## 订单完成

> 分组：支付相关

##### 简要描述

- 订单完成接口

##### 请求URL
- `https://jzt2.china9.cn/api/SiteOrder/orderFinish`
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|user_id |是  |string | 会员id    |
|site_id |是  |string | 站点id    |
|order_sn |是  |string | 订单编号   |

##### 请求示例
```
$.post("https://jzt2.china9.cn/api/SiteOrder/orderFinish", {
	user_id: '6352679462e52a19f57c2d06',  // 会员id
	site_id: '6352679462e52a19f57c2d06',  // 站点id
	order_sn: '5c38ed055aafe70b47c01bb85fec06fa',  // 订单编号
}, function (res) {
	if (res.code === 200) {
		// 查询成功
		if(res.data.status == 1) {
			// 已支付
		}
	} else {
		// 获取失败
	}
})
```
##### 返回参数说明

|参数名|类型|说明|
|:----    |:---|:-----   |
|code | number | 状态码（成功：200）    |
|msg | string | 提示信息    |
##### 返回示例 

``` 
  {
    "code": 200,
    "msg": "操作成功"
  }
```

---

## 微信小程序支付

> 分组：支付相关

##### 简要描述

- 微信小程序支付接口

##### 请求URL
- `https://jzt2.china9.cn/api/pay/wxpay`
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string | 站点id    |
|type |是  |string | 支付类型（"wx-applet"）    |
|order_sn |是  |string | 订单编号（创建订单接口返回）    |
|order_desc |是  |string | 订单介绍（例如：'开通会员'、'购买商品'）    |
|tick |否  |int | 票务支付必传此值  固定值为1    |
|code |是  |string | 微信code    |

##### 请求示例
```
$.post("https://jzt2.china9.cn/api/pay/wxpay", {
	site_id: '5c38ed055aafe70b47c01bb85fec06fa',
	type: 'wx-scancode',
	order_sn: '5c38ed055aafe70b47c01bb85fec06fa',
	money: 0.01,
	order_desc: '开通会员'
}, function (res) {
	if (res.code === 200) {
		// 获取成功  通过订单支付状态查询接口查询是否支付成功
	} else {
		// 获取失败
	}
})
```
##### 返回参数说明

|参数名|类型|说明|
|:----    |:---|:-----   |
|code | number | 状态码（成功：200）    |
|data | string | 微信支付二维码    |
|msg | string | 提示信息    |
##### 返回示例 

``` 
  {
    "code": 200,
	"data": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcwAAAHMAQMAAABiFQrFAAAABlBMVEX..",
    "msg": "操作成功"
  }
```

---

## 支付宝扫码支付

> 分组：支付相关

##### 简要描述

- 支付宝扫码支付接口

##### 请求URL
- `https://jzt2.china9.cn/api/pay/alipay`
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string | 站点id    |
|type |是  |string | 支付类型（"ali-scancode"）    |
|order_sn |是  |string | 订单编号（创建订单接口返回）    |
|order_desc |是  |string | 订单介绍（例如：'开通会员'、'购买商品'）    |
|tick |否  |int | 票务支付必传此值  固定值为1    |

##### 请求示例
```
$.post("https://jzt2.china9.cn/api/pay/wxpay", {
	site_id: '5c38ed055aafe70b47c01bb85fec06fa',
	type: 'wx-scancode',
	order_sn: '5c38ed055aafe70b47c01bb85fec06fa',
	money: 0.01,
	order_desc: '开通会员'
}, function (res) {
	if (res.code === 200) {
		// 获取成功  通过订单支付状态查询接口查询是否支付成功
	} else {
		// 获取失败
	}
})
```
##### 返回参数说明

|参数名|类型|说明|
|:----    |:---|:-----   |
|code | number | 状态码（成功：200）    |
|data | string | 支付宝支付二维码    |
|msg | string | 提示信息    |
##### 返回示例 

``` 
  {
    "code": 200,
	"data": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcwAAAHMAQMAAABiFQrFAAAABlBMVEX..",
    "msg": "操作成功"
  }
```

---

## 微信退款

> 分组：支付相关

##### 简要描述

- 微信退款接口

##### 配置方式
> - 1、**需要在微信支付管理平台配置回调地址，回调地址为：https://jzt2.china9.cn/api/pay/wxtuikuan**
- 2、**需要在微信支付管理平台配置支付证书，配置完成后将证书文件和证书序列号，企业微信发车永明**

##### 请求URL
- `https://jzt2.china9.cn/api/pay/wxTui`
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string | 站点id    | |
|order_sn |是  |string | 订单号    |

##### 请求示例
```
$.post("https://jzt2.china9.cn/api/pay/wxTui", {
	site_id: '5c38ed055aafe70b47c01bb85fec06fa',
	order_sn: '5c38ed055aafe70b47c01bb85fec06fa',
}, function (res) {
	if (res.code === 200) {
		// 退款成功  
	} else {
		// 获取失败
	}
})
```
##### 返回参数说明

|参数名|类型|说明|
|:----    |:---|:-----   |
|code | number | 状态码（成功：200）    |
|msg | string | 提示信息    |
##### 返回示例 

``` 
  {
    "code": 200,
    "msg": "退款成功"
  }
```

---

## 支付宝退款

> 分组：支付相关

##### 简要描述

- 支付宝退款接口

##### 请求URL
- `https://jzt2.china9.cn/api/pay/aliTui`
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string | 站点id    | |
|order_sn |是  |string | 订单号    |

##### 请求示例
```
$.post("https://jzt2.china9.cn/api/pay/wxTui", {
	site_id: '5c38ed055aafe70b47c01bb85fec06fa',
	order_sn: '5c38ed055aafe70b47c01bb85fec06fa',
}, function (res) {
	if (res.code === 200) {
		// 退款成功  
	} else {
		// 获取失败
	}
})
```
##### 返回参数说明

|参数名|类型|说明|
|:----    |:---|:-----   |
|code | number | 状态码（成功：200）    |
|msg | string | 提示信息    |
##### 返回示例 

``` 
  {
    "code": 200,
    "msg": "退款成功"
  }
```

---

## 票务列表

> 分组：票务管理

##### 简要描述

- 票务列表

##### 请求URL
- ` http://jzt2.china9.cn/api/ticket/lst `
  
##### 请求方式
- GET 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string |站点id   |
|page |是  |int |当前页   |
|limit |否  |int | 每页显示条数 默认10    |
|title     |否  |string | 标题  搜索条件    |
|category_id     |否  |string | 分类id   |
|ticket_type     |否  |int | 票务类型 1总 2日  |
|up_time     |否  |string | 开始时间 例如（2023-08-11 11:11:11）   |
|end_time     |否  |string | 结束时间 例如（2023-08-11 11:11:11）  |

##### 使用示例 

 ``` 
 $.get("http://jzt2.china9.cn/api/ticket/lst", {
 	site_id: "站点id",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```


##### 返回示例 



 ``` 
 {
  "code": 200,
  "msg": "查询成功",
  "data": {
    "total": 2,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1,
    "data": [
      {
        "title": "ces总",
        "ticket_type": 1,
        "money": "12.2",
        "ticket_num": "50",
        "up_time": "2023-08-11 11:00:00",
        "end_time": "2023-08-15 23:59:59",
        "status": "1",
        "site_id": "6358f79e50ea651811158850",
        "create_time": "2023-08-11 11:00:00",
        "update_time": "2023-08-11 11:00:00",
        "id": "64d5a0511d330000ca005332"
      },
      {
        "title": "ces日",
        "ticket_type": 2,
        "money": 20,
        "status": 1,
        "site_id": "6358f79e50ea651811158850",
        "create_time": "2023-08-11 11:00:00",
        "update_time": "2023-08-11 11:00:00",
        "id": "64d5a0741d330000ca005333"
      }
    ]
  }
} 

```

---

## 日票务详情列表

> 分组：票务管理

##### 简要描述

- 日票务详情列表

##### 请求URL
- ` http://jzt2.china9.cn/api/ticket/info `
  
##### 请求方式
- GET 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string |站点id   |
|page |是  |int |当前页   |
|limit |否  |int | 每页显示条数 默认10    |
|ticket_id     |是  |string | 票务id    |
|ticket_type_id     |是  |string | 票务类型id    |
|up_time     |否  |string | 开始时间 例如（2023-08-11 11:11:11）   |
|end_time     |否  |string | 结束时间 例如（2023-08-11 11:11:11）  |

##### 使用示例 

 ``` 
 $.get("http://jzt2.china9.cn/api/ticket/info", {
 	site_id: "站点id",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```


##### 返回示例 



 ``` 
 {
  "code": 200,
  "msg": "查询成功",
  "data": {
    "total": 1,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1,
    "data": [
      {
        "site_id": "6358f79e50ea651811158850",
        "ticket_id": "64d5a0741d330000ca005333",
        "money": "123",
        "ticket_num": "123",
        "up_time": "2023-08-11 11:11:11",
        "end_time": "2023-08-11 11:11:11",
        "datetime": "2023-08-11",
        "create_time": "2023-08-11 14:38:11",
        "id": "64d5d753318613091f35d346"
      }
    ]
  }
} 
```

---

## 票务订单列表

> 分组：票务管理

##### 简要描述

- 票务订单列表

##### 请求URL
- ` http://jzt2.china9.cn/api/ticket/order `
  
##### 请求方式
- GET 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string |站点id   |
|page |是  |int |当前页   |
|limit |否  |int | 每页显示条数 默认10    |
|title     |否  |string | 订单标题或订单号  搜索条件    |
|user_id     |否  |string | 用户id  搜索条件  |
|user_unique     |否  |string | 用户标识  搜索条件  |
|ticket_type     |否  |int | 票务类型 1总 2日 搜索条件 |
|status     |否  |int | 订单状态 1已支付待使用 2待支付 3已使用 搜索条件 |
|up_time     |否  |string | 开始时间（例如 2023-08-11 12:12:12） 搜索条件 |
|end_time     |否  |string | 结束时间（例如 2023-08-11 12:12:12） 搜索条件 |

##### 使用示例 

 ``` 
 $.get("http://jzt2.china9.cn/api/ticket/order", {
 	site_id: "站点id",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```


##### 返回示例 


 ``` 
 {
  "code": 200,
  "msg": "查询成功",
  "data": {
    "total": 1,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1,
    "data": [
      {
        "title": "测试订单",
        "order_sn": "213dfwef1231231",
        "order_type": 1,
        "create_time": "2023-08-14 16:02:27",
        "pay_time": "",
        "status": 2,
        "ticket_id": "64d5a0511d330000ca005332",
        "site_id": "6358f79e50ea651811158850",
        "pay_num": 3,
        "id": "64d9deb19856000073005984",
        "ticket": {
          "title": "ces总",
          "ticket_type": 1,
          "money": "12.2",
          "ticket_num": "50",
          "up_time": "2023-08-11 11:00:00",
          "end_time": "2023-08-15 23:59:59",
          "status": "1",
          "site_id": "6358f79e50ea651811158850",
          "create_time": "2023-08-11 11:00:00",
          "update_time": "2023-08-11 11:00:00",
          "delete_time": 0,
          "id": "64d5a0511d330000ca005332"
        }
      }
    ]
  }
} 

```

---

## 创建票务订单

> 分组：票务管理

##### 简要描述

- 创建票务订单

##### 请求URL
- ` http://jzt2.china9.cn/api/ticket/createOrder `
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string |站点id   |
|ticket_id |是  |string |票务id   |
|pay_num |是  |int |购买数量   |
|user_id 或 user_unique |是  |string |用户标识  两个字段二选一即可  两个都填默认以user_id为主   |
|ticket_info_array   |否  |array |日票务详情数组   |
|ticket_info_array[0]['pay_num']   |否  |array |购买数量   |
|ticket_info_array[0]['ticket_info_id']   |否  |array |详情id   |

##### 使用示例 

 ``` 
 $.post("http://jzt2.china9.cn/api/ticket/createOrder", {
 	site_id: "站点id",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```


##### 返回示例 


``` 
  {
    "code": 200,
    "msg": "创建成功"
  }
```

---

## 日票务类型列表

> 分组：票务管理

##### 简要描述

- 日票务类型列表

##### 请求URL
- ` http://jzt2.china9.cn/api/ticket/typeLst `
  
##### 请求方式
- GET 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string |站点id   |
|ticket_id |是  |string |票务id   |
|title     |否  |string | 标题  搜索条件    |

##### 使用示例 

 ``` 
 $.get("http://jzt2.china9.cn/api/ticket/typeLst", {
 	site_id: "站点id",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```


##### 返回示例 



 ``` 
 {
  "code": 200,
  "msg": "查询成功",
  "data": {
    {
        "title": "ces总",
        "ticket_type": 1,
        "money": "12.2",
        "ticket_num": "50",
        "up_time": "2023-08-11 11:00:00",
        "end_time": "2023-08-15 23:59:59",
        "status": "1",
        "site_id": "6358f79e50ea651811158850",
        "create_time": "2023-08-11 11:00:00",
        "update_time": "2023-08-11 11:00:00",
        "id": "64d5a0511d330000ca005332"
      },
      {
        "title": "ces日",
        "ticket_type": 2,
        "money": 20,
        "status": 1,
        "site_id": "6358f79e50ea651811158850",
        "create_time": "2023-08-11 11:00:00",
        "update_time": "2023-08-11 11:00:00",
        "id": "64d5a0741d330000ca005333"
      }
  }
} 

```

---

## 票务列表(按日期搜索)

> 分组：票务管理

##### 简要描述

- 票务列表(按日期搜索)

##### 请求URL
- ` http://jzt2.china9.cn/api/ticket/lsts `
  
##### 请求方式
- GET 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string |站点id   |
|page |是  |int |当前页   |
|limit |否  |int | 每页显示条数 默认10    |
|category_id     |否  |string | 分类id   |
|date     |是  |string | 日期 例如（2023-08-11）   |

##### 使用示例 

 ``` 
 $.get("http://jzt2.china9.cn/api/ticket/lst", {
 	site_id: "站点id",
	date: "2023-08-11",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```


##### 返回示例 



 ``` 
 {
  "code": 200,
  "msg": "查询成功",
  "data": {
    "total": 2,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1,
    "data": [
      {
        "title": "ces总",
        "ticket_type": 1,
        "money": "12.2",
        "ticket_num": "50",
        "up_time": "2023-08-11 11:00:00",
        "end_time": "2023-08-15 23:59:59",
        "status": "1",
        "site_id": "6358f79e50ea651811158850",
        "create_time": "2023-08-11 11:00:00",
        "update_time": "2023-08-11 11:00:00",
        "id": "64d5a0511d330000ca005332"
      },
      {
        "title": "ces日",
        "ticket_type": 2,
        "money": 20,
        "status": 1,
        "site_id": "6358f79e50ea651811158850",
        "create_time": "2023-08-11 11:00:00",
        "update_time": "2023-08-11 11:00:00",
        "id": "64d5a0741d330000ca005333"
      }
    ]
  }
} 

```

---

## 票务详情

> 分组：票务管理

##### 简要描述

- 票务详情

##### 请求URL
- ` http://jzt2.china9.cn/api/ticket/ticketInfo `
  
##### 请求方式
- GET 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string |站点id   |
|ticket_id |是  |string |票务id   |


##### 使用示例 

 ``` 
 $.get("http://jzt2.china9.cn/api/ticket/ticketInfo", {
 	site_id: "站点id",
	site_id: "票务id",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```


##### 返回示例 



 ``` 
 {
    "code": 200,
    "msg": "查询成功",
    "data": {
        "category_id": "64f17e71d7d29e2e350659c6",
        "sort": 1,
        "status": 1,
        "ticket_type": 2,
        "title": "万通海号",
        "create_time": "2023-09-05 10:44:20",
        "money": "110",
        "ticket_num": 100,
        "start": "11:50",
        "end": "18:50",
        "time": "7小时",
        "level": "",
        "day": "2023-09-05",
        "setout": "<p>万通海号</p>",
        "arrive": "<p><span class=\"mess3\"><span style=\"\">烟台同三港</span></span></p>",
        "int": "<p>6666</p>",
        "site_id": "64e31d79fb5d4e21af4290bf",
        "update_time": "2023-09-13 15:21:45",
        "delete_time": 0,
        "id": "64f6960433005a6a910b4a2d"
    }
}

```

---

## 票务类型列表（按日期筛选）

> 分组：票务管理

##### 简要描述

- 票务类型列表（按日期筛选）

##### 请求URL
- ` https://jzt2.china9.cn/api/ticket/typeLsts `
  
##### 请求方式
- GET 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string |站点id   |
|ticket_id     |是  |string | 票务id   |
|date     |是  |string | 日期 例如（2023-08-11）   |
|title     |否  |string | 标题  搜索条件    |

##### 使用示例 

 ``` 
 $.get("https://jzt2.china9.cn/api/ticket/typeLsts", {
 	site_id: "站点id",
	date: "2023-08-11",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```


##### 返回示例 



 ``` 
{
    "code": 200,
    "msg": "查询成功",
    "data": [
        {
            "ticket_id": "64f6960433005a6a910b4a2d",
            "money": "880",
            "ticket_num": 100,
            "title": "成人票vip座",
            "site_id": "64e31d79fb5d4e21af4290bf",
            "status": 1,
            "create_time": "2023-09-08 08:53:38",
            "update_time": "2023-09-08 08:53:38",
            "delete_time": 0,
            "id": "64fa70929a9c8f415827a8fe"
        },
        {
            "ticket_id": "64f6960433005a6a910b4a2d",
            "money": 0,
            "ticket_num": 0,
            "title": "车票",
            "site_id": "64e31d79fb5d4e21af4290bf",
            "status": 1,
            "create_time": "2023-09-05 10:45:07",
            "update_time": "2023-09-05 10:45:07",
            "delete_time": 0,
            "id": "64f69633dcf13618af0ce6cd"
        },
        {
            "ticket_id": "64f6960433005a6a910b4a2d",
            "money": 0,
            "ticket_num": 0,
            "title": "儿童票",
            "site_id": "64e31d79fb5d4e21af4290bf",
            "status": 1,
            "create_time": "2023-09-05 10:45:01",
            "update_time": "2023-09-05 10:45:01",
            "delete_time": 0,
            "id": "64f6962d9a9c8f415827a55b"
        },
        {
            "ticket_id": "64f6960433005a6a910b4a2d",
            "money": 0,
            "ticket_num": 0,
            "title": "成人票",
            "site_id": "64e31d79fb5d4e21af4290bf",
            "status": 1,
            "create_time": "2023-09-05 10:44:53",
            "update_time": "2023-09-05 10:44:53",
            "delete_time": 0,
            "id": "64f6962533005a6a910b4a2e"
        }
    ]
}

```

---

## 票务分类列表

> 分组：票务管理

##### 简要描述

- 票务分类列表

##### 请求URL
- ` https://jzt2.china9.cn/api/ticket/category `
  
##### 请求方式
- GET 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string |站点id   |
|limit     |否  |int | 每页显示条数  默认10|
|page     |是  |int | 当前页|

##### 使用示例 

 ``` 
 $.get("https://jzt2.china9.cn/api/ticket/category", {
 	site_id: "站点id",
	date: "2023-08-11",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```


##### 返回示例 



 ``` 
{
    "code": 200,
    "msg": "查询成功",
    "data": {
        "total": 1,
        "per_page": 10,
        "current_page": 1,
        "last_page": 1,
        "data": [
            {
                "pid": "0",
                "sort": 1,
                "type": "ticket",
                "title": "在线购票",
                "site_id": "64e31d79fb5d4e21af4290bf",
                "create_time": "2023-09-01 14:01:38",
                "update_time": "2023-09-01 14:01:38",
                "id": "64f17e428b2da57e026cf504",
                "children": [
                    {
                        "pid": "64f17e428b2da57e026cf504",
                        "sort": 5,
                        "type": "ticket",
                        "title": "大连—龙口",
                        "site_id": "64e31d79fb5d4e21af4290bf",
                        "create_time": "2023-09-01 14:03:04",
                        "update_time": "2023-09-01 14:03:04",
                        "id": "64f17e989285cb6941639ac3",
                        "children": []
                    },
                    {
                        "pid": "64f17e428b2da57e026cf504",
                        "sort": 4,
                        "type": "ticket",
                        "title": "大连—蓬莱",
                        "site_id": "64e31d79fb5d4e21af4290bf",
                        "create_time": "2023-09-01 14:02:50",
                        "update_time": "2023-09-01 14:02:50",
                        "id": "64f17e8ab1a88208a2013ade",
                        "children": []
                    },
                    {
                        "pid": "64f17e428b2da57e026cf504",
                        "sort": 3,
                        "type": "ticket",
                        "title": "大连—威海",
                        "site_id": "64e31d79fb5d4e21af4290bf",
                        "create_time": "2023-09-01 14:02:37",
                        "update_time": "2023-09-01 14:02:37",
                        "id": "64f17e7dd7d29e2e350659c8",
                        "children": []
                    },
                    {
                        "pid": "64f17e428b2da57e026cf504",
                        "sort": 2,
                        "type": "ticket",
                        "title": "大连—烟台",
                        "site_id": "64e31d79fb5d4e21af4290bf",
                        "create_time": "2023-09-01 14:02:25",
                        "update_time": "2023-09-01 14:02:25",
                        "id": "64f17e71d7d29e2e350659c6",
                        "children": []
                    }
                ]
            }
        ]
    }
}
```

---

## 修改票务订单

> 分组：票务管理

##### 简要描述

- 修改票务订单

##### 请求URL
- ` http://jzt2.china9.cn/api/ticket/editOrder `
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string |站点id   |
|order_sn |是  |string |订单号   |
|user_id 或 user_unique |是  |string |用户标识  两个字段二选一即可  两个都填默认以user_id为主   |
|其余字段自定义|

##### 使用示例 

 ``` 
 $.post("http://jzt2.china9.cn/api/ticket/editOrder", {
 	site_id: "站点id",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```


##### 返回示例 


``` 
  {
    "code": 200,
    "msg": "修改成功"
  }
```

---

## 职位列表

> 分组：人力资源/职位

##### 简要描述

- 职位列表

##### 请求URL
- ` https://jzt2.china9.cn/api/position/lst `
  
##### 请求方式
- GET 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string |站点id   |
|page |是  |int |当前页   |
|limit |否  |int |每页显示条数  默认10条   |
|title |否  |string |职位名称搜索   |
|zd_area |否  |string |重点区域id   |
|area |否  |string |区域id   |
|intention |否  |string |意向id   |
|education |否  |string |学历id   |
|money |否  |string |薪资id   |
|experience |否  |string |经验id   |

##### 使用示例 

 ``` 
 $.get("https://jzt2.china9.cn/api/position/lst", {
 	site_id: "站点id",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```

---

## 职位发布/编辑

> 分组：人力资源/职位

##### 简要描述

- 职位发布/编辑
##### 请求URL
- ` https://jzt2.china9.cn/api/position/edit `
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string |站点id   |
|id |否  |string |职位id（不传为新增  传了为编辑）   |
|title |是  |string |职位名称  |
|zd_area |是  |string |重点区域id   |
|area |是  |string |区域id（多个用,拼接）    |
|intention |是  |string |行业类型id（多个用,拼接）   |
|education |是  |string |学历id   |
|money |是  |string |薪资id   |
|experience |是  |string |经验id   |
|其余字段自定义   |

##### 使用示例 

 ``` 
 $.post("https://jzt2.china9.cn/api/position/edit", {
 	site_id: "站点id",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```

---

## 人才列表

> 分组：人力资源/人才

##### 简要描述

- 人才列表

##### 请求URL
- ` https://jzt2.china9.cn/api/talents/lst `
  
##### 请求方式
- GET 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string |站点id   |
|page |是  |int |当前页   |
|limit |否  |int |每页显示条数  默认10条   |
|title |否  |string |人员姓名搜索   |
|zd_area |否  |string |重点区域id   |
|area |否  |string |区域id   |
|intention |否  |string |意向id   |
|education |否  |string |学历id   |
|money |否  |string |薪资id   |
|experience |否  |string |经验id   |

##### 使用示例 

 ``` 
 $.get("https://jzt2.china9.cn/api/talents/lst", {
 	site_id: "站点id",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```

---

## 人才简历发布/编辑

> 分组：人力资源/人才

##### 简要描述

- 人才简历发布/编辑
##### 请求URL
- ` https://jzt2.china9.cn/api/talents/edit `
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string |站点id   |
|id |否  |string |简历id（不传为新增  传了为编辑）   |
|name |是  |string |姓名  |
|zd_area |是  |string |重点区域id   |
|area |是  |string |区域id（多个用,拼接）    |
|intention |是  |string |行业类型id（多个用,拼接）   |
|education |是  |string |学历id   |
|money |是  |string |薪资id   |
|experience |是  |string |经验id   |
|其余字段自定义  类似教育情况  有多个数据集  传数组 |示例：arr: [{name: '', ....},{name:'',...}, ...]

##### 使用示例 

 ``` 
 $.post("https://jzt2.china9.cn/api/talents/edit", {
 	site_id: "站点id",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```

---

## 区域列表

> 分组：人力资源/地域

##### 简要描述

- 区域列表

##### 请求URL
- ` https://jzt2.china9.cn/api/area/lst `
  
##### 请求方式
- GET 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string |站点id   |
|category_id |否  |string |分类id   |
|id |否  |string |地域id（不传查1级  传id查改id下的子级）   |

##### 使用示例 

 ``` 
 $.get("https://jzt2.china9.cn/api/area/lst", {
 	site_id: "站点id",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```

---

## 分类列表

> 分组：人力资源/分类

##### 简要描述

- 分类列表

##### 请求URL
- ` https://jzt2.china9.cn/api/category/rllst `
  
##### 请求方式
- GET 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string |站点id   |
|id |否  |string |分类id（不传查1级  传id查改id下的子级）   |

##### 使用示例 

 ``` 
 $.get("https://jzt2.china9.cn/api/category/rllst", {
 	site_id: "站点id",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```

---

## 房列表

> 分组：人力资源/租房

##### 简要描述

- 房列表

##### 请求URL
- ` https://jzt2.china9.cn/api/house/lst `
  
##### 请求方式
- GET 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string |站点id   |
|page |是  |int |当前页   |
|limit |否  |int |每页显示条数  默认10条   |
|category_id |否  |string |分类id筛选   |

##### 使用示例 

 ``` 
 $.get("https://jzt2.china9.cn/api/house/lst", {
 	site_id: "站点id",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```

---

## 租房发布/编辑

> 分组：人力资源/租房

##### 简要描述

- 租房发布/编辑
##### 请求URL
- ` https://jzt2.china9.cn/api/house/edit `
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|site_id |是  |string |站点id   |
|id |否  |string |房子id（不传为新增  传了为编辑）   |
|title |是  |string |标题  |
|phone |是  |string |联系方式   |
|content |是  |string |详情    |
|images |是  |string |图片（多个用,拼接）   |
|category_id |否  |string |类型id   |
|其余字段自定义   |

##### 使用示例 

 ``` 
 $.post("https://jzt2.china9.cn/api/house/edit", {
 	site_id: "站点id",
 }, function(res) {
	 if (res.code === 200) {
	 	alert("提交成功");
	 } else {
	 	// 失败
	 	console.log(res.msg);
	 }
 })

```
