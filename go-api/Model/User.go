package Model

import (
	"github.com/jinzhu/gorm"
	"github.com/satori/go.uuid"
	"strconv"
	"time"
)

type User struct {
	ID             uuid.UUID  `gorm:"primary_key;unique"`
	RoleId         int        `gorm:"default:1;not null"`
	Username       string     `gorm:"unique;not null"`
	Email          string     `gorm:"unique;not null"`
	Avatar         string
	Password       string	  `gorm:"not null"`
	Introduction   string	  `gorm:"type:text"`
	Gender         int        `gorm:"default:0;not null"`
	CreateAt       time.Time
	UpdateAt       time.Time
	DeleteAt       *time.Time

	ApiToken 	   []ApiToken `gorm:"foreignKey:UserId;association_foreignKey:ID"`
	Role           Role		  `gorm:"foreignKey:UserId;association_foreignKey:ID"`
}

func (user *User) BeforeCreate(scope *gorm.Scope) (err error) {
	err = scope.SetColumn("ID", interface{}(uuid.NewV4()))
	err = scope.SetColumn("CreateAt", time.Now())
	err = scope.SetColumn("UpdateAt", time.Now())
	return
}

func (user *User) GetData(kind string) map[string]string {
	switch kind {
	case "detail":
		return map[string]string{
			"username": user.Username,
			"avatar": user.Avatar,
			"email": user.Email,
			"gender": strconv.Itoa(user.Gender),
			"role": strconv.Itoa(user.RoleId),
			"introduction": user.Introduction,
		}
	default:
		return make(map[string]string)
	}
}