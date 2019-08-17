package Article

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
	"strconv"
)

func GetSelfList(c *gin.Context)  {
	userId := c.Param("user_id")
	authId, _ := c.Get("user")
	if userId != authId {
		c.AbortWithStatus(403)
		return
	}
	var limit, _ = strconv.Atoi(c.DefaultQuery("limit", "7"))
	var offset, _ = strconv.Atoi(c.DefaultQuery("offset", "0"))
	var articles []Model.Article
	var db = Orm.GetDB()
	if err := db.Where("user_id=?", userId).Offset(offset).Limit(limit).
		Find(&articles).Error; err != nil {
		panic(err)
	}
	var response []interface{}
	for _, article := range articles {
		response = append(response, article.GetData("list"))
	}
	c.JSON(200, response)
}
