package Model

import (
	"github.com/jinzhu/gorm"
	"github.com/satori/go.uuid"
)

type User struct {
	gorm.Model

	ID             string   `gorm:"type:string;primary_key;unique;column:id'"`
	RoleId         int      `gorm:"type:int;default:1;column:role_id"`
	Username       string   `gorm:"type:string;unique;column:username"`
	Email          string   `gorm:"type:string;unique;column:email"`
	Avatar         string	`gorm:"type:string;column:avatar"`
	Password       string	`gorm:"type:string;column:password"`
	Introduction   string	`gorm:"type:text;column:introduction"`
	Gender         int      `gorm:"type:int; default:0;column:gender"`
}

func (*User) BeforeCreate(scope *gorm.Scope) error {
	err := scope.SetColumn("ID", interface{}(uuid.NewV4()))
	return err
}
