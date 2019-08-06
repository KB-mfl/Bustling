package Model

import (
	"github.com/jinzhu/gorm"
	"github.com/satori/go.uuid"
)

type User struct {
	gorm.Model
	
	ID             string   `gorm:"primary_key;unique"`
	RoleId         int      `gorm:"default:1"`
	Username       string   `gorm:"unique"`
	Email          string   `gorm:"unique"`
	Avatar         string
	Password       string
	Introduction   string	`gorm:"type:text"`
	Gender         int      `gorm:"default:0"`

	ApiToken 	   []ApiToken
	Role           Role
	Code           Code
}

func (*User) BeforeCreate(scope *gorm.Scope) (err error) {
	err = scope.SetColumn("ID", interface{}(uuid.NewV4()))
	return
}
