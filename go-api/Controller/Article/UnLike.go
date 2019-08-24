package Article

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
	"strconv"
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

func UnLike(c *gin.Context)  {
	_user, _ := c.Get("user")
	if _user == nil {
		c.AbortWithStatus(401)
		return
	}
	user := _user.(Model.User)
	articleId := c.Query("article_id")
	_like := c.Query("like")
	if articleId == "" || _like == "" {
		c.AbortWithStatus(422)
		return
	}
	like, _ := strconv.ParseBool(_like)
	db := Orm.GetDB()
	var article Model.Article
	if db.Where("id=?", articleId).First(&article).RecordNotFound() {
		c.AbortWithStatus(404)
		return
	}
	if like {
		db.Model(&article).UpdateColumn("likes", article.Likes - 1)
	} else {
		db.Model(&article).UpdateColumn("unlikes", article.Unlikes - 1)
	}
	var likeArticle Model.LikeArticle
	_articleId, _ := uuid.FromString(articleId)
	if db.Where(&Model.LikeArticle{
		UserId:user.ID,
		ArticleId:_articleId,
		Like:like,
	}).First(&likeArticle).RecordNotFound() {
		c.AbortWithStatus(404)
	} else {
		if err := db.Delete(&likeArticle).Error; err != nil {
			panic(err)
		}
	}
}
