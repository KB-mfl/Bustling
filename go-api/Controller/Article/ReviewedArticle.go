package Article

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
)

/**
 * @api {POST} article/reviewed 管理员审核-ReviewedArticle
 * @apiGroup Article
 * @apiName ReviewedArticle
 * @apiPermission Admin
 * @apiParam {string} article_id 文章id
 * @apiParam {bool} reviewed 审核结果
 * @apiParam {string} [reason] 原因
 * @apiParamExample {json} Request-Example
 *{
 *		'article_id': '78fc16d3-35a9-460e-a3e3-4af0ac61052b',
 *      'reviewed': true,
 *		'reason': '文章写得挺好的'
 *}
 */

type ReviewedArticleValidate struct {
	ArticleId string `json:"article_id" binding:"required"`
	Reviewed  bool 	 `json:"reviewed"`
	Reason    string `json:"reason"`
}

func ReviewedArticle(c *gin.Context) {
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
	var data ReviewedArticleValidate
	err := c.ShouldBindJSON(&data)
	if err != nil {
		panic(err)
	}
	var article Model.Article
	if db.Where("id=?", data.ArticleId).First(&article).RecordNotFound() {
		c.AbortWithStatus(404)
		return
	}
	var reviewed int
	if data.Reviewed {
		reviewed = 1
	} else {
		reviewed = -1
	}
	if err := db.Create(&Model.ReviewedRecord{
		UserId:    user.ID,
		ArticleId: uuid.FromStringOrNil(data.ArticleId),
		Result:    data.Reviewed,
		Reason:    data.Reason,
	}).Error; err != nil {
		panic(err)
	}
	if err := db.Model(&article).UpdateColumn("reviewed", reviewed).Error; err != nil {
		panic(err)
	}
}