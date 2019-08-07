package Model

import (
	"Bustling/go-api/Boot/Orm"
	"github.com/jinzhu/gorm"
	"github.com/satori/go.uuid"
)

type User struct {
	gorm.Model
	
	ID             string     `gorm:"primary_key;unique"`
	RoleId         int        `gorm:"default:1"`
	Username       string     `gorm:"unique"`
	Email          string     `gorm:"unique"`
	Avatar         string
	Password       string
	Introduction   string	  `gorm:"type:text"`
	Gender         int        `gorm:"default:0"`

	ApiToken 	   []ApiToken `gorm:"foreignKey:UserId;association_foreignKey:ID"`
	Role           Role		  `gorm:"foreignKey:UserId;association_foreignKey:ID"`
}

func (*User) BeforeCreate(scope *gorm.Scope) (err error) {
	err = scope.SetColumn("ID", interface{}(uuid.NewV4()))
	return
}

func user()  {
	db := Orm.GetDB()

}