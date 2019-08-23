package Article

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
)

/**
 * @api {POST} article/ 发表文章-Create
 * @apiGroup Article
 * @apiName Create
 * @apiPermission User
 * @apiParam {string} title 文章标题
 * @apiParam {string} article_type 文章类型
 * @apiParam {string} tags 文章标签
 * @apiParam {string} html_content html格式
 * @apiParam {string} raw_content raw格式
 * @apiParamExample {json} Request-Example:
 * {
 *      'title': '震惊！！！',
 *      'articleType': '综合',
 *      'tags': '996/工作室',
 *      'htmlContent': '<p>这是内容</p>',
 *      'rawContent': '假装这是raw格式'
 * }
 */

type CreateValidate struct {
	Title 		string  `json:"title" binding:"required,max=30"`
	ArticleType string	`json:"article_type" binding:"required"`
	Tags 		string  `json:"tags" binding:"required"`
	HtmlContent string	`json:"html_content" binding:"required"`
	RawContent  string  `json:"raw_content" binding:"required"`
}

func Create(c *gin.Context)  {
	var data CreateValidate
	err := c.ShouldBindJSON(&data)
	if err != nil {
		c.JSON(422, gin.H{"message": "信息格式不正确哦"})
		panic(err)
	}
	_user, _ := c.Get("user")
	if _user == nil {
		c.AbortWithStatus(401)
	}
	user := _user.(Model.User)
	db := Orm.GetDB()
	var article = Model.Article{
		UserId: user.ID,
		Title: data.Title,
		Tags: data.Tags,
		HtmlContent: data.HtmlContent,
		RawContent: data.RawContent,
		ArticleType: data.ArticleType,
	}
	if err := db.Create(&article).Error; err != nil {
		panic(err)
	}
}