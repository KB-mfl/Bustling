package Article

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
)

/**
 * @api {PUT} article/change/:article_id 修改文章-Change
 * @apiGroup Article
 * @apiName Change
 * @apiPermission User
 * @apiParam {string} title 标题
 * @apiParam {string} article_type 文章类型
 * @apiParam {string} tags 文章标签
 * @apiParam {string} html_content
 * @apiParam {string} raw_content
 * @apiParamExample {json} Request-Example:
 * {
 * 		'title': '标题',
 * 		'tags': '标签1/标签2',
 * 		'article_type': 'study',
 *		'html_content': '<p style="text-indent:2em;">今天我要看完白夜行</p>',
 *		'raw_content': '{"blocks":[{"key":"bcoms","text":"今天我要看完白夜行","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"textIndent":1}}],"entityMap":{}}'
 * }
 */

type ChangeArticleValidate struct {
	Title 		string `json:"title"`
	Tags 		string `json:"tags"`
	ArticleType string `json:"article_type"`
	HtmlContent string `json:"html_content"`
	RawContent  string `json:"raw_content"`
}

func Change(c *gin.Context)  {
	_user,_ := c.Get("user")
	if _user == nil {
		c.AbortWithStatus(401)
		return
	}
	user := _user.(Model.User)
	db := Orm.GetDB()
	var articleId = c.Param("article_id")
	var article Model.Article
	if db.Where("id=?", articleId).First(&article).RecordNotFound() {
		c.JSON(404, gin.H{"message":"文章找不到了哦"})
		return
	}
	if article.UserId != user.ID {
		c.AbortWithStatus(403)
		return
	}
	var data ChangeArticleValidate
	if err := c.ShouldBindJSON(&data); err != nil {
		panic(err)
	}
	db.Model(&article).Updates(Model.Article{
		Title:       data.Title,
		ArticleType: data.ArticleType,
		Tags:        data.Tags,
		HtmlContent: data.HtmlContent,
		RawContent:  data.RawContent,
	})
}
