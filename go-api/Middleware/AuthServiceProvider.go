package Middleware

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
	"time"
)

var ApiToken Model.ApiToken
var User Model.User

func AuthServiceProvider() gin.HandlerFunc {
	return func(c *gin.Context) {
		db := Orm.GetDB()
		token := c.Request.Header.Get("Api_Token")
		if apiToken := db.Where("id = ?", token).First(&ApiToken); apiToken != nil {
			if apiToken.expired_at.Before(time.Now()) {
				c.Set("user", nil)
			}
			user := db.Where("id = ?", apiToken.user_id).First(&User)
			c.Set("user", user)
			apiToken.expired_at
		} else {
			c.Set("user", nil)
		}
	}
}
