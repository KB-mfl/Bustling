package Model

import (
	"github.com/jinzhu/gorm"
	"time"
)

type ApiToken struct {
	gorm.Model

	ID         int        `gorm:"auto_increment"`
	UserId     string
	Token      string     `gorm:"unique"`
	ExpiredAt  time.Time
}

func main() {

}