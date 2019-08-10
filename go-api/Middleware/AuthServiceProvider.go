package Middleware

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
	"time"
)

var apiToken Model.ApiToken
var user Model.User

func AuthServiceProvider() gin.HandlerFunc {
	return func(c *gin.Context) {
		db := Orm.GetDB()
		token := c.Request.Header.Get("Api_Token")
		if !db.Where("token = ?", token).Last(&apiToken).RecordNotFound() {
			if apiToken.ExpiredAt.Before(time.Now()) {
				c.Set("user", nil)
			} else {
				db.Model(&apiToken).Association("User").Find(&user)
				c.Set("user", user.Email)
				duration, _ := time.ParseDuration("30m")
				newTime := apiToken.ExpiredAt.Add(duration)
				db.Model(&apiToken).Update("expired_at", newTime)
			}
		} else {
			c.Set("user", nil)
		}
		c.Next()
	}
}
