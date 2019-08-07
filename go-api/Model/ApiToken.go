package Model

import (
	"github.com/jinzhu/gorm"
	"time"
)

type ApiToken struct {
	gorm.Model

	UserId     string
	Token      string     `gorm:"unique"`
	ExpiredAt  time.Time

}

func (*ApiToken) TableName() string {
	return "api_token"
}

func apiToken()  {
	
}