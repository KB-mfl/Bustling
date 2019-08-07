package main

import (
	"Bustling/go-api/Boot/Config"
	"Bustling/go-api/Boot/Http"
	"Bustling/go-api/Boot/Log"
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Route"
)

func _init() {
	Config.InitConfig()
	Log.InitLog()
	Log.InitTimer()
	Orm.InitOrm()

	Http.InitHttp()

	//Database.Migration()

	Route.AddApiRoute()
	Route.AddStaticRoute()
}

func _end() {
	Orm.EndOrm()
}

func main()  {
	_init()
	Http.Run()
	defer _end()
}