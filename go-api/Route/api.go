package Route

import (
	"Bustling/go-api/Boot/Http"
	"Bustling/go-api/Controller/Article"
	"Bustling/go-api/Controller/Auth"
	"Bustling/go-api/Controller/Comment"
	"Bustling/go-api/Controller/File"
	"Bustling/go-api/Controller/User"
	"Bustling/go-api/Middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func AddApiRoute() {
	Http.Router.Use(Middleware.AuthServiceProvider())
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Api_Token", "x-requested-with"}
	Http.Router.Use(cors.New(config))
	Http.Router.GET("/", func(c *gin.Context) {
		c.JSON(200 ,gin.H{
			"version": "v1.0",
		})
	})
	auth := Http.Router.Group("/auth")
	{
		auth.POST("register", Auth.Register)

		auth.POST("login", Auth.Login)

		auth.POST("code", Auth.GetCode)

		auth.GET("auth", Auth.GetAuth)

		auth.PUT("forgot", Auth.Forgot)
	}
	file := Http.Router.Group("/")
	{
		file.POST("upload", File.Upload)
	}
	user := Http.Router.Group("/user")
	{
		user.PUT("profile", User.Change)

		user.PUT("security", User.ResetPassword)

		user.GET("profile/:user_id", User.Profile)
	}
	article := Http.Router.Group("/article")
	{
		article.POST("/", Article.Create)

		article.GET("list/:articleType", Article.GetList)

		article.GET("self_list/:user_id", Article.GetSelfList)

		article.GET("detail/:article_id", Article.GetDetail)

		article.GET("revise/:article_id", Article.GetRevise)

		article.POST("reviewed", Article.ReviewedArticle)

		article.DELETE("delete/:article_id", Article.Delete)

		article.PUT("change/:article_id", Article.Change)

		article.POST("like", Article.Like)

		article.DELETE("unlike", Article.UnLike)

		article.PUT("view/:article_id", Article.View)

		article.GET("islike/:article_id", Article.IsLike)
	}
	comment := Http.Router.Group("/comment")
	{
		comment.POST("/", Comment.Create)

		comment.DELETE("/:comment_id", Comment.Delete)
	}
}
