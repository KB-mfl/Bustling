package Model

import (
	"github.com/jinzhu/gorm"
	"time"
)

type ApiToken struct {
	gorm.Model

	UserId     string	  `gorm:"not null"`
	Token      string     `gorm:"unique;not null"`
	ExpiredAt  time.Time

}

func (*ApiToken) TableName() string {
	return "api_token"
}

func apiToken()  {
	
}