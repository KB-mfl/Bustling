package Model

import (
	"Bustling/go-api/Boot/Orm"
	"github.com/jinzhu/gorm"
	"github.com/satori/go.uuid"
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
	Gender         int        `gorm:"default:1;not null"`
	CreatedAt      time.Time
	UpdatedAt      time.Time
	DeletedAt      *time.Time

	ApiToken 	   []ApiToken `gorm:"foreignKey:UserId;association_foreignKey:ID"`
	Role           Role		  `gorm:"foreignKey:UserId;association_foreignKey:ID"`
	Article		   []Article  `gorm:"foreignKey:UserId;association_foreignKey:ID"`
}

func (user *User)TableName(scope *gorm.Scope) string {
	return "user"
}

func (user *User) BeforeCreate(scope *gorm.Scope) (err error) {
	err = scope.SetColumn("ID", interface{}(uuid.NewV4()))
	err = scope.SetColumn("CreatedAt", time.Now())
	err = scope.SetColumn("UpdatedAt", time.Now())
	return
}

func (user *User)AfterUpdate(scope *gorm.Scope) (err error) {
	err = scope.SetColumn("UpdatedAt", time.Now())
	return
}

func (user *User) GetData(kind string) map[string]interface{} {
	switch kind {
	case "detail":
		db := Orm.GetDB()
		var role Role
		if err := db.Model(user).Related(&role).Find(&role).Error; err != nil {
			panic(err)
		}
		return map[string]interface{} {
			"username": user.Username,
			"avatar": user.Avatar,
			"email": user.Email,
			"gender": user.Gender,
			"role": role.GetData(),
			"introduction": user.Introduction,
		}
	default:
		return make(map[string]interface{})
	}
}