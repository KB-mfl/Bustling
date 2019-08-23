package Article

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
)

/**
 * @api {DELETE} article/unlike 取消喜欢或不喜欢-UnLike
 * @apiGroup Article
 * @apiName UnLike
 * @apiPermission User/Admin
 * @apiParam {string} article_id 文章id
 * @apiParam {bool} like 是否喜欢
 * @apiParamExample {json} Request-Example:
 * {
 * 		'article_id': '8825f0e8-f70b-4c21-b7dc-64a3bee54fb0',
 * 		'like': true
 * }
 */

type UnLikeValidate struct {
	ArticleId uuid.UUID `json:"article_id" binding:"required"`
	Like      bool      `json:"like"`
}

func UnLike(c *gin.Context)  {
	_user, _ := c.Get("user")
	if _user == nil {
		c.AbortWithStatus(401)
		return
	}
	user := _user.(Model.User)
	var data UnLikeValidate
	if err := c.ShouldBindJSON(&data); err != nil {
		c.AbortWithStatus(422)
		return
	}
	db := Orm.GetDB()
	var article Model.Article
	if db.Where("id=?", data.ArticleId).First(&article).RecordNotFound() {
		c.AbortWithStatus(404)
		return
	}
	if data.Like {
		db.Model(&article).UpdateColumn("likes", article.Likes - 1)
	} else {
		db.Model(&article).UpdateColumn("unlikes", article.Unlikes - 1)
	}
	if err := db.Where("user_id=?", user.ID).Where("article_id=?", data.ArticleId).
		Delete(&Model.LikeArticle{}).Error; err != nil {
		panic(err)
	}
}
