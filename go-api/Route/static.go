package Route

import (
	"Bustling/go-api/Boot/Http"
)

// 静态文件路由转发写在这里
func AddStaticRoute()  {
	Http.Router.Static("/static", "./Public")
}
