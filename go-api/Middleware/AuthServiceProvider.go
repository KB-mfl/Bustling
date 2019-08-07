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
		if apiToken := db.Where("id = ?", token).Last(&ApiToken); apiToken.Error != nil {
			if apiToken.RowsAffected == 0 {
				c.Set("user", nil)
			} else {
				if ApiToken.ExpiredAt.Before(time.Now()) {
					c.Set("user", nil)
				}
				user := db.Where("id = ?", ApiToken.UserId).First(&User)
				if user.Error != nil {
					panic(user.Error)
				} else {
					c.Set("user", User)
					duration, _ := time.ParseDuration("30m")
					newTIme := ApiToken.ExpiredAt.Add(duration)
					db.Model(&ApiToken).Update("expired_at", newTIme)
				}

			}
		} else {
			panic(apiToken.Error)
		}
		c.Next()
	}
}
