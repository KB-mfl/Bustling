package Comment

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
)

/**
 * @api {POST} / 发表评论-create_comment
 * @apiGroup Comment
 * @apiName Create
 * @apiPermission User/Admin
 * @apiParam {string} article_id 文章id
 * @apiParam {string} content 内容
 * @apiParam {string} [reply_user_id] 回复人id
 * @apiParam {string} [PreId] 父级id
 * @apiParamExample {json} Request-Example1:
 * {
 * 		'article_id': '8825f0e8-f70b-4c21-b7dc-64a3bee54fb0',
 * 		'reply_user_id': 'f84a5d0c-e36f-434f-91b2-e767d39398d9',
 * 		'pre_id': '78fc16d3-35a9-460e-a3e3-4af0ac61052b',
 * 		'content': '这是一条评论'
 * }
 * @apiParamExample {json} Request-Example2:
 * {
 * 		'article_id': '8825f0e8-f70b-4c21-b7dc-64a3bee54fb0',
 * 		'content': '这是一条评论'
 * }
 */

type CreateValidate struct {
	ArticleId 	uuid.UUID 	`json:"article_id" binding:"required"`
	ReplyUserId uuid.UUID 	`json:"reply_user_id"`
	PreId 		uuid.UUID 	`json:"pre_id"`
	Content 	string 		`json:"content" binding:"required"`
}

func Create(c *gin.Context)  {
	_user,_ := c.Get("user")
	if _user == nil {
		c.AbortWithStatus(401)
		return
	}
	user := _user.(Model.User)
	var data CreateValidate
	if err := c.ShouldBindJSON(&data); err != nil {
		c.AbortWithStatus(422)
		return
	}
	db := Orm.GetDB()
	db.Create(&Model.Comment{
		UserId: 	 user.ID,
		ArticleId: 	 data.ArticleId,
		PreId: 		 data.PreId,
		ReplyUserId: data.ReplyUserId,
		Content: 	 data.Content,
	})
}
