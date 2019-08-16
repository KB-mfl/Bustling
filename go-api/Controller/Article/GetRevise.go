package Article

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
)

func GetRevise(c *gin.Context)  {
	userId,_ := c.Get("user")
	if userId == nil {
		c.AbortWithStatus(401)
		return
	}
	articleId := c.Param("article_id")
	db := Orm.GetDB()
	var article Model.Article
	if err := db.Where("id=?", articleId).First(&article).Error; err != nil {
		panic(err)
	}
	if article.UserId != userId.(uuid.UUID) {
		c.JSON(403,gin.H{"message":"这不是您的文章哦"})
		return
	}
	c.JSON(200, article.GetData("revise"))
}
