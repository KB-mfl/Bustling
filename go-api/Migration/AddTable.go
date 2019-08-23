package Migration

import "Bustling/go-api/Model"

func AddTable()  {
	InitMigration(map[string]interface{}{
		"user": &Model.User{},
		"role": &Model.Role{},
		"api_token": &Model.ApiToken{},
		"code": &Model.Code{},
		"example": &Model.Example{},
		"article": &Model.Article{},
		"like_article": &Model.LikeArticle{},
		"reviewed_record": &Model.ReviewedRecord{},
		"view": &Model.View{},
		"comment": &Model.Comment{},
	})
}