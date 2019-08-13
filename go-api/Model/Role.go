package Model

import (
	"Bustling/go-api/Boot/Orm"
)

type Role struct {
	ID    int 	  `gorm:"primary_key;unique"`
	Alias string  `gorm:"unique;not null"`
	Name  string  `gorm:"unique;not null"`

	User  []User  `gorm:"foreignKey:RoleId;association_foreignKey:ID"`
}

func (*Role) TableName() string {
	return "role"
}

func (*Role)Init()  {
	db := Orm.GetDB()
	db.Create(&Role{ID: 0, Alias:"admin", Name:"管理员"})
	db.Create(&Role{ID: 1, Alias:"user", Name:"用户"})
}

func (role *Role)GetData() map[string]interface{} {
	return map[string]interface{}{
		"roleId": role.ID,
		"alias": role.Alias,
		"name": role.Name,
	}
}