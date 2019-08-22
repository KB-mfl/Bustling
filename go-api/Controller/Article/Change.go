package Article

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
)

type ChangeArticleValidate struct {
	Title 		string `json:"title"`
	Tags 		string `json:"tags"`
	ArticleType string `json:"article_type"`
	HtmlContent string `json:"html_content"`
	RawContent  string `json:"raw_content"`
}

func Change(c *gin.Context)  {
	userId,_ := c.Get("user")
	if userId == nil {
		c.AbortWithStatus(401)
		return
	}
	db := Orm.GetDB()
	var articleId = c.Param("article_id")
	var article Model.Article
	if db.Where("id=?", articleId).First(&article).RecordNotFound() {
		c.JSON(404, gin.H{"message":"文章找不到了哦"})
		return
	}
	if article.UserId != userId.(uuid.UUID) {
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
