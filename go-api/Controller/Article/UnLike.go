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
 */

type UnLikeValidate struct {
	ArticleId uuid.UUID `json:"article_id" binding:"required"`
}

func UnLike(c *gin.Context)  {
	userId, _ := c.Get("user")
	if userId == nil {
		c.AbortWithStatus(401)
		return
	}
	var data UnLikeValidate
	if err := c.ShouldBindJSON(&data); err != nil {
		c.AbortWithStatus(422)
		return
	}
	db := Orm.GetDB()
	if err := db.Where("user_id=?", userId).Where("article_id=?", data.ArticleId).
		Delete(&Model.LikeArticle{}).Error; err != nil {
		panic(err)
	}
}
