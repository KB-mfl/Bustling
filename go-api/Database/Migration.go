package Database

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"fmt"
)

func Migration() {
	db := Orm.GetDB()
	err := db.HasTable("test")
	if  !err {
		db.CreateTable(&Model.Test{})
	} else  {
		fmt.Println("it is existed")
	}
}
