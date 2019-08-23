package Article

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
)

/**
 * @api {GET} article/detail/:article_id 获取文章-GetDetail
 * @apiGroup Article
 * @apiName GetDetail
 * @apiPermission All
 * @apiSuccess {string} user_id 作者id
 * @apiSuccess {string} id 文章id
 * @apiSuccess {string} title 文章标题
 * @apiSuccess {string} tags 文章标签
 * @apiSuccess {string} article_type 文章类型
 * @apiSuccess {text} html_article 文章内容
 * @apiSuccess {int} views 观看数
 * @apiSuccess {int} reviewed 是否通过审核
 * @apiSuccess {string} created_at 文章创建时间
 * @apiSuccess {string} updated_at 文章更新时间
 * @apiSuccessExample {json} Success-Example:
 * 	{
 *      'user_id': '22a52817-bc97-4e75-b8cd-a1b5e91cda2f',
 *      'id': '2345342817-bc97-4e75-b8cd-a1b5e91cda2f',
 *      'title': '哇哈哈',
 *      'tags': '牛奶/儿童饮料',
 * 		'article_type': 'life',
 * 		'html_content': '<p>这是最简单的一篇文章</p>'
 *      'updated_at': '2019-08-15T19:53:21+08:00',
 *      'created_at': '2019-09-24T17:43:11+08:00'
 * 	},
 */

func GetDetail(c *gin.Context)  {
	_user,_ := c.Get("user")
	articleId := c.Param("article_id")
	db := Orm.GetDB()
	var article Model.Article
	if _user != nil {
		if err := db.Where("id=?", articleId).First(&article).Error; err != nil {
			panic(err)
		}
	} else {
		if err := db.Where("id=?", articleId).Where("reviewed=?", 1).
			First(&article).Error; err != nil {
			panic(err)
		}
	}

	c.JSON(200, article.GetData("detail"))
}
