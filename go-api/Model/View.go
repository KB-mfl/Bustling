package Model

import (
	"github.com/jinzhu/gorm"
	uuid "github.com/satori/go.uuid"
)

type View struct {
	gorm.Model

	ArticleId  uuid.UUID  `gorm:"not null"`
	UserId     uuid.UUID  `gorm:"not null"`
}

func (view *View)TableName() string {
	return "view"
}
