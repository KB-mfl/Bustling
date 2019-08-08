package Migration

import (
	"Bustling/go-api/Boot/Orm"
	"fmt"
)

var Migration *migration

type migration struct {
	_model map[string]interface{}
}

func InitMigration(model map[string]interface{}) {
	Migration = new(migration)
	Migration._model = model
}

func Fresh()  {
	db := Orm.GetDB()
	for key, value := range Migration._model{
		if db.HasTable(key) {
			fmt.Println("table", key, "is existed")
		} else {
			db.Table(key).Set("gorm:table_options", "ENGINE=InnoDB").CreateTable(value)
			fmt.Println("table", key, "has been created successfully")
		}
	}
}

func Refresh()  {
	db := Orm.GetDB()
	for key, value := range Migration._model{
		db.DropTableIfExists(key)
		fmt.Println("table", key, "has been dropped successfully")
		db.Table(key).Set("gorm:table_options", "ENGINE=InnoDB").CreateTable(value)
		fmt.Println("table", key, "has been created successfully")
	}
}