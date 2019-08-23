package Article

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
)

/**
 * @api {DELETE} article/delete/:article_id 删除文章-Delete
 * @apiGroup Article
 * @apiName Delete
 * @apiPermission Admin
 * @apiParam {string} article_id 文章id
 */

func Delete(c *gin.Context) {
	_user,_ := c.Get("user")
	if _user == nil {
		c.AbortWithStatus(401)
		return
	}
	user := _user.(Model.User)
	db := Orm.GetDB()

	if user.RoleId != 2 {
		c.AbortWithStatus(403)
		return
	}
	var articleId = c.Param("article_id")
	if err := db.Where("id=?", articleId).Delete(&Model.Article{}).Error; err != nil {
		panic(err)
	}
}
