package Model

import (
	"github.com/jinzhu/gorm"
	uuid "github.com/satori/go.uuid"
)

type LikeArticle struct {
	gorm.Model
	UserId 		uuid.UUID   `gorm:"not null"`
	ArticleId 	uuid.UUID   `gorm:"nor null"`
	Like 		bool        `gorm:"not null"`
}

func (likeArticle *LikeArticle) TableName() string {
	return "like_article"
}
