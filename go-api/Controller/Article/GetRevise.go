package Article

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
)

/**
 *@api {GET} article/revise/:article_id 获取修改文章-GetRevise
 *@apiGroup Article
 *@apiName GetRevise
 *@apiPermission User
 * @apiSuccess {string} id 文章id
 * @apiSuccess {string} title 文章标题
 * @apiSuccess {string} tags 文章标签
 * @apiSuccess {string} article_type 文章类型
 * @apiSuccess {text} raw_article 文章内容
 * @apiSuccessExample {json} Success-Example:
 * 	{
 *      'id': '2345342817-bc97-4e75-b8cd-a1b5e91cda2f',
 *      'title': '哇哈哈',
 *      'tags': '牛奶/儿童饮料',
 * 		'article_type': 'life',
 * 		'raw_content': '假装这是raw格式的数据'
 * 	},
 */

func GetRevise(c *gin.Context)  {
	_user,_ := c.Get("user")
	if _user == nil {
		c.AbortWithStatus(401)
		return
	}
	user := _user.(Model.User)
	articleId := c.Param("article_id")
	db := Orm.GetDB()
	var article Model.Article
	if err := db.Where("id=?", articleId).First(&article).Error; err != nil {
		panic(err)
	}
	if article.UserId != user.ID {
		c.JSON(403,gin.H{"message":"这不是您的文章哦"})
		return
	}
	c.JSON(200, article.GetData("revise"))
}
