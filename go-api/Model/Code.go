package Model

import (
	"github.com/jinzhu/gorm"
	"time"
)

type Code struct {
	gorm.Model

	Code string			 `gorm:"not null"`
	Email string		 `gorm:"not null"`
	ExpiredAt time.Time  `gorm:"not null"`
}

func (*Code) TableName() string {
	return "code"
}