package Comment

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
)

/**
 * @api {DELETE} /:comment_id 删除评论-delete_comment
 * @apiGroup Comment
 * @apiName Delete
 * @apiPermission User/Admin
 * @apiParam {string} comment_id 评论id
 */

func Delete(c *gin.Context)  {
	_user,_ := c.Get("user")
	if _user == nil {
		c.AbortWithStatus(401)
		return
	}
	user := _user.(Model.User)
	var commentId = c.Param("comment_id")
	var comment Model.Comment
	db := Orm.GetDB()
	if db.Where("id=?", commentId).First(&comment).RecordNotFound() {
		c.AbortWithStatus(404)
		return
	}
	if user.RoleId != 2 || user.ID != comment.UserId {
		c.AbortWithStatus(403)
		return
	} else {
		if err := db.Delete(&comment).Error; err != nil {
			panic(err)
		}
	}
}
