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
	Like       bool   	 `json:"like"`
}

func Like(c *gin.Context)  {
	_user, _ := c.Get("user")
	if _user == nil {
		c.AbortWithStatus(401)
		return
	}
	user := _user.(Model.User)
	var data LikeValidate
	if err := c.ShouldBindJSON(&data); err != nil {
		c.AbortWithStatus(422)
		return
	}
	db := Orm.GetDB()
	var article Model.Article
	var likeArticle Model.LikeArticle
	if db.Where("id=?", data.ArticleId).First(&article).RecordNotFound() {
		c.AbortWithStatus(404)
		return
	}
	if data.Like {
		db.Model(&article).UpdateColumn("likes", article.Likes + 1)
	} else {
		db.Model(&article).UpdateColumn("unlikes", article.Unlikes + 1)
	}
	if db.Where("user_id=?", user.ID).Where("article_id=?", data.ArticleId).
		First(&likeArticle).RecordNotFound() {
		db.Create(&Model.LikeArticle{
			ArticleId: data.ArticleId,
			UserId: user.ID,
			Like: data.Like,
		})
	} else {
		db.Model(&likeArticle).UpdateColumn("like", data.Like)
	}
}
