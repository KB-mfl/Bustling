package Model

import (
	"Bustling/go-api/Boot/Orm"
)

type Role struct {
	ID    int 	  `gorm:"primary_key"`
	Alias string  `gorm:"unique"`
	Name  string  `gorm:"unique"`

	User  []User
}

func role()  {
	db := Orm.GetDB()
	db.Create(&Role{ID: 0, Alias:"admin", Name:"管理员"})
	db.Create(&Role{ID: 1, Alias:"user", Name:"用户"})
	var (
		users []User
		role  Role
	)
	db.Model(&role).Related(&users)
}
