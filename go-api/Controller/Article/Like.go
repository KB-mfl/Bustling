package Article

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
)

/**
 * @api {POST} article/like 文章点赞-LikeArticle
 * @apiGroup Article
 * @apiName LikeArticle
 * @apiPermission User/Admin
 * @apiParam {string} article_id 文章id
 * @apiParam {bool} like 是否喜欢（执行动作）
 * @apiParamExample {json} Request-Example:
 * {
 *		'article_id': '8825f0e8-f70b-4c21-b7dc-64a3bee54fb0',
 *		'like': true
 * }
 */

type LikeValidate struct {
	ArticleId  uuid.UUID `json:"article_id" binding:"required"`
	Like       bool   `json:"like" binding:"required,"`
}

func Like(c *gin.Context)  {
	userId, _ := c.Get("user")
	if userId == nil {
		c.AbortWithStatus(401)
		return
	}
	var data LikeValidate
	if err := c.ShouldBindJSON(&data); err != nil {
		panic(err)
	}
	db := Orm.GetDB()
	var likeArticle Model.LikeArticle
	if db.Where("user_id=?", userId).Where("article_id=?", data.ArticleId).
		First(&likeArticle).RecordNotFound() {
		db.Create(&Model.LikeArticle{
			ArticleId: data.ArticleId,
			UserId: userId.(uuid.UUID),
			Like: data.Like,
		})
	} else {
		db.Model(&likeArticle).UpdateColumn("like", data.Like)
	}
}
