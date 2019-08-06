package Route

import (
	"Bustling/go-api/Boot/Http"
	"Bustling/go-api/Controller/Auth"
	"Bustling/go-api/Controller/File"
	"Bustling/go-api/Controller/User"
	"github.com/gin-gonic/gin"
)

func AddApiRoute() {
	Http.Router.GET("/", func(c *gin.Context) {
		c.JSON(200 ,gin.H{
			"version": "v1.0",
		})
	})
	auth := Http.Router.Group("/auth")
	{
		auth.POST("register", func(c *gin.Context) {
			Auth.Register(c)
		})
		auth.POST("login", func(c *gin.Context) {
			Auth.Login(c)
		})
		auth.POST("code", func(c *gin.Context) {
			Auth.GetCode(c)
		})
		auth.GET("auth", func(c *gin.Context) {
			Auth.GetAuth(c)
		})
		auth.PUT("forgot", func(c *gin.Context) {
			Auth.Forgot(c)
		})
	}
	file := Http.Router.Group("")
	{
		file.POST("/upload", func(c *gin.Context) {
			File.Upload(c)
		})
	}
	user := Http.Router.Group("/user")
	{
		user.PUT("/profile", func(c *gin.Context) {
			User.Change(c)
		})
		user.PUT("security", func(c *gin.Context) {
			User.ResetPassword(c)
		})
	}
}
