package main

import (
	"Bustling/go-api/Boot/Config"
	"Bustling/go-api/Boot/Http"
	"Bustling/go-api/Boot/Log"
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Migration"
	"Bustling/go-api/Route"
	"fmt"
	"os"
	"strings"
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

func _run()  {
	_init()
	Http.Run()
	defer _end()
}

func main()  {
	if len(os.Args) > 1 {
		param := strings.Join(os.Args[1:], "")
		switch param {
		case "fresh":
			Config.InitConfig()
			Orm.InitOrm()
			Migration.AddTable()
			Migration.Fresh()
			defer _end()
			return
		case "refresh":
			Config.InitConfig()
			Orm.InitOrm()
			Migration.AddTable()
			Migration.Refresh()
			defer _end()
			return
		default:
			fmt.Println(param, "is not a command")
		}
	} else {
		_run()
	}
}