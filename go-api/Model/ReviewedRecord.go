package Model

import (
	"github.com/jinzhu/gorm"
	uuid "github.com/satori/go.uuid"
)

type ReviewedRecord struct {
	gorm.Model

	UserId    uuid.UUID  `gorm:"not null"`
	ArticleId uuid.UUID  `gorm:"not null"`
	Result    bool       `gorm:"not null"`
	Reason    string	 `gorm:"type:text"`
}

func (reviewedRecord *ReviewedRecord)TableName() string {
	return "reviewed_record"
}
