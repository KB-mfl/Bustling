package Middleware

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
	"time"
)

func AuthServiceProvider() gin.HandlerFunc {
	return func(c *gin.Context) {
		db := Orm.GetDB()
		token := c.Request.Header.Get("Api_Token")
		var apiToken Model.ApiToken
		if !db.Where("token=?", token).First(&apiToken).RecordNotFound() {
			if apiToken.ExpiredAt.Before(time.Now()) {
				c.Set("user", nil)
			} else {
				db := Orm.GetDB()
				var user Model.User
				db.Model(&apiToken).Related(&user)
				c.Set("user", user)
				duration, _ := time.ParseDuration("30m")
				db.Model(&apiToken).Update("expired_at", apiToken.ExpiredAt.Add(duration))
			}
		} else {
			c.Set("user", nil)
		}
		c.Next()
	}
}
