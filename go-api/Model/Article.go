package Model

import (
	"github.com/jinzhu/gorm"
	uuid "github.com/satori/go.uuid"
	"time"
)

type Article struct {
	ID 			uuid.UUID	`gorm:"primary_key;unique"`
	UserId  	uuid.UUID	`gorm:"not null"`
	Title   	string		`gorm:"not null"`
	ArticleType string		`gorm:"not null"`
	Tags    	string		`gorm:"not null"`
	HtmlContent string		`gorm:"type:text;not null"`
	RawContent  string		`gorm:"type:text;not null"`
	Likes       int			`gorm:"default:0"`
	Unlikes		int			`gorm:"default:0"`
	Views  		int			`gorm:"default:0"`
	Reviewed	bool		`gorm:"type:bool;default:false"`

	CreatedAt 	time.Time
	UpdatedAt 	time.Time
	DeletedAt   *time.Time

	User  		User		`gorm:"foreignKey:UserId;association_foreignKey:ID"`
}

func (article *Article)TableName(scope *gorm.Scope) string {
	return "article"
}

func (article *Article)BeforeCreate(scope *gorm.Scope) (err error) {
	err = scope.SetColumn("ID", interface{}(uuid.NewV4()))
	err = scope.SetColumn("UpdatedAt", time.Now())
	err = scope.SetColumn("CreatedAt", time.Now())
	return
}

func (article *Article)AfterUpdate(scope *gorm.Scope) (err error) {
	err = scope.SetColumn("UpdatedAt", time.Now())
	return
}

func (article *Article)GetData(kind string) map[string]interface{} {
	switch kind {
	case "list":
		return map[string]interface{}{
			"user_id":    article.UserId,
			"id":         article.ID,
			"title": 	  article.Title,
			"tags":       article.Tags,
			"created_at": article.CreatedAt,
			"updated_at": article.UpdatedAt,
		}
	default:
		return map[string]interface{}{}
	}
}