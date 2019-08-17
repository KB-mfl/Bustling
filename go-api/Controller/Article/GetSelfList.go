package Article

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"fmt"
	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
	"strconv"
)

/**
 * @api {GET} article/self_list/:user_id 获取自己文章列表-GetSelfList
 * @apiGroup Article
 * @apiName GetSelfList
 * @apiPermission User
 * @apiParam {string} [articleType] 文章类型
 * @apiParam {int} [limit]
 * @apiParam {int} [offset]
 * @apiSuccess {string} user_id 作者id
 * @apiSuccess {string} id 文章id
 * @apiSuccess {string} article_type 文章类型
 * @apiSuccess {string} title 文章标题
 * @apiSuccess {string} tags 文章标签
 * @apiSuccess {int} views 观看数
 * @apiSuccess {bool} reviewed 是否通过审核
 * @apiSuccess {string} created_at 文章创建时间
 * @apiSuccess {string} updated_at 文章更新时间
 * @apiSuccessExample {json} Success-Example:
 *{
 *
 * 		{
 *      	'user_id': '22a52817-bc97-4e75-b8cd-a1b5e91cda2f',
 *      	'id': '2345342817-bc97-4e75-b8cd-a1b5e91cda2f',
 *      	'title': '哇哈哈',
 *      	'tags': '牛奶/儿童饮料',
 *			'views': 2,
 *			'reviewed': true,
 *			'article_type': 'life',
 *      	'updated_at': '2019-08-15T19:53:21+08:00',
 *      	'created_at': '2019-09-24T17:43:11+08:00'
 * 		},
 * 		{
 *      	'user_id': '22a52817-bc97-4e75-b8cd-a1b5e91cda2f',
 *      	'id': '2345342817-bc97-4e75-b8cd-a1b5e91cda2f',
 *      	'title': '哇哈哈',
 *      	'tags': '牛奶/儿童饮料',
 * 			'views': 0
 *			'reviewed': false,
 *			'article_type': 'study',
 *      	'updated_at': '2019-08-15T19:53:21+08:00',
 *      	'created_at': '2019-09-24T17:43:11+08:00'
 * 		}
 *}
 */

func GetSelfList(c *gin.Context)  {
	userId,_ := uuid.FromString(c.Param("user_id"))
	authId, _ := c.Get("user")
	if userId != authId.(uuid.UUID) {
		c.AbortWithStatus(403)
		return
	}
	var limit, _ = strconv.Atoi(c.DefaultQuery("limit", "7"))
	fmt.Println(limit)
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
