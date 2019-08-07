package Model

import "github.com/jinzhu/gorm"
// 此文件为Model样例文件
type Example struct {
	gorm.Model
	Test string
}

// 定义表名
func (Example) TableName() string {
	return "example"
}

// 在创建模型前的钩子
func (*Example) BeforeCreate(scope *gorm.Scope) error {
	// do something
	return nil
}
