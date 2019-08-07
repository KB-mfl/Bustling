package Database

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"fmt"
)

func Migration() {
	db := Orm.GetDB()
	err := db.HasTable("example")
	if  !err {
		db.CreateTable(&Model.Example{})
	} else  {
		fmt.Println("it is existed")
	}
}
