package Article

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
)

/**
 * @api {GET} article/islike/:article_id 是否已经点赞
 * @apiGroup Article
 * @apiName IsLike
 * @apiPermission User/Admin
 * @apiParam {string} article_id 文章id
 * @apiSuccess {int} islike 是否喜欢
 */

func IsLike(c *gin.Context)  {
	_user, _ := c.Get("user")
	if _user == nil {
		c.AbortWithStatus(401)
		return
	}
	var islike int
	articleId := c.Param("article_id")
	user := _user.(Model.User)
	db := Orm.GetDB()
	var likeArticle Model.LikeArticle
	if db.Where("article_id=?", articleId).Where("user_id=?", user.ID).First(&likeArticle).RecordNotFound() {
		islike = 0
	} else {
		if likeArticle.Like {
			islike = 1
		} else {
			islike = -1
		}
	}
	c.JSON(200, gin.H{"islike": islike})
}
