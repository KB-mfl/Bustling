package Article

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
)

/**
 * @api {PUT} article/view/:article_id 浏览量记录-View
 * @apiGroup Article
 * @apiName View
 * @apiPermission User/Admin
 * @apiParam {string} article_id 文章id
 */

func View(c *gin.Context) {
	_user, _ := c.Get("user")
	if _user == nil {
		c.AbortWithStatus(401)
		return
	}
	user := _user.(Model.User)
	var articleId = c.Param("article_id")
	db := Orm.GetDB()
	var article Model.Article
	if db.Where("id=?", articleId).Find(&article).RecordNotFound() {
		c.AbortWithStatus(404)
		return
	}
	if db.Where("article_id=?", articleId).Where("user_id=?", user.ID).
		Find(&Model.View{}).RecordNotFound() {
		article_id, _ := uuid.FromString(articleId)
		db.Create(&Model.View{
			ArticleId: article_id,
			UserId: user.ID,
		})
		if err := db.Model(&article).UpdateColumn("views", article.Views + 1).Error; err != nil {
			panic(err)
		}
	}
}
