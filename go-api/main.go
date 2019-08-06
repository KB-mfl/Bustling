package main

import (
	"Bustling/go-api/Boot/Config"
	"Bustling/go-api/Boot/Http"
	"Bustling/go-api/Boot/Log"
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Database"
	"Bustling/go-api/Route"
)

func _init() {
	Config.InitConfig()
	Log.InitLog()
	Log.InitTimer()
	Orm.InitOrm()

	Http.InitHttp()
	Route.AddApiRoute()
}

func _end() {
	Orm.EndOrm()
}

func main()  {
	_init()
	Database.Migration()
	Http.Router.Static("/static", "./Public")
	Http.Run()
	defer _end()
}