package Article

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
	"strconv"
)

/**
 * @api {GET} article/list/:articleType 获取文章列表-GetList
 * @apiGroup Article
 * @apiName GetList
 * @apiPermission All
 * @apiParam {string} [articleType] 文章类型
 * @apiParam {int} [limit]
 * @apiParam {int} [offset]
 * @apiParam {int} total 文章总数
 * @apiParam {int} reviewed 文章审核
 * @apiSuccess {string} user_id 作者id
 * @apiSuccess {string} id 文章id
 * @apiSuccess {string} article_type 文章类型
 * @apiSuccess {string} title 文章标题
 * @apiSuccess {string} tags 文章标签
 * @apiSuccess {int} views 观看数
 * @apiSuccess {int} reviewed 是否通过审核
 * @apiSuccess {string} created_at 文章创建时间
 * @apiSuccess {string} updated_at 文章更新时间
 * @apiSuccessExample {json} Success-Example:
 *{
 *		'total': 12,
 *		{
 * 			{
 *      		'user_id': '22a52817-bc97-4e75-b8cd-a1b5e91cda2f',
 *      		'id': '2345342817-bc97-4e75-b8cd-a1b5e91cda2f',
 *      		'title': '哇哈哈',
 *      		'tags': '牛奶/儿童饮料',
 *				'views': 2,
 *				'reviewed': 1,
 *				'article_type': 'life',
 *      		'updated_at': '2019-08-15T19:53:21+08:00',
 *      		'created_at': '2019-09-24T17:43:11+08:00'
 * 			},
 * 			{
 *      		'user_id': '22a52817-bc97-4e75-b8cd-a1b5e91cda2f',
 *      		'id': '2345342817-bc97-4e75-b8cd-a1b5e91cda2f',
 *      		'title': '哇哈哈',
 *      		'tags': '牛奶/儿童饮料',
 * 				'views': 0
 *				'reviewed': -1,
 *				'article_type': 'study',
 *      		'updated_at': '2019-08-15T19:53:21+08:00',
 *      		'created_at': '2019-09-24T17:43:11+08:00'
 * 			}
 *		}
 *}
 */

func GetList(c *gin.Context)  {
	var articleType = c.Param("articleType")
	var limit, _ = strconv.Atoi(c.DefaultQuery("limit", "7"))
	var offset, _ = strconv.Atoi(c.DefaultQuery("offset", "0"))
	var reviewed, _ = strconv.Atoi(c.DefaultQuery("reviewed", "1"))
	var articles []Model.Article
	var count int
	db := Orm.GetDB()

	_user, _ := c.Get("user")
	user := _user.(Model.User)
	if _user == nil {
		reviewed = 1
	} else {
		if user.RoleId != 2 {
			reviewed = 1
		}
	}

	if articleType != "all" {
		db.Where("article_type=?", articleType).Where("reviewed=?", reviewed).Find(&articles).Count(&count)
		if db.Where("article_type=?", articleType).Where("reviewed=?", reviewed).Limit(limit).
			Offset(offset).Order("updated_at desc").Find(&articles).Count(&count).RecordNotFound() {
			return
		}
	} else {
		db.Where("reviewed=?", reviewed).Find(&articles).Count(&count)
		if db.Where("reviewed=?", reviewed).Offset(offset).Limit(limit).
			Order("updated_at desc").Find(&articles).RecordNotFound() {
			return
		}
	}
	var response []interface{}
	for _, article := range articles {
		response = append(response, article.GetData("list"))
	}
	c.JSON(200, gin.H{
		"articles": response,
		"total": count,
	})
}
