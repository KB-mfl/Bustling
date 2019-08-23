package Model

import (
	"github.com/jinzhu/gorm"
	uuid "github.com/satori/go.uuid"
	"time"
)

type Comment struct {
	ID          uuid.UUID 	`gorm:"primary_key"`
	ArticleId   uuid.UUID	`gorm:"not null"`
	UserId      uuid.UUID	`gorm:"not null"`
	ReplyUserId uuid.UUID	`gorm:"default:null"`
	PreId       uuid.UUID	`gorm:"default:null"`
	Content     string		`gorm:"type:text"`
	CreatedAt   time.Time

	Article     []Article	`gorm:"foreignKey:ArticleId;association_foreignKey:ID"`
	Comment     []Comment	`gorm:"foreignKey:PreId;association_foreignKey:ID"`
}

func (comment *Comment)TableName() string {
	return "comment"
}

func (comment *Comment)BeforeCreate(scope *gorm.Scope) (err error) {
	err = scope.SetColumn("created_at", time.Now())
	err = scope.SetColumn("id", interface{}(uuid.NewV4()))
	return
}