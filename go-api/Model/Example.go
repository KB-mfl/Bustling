package Model

import "github.com/jinzhu/gorm"
// 此文件为Model样例文件
type Example struct {
	gorm.Model
	Test int `gorm:"unique;default:1"`
}

// 定义表名
func (example *Example) TableName() string {
	return "example"
}

// 在创建模型前的钩子
func (example *Example) BeforeCreate(scope *gorm.Scope) error {
	// do something
	return nil
}
