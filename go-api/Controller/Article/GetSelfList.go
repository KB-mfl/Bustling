package Article

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
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
 * @apiParam {int} [reviewed] 是否通过审核
 * @apiSuccess {int} total 总共文章数量
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
 * 		}
 *}
 */

func GetSelfList(c *gin.Context)  {
	userId,_ := uuid.FromString(c.Param("user_id"))
	_user, _ := c.Get("user")
	user := _user.(Model.User)
	if userId != user.ID {
		c.AbortWithStatus(403)
		return
	}
	var reviewed, _ = strconv.ParseInt(c.DefaultQuery("reviewed", "0"), 10, 8)
	var limit, _ = strconv.Atoi(c.DefaultQuery("limit", "7"))
	var offset, _ = strconv.Atoi(c.DefaultQuery("offset", "0"))
	var articles []Model.Article
	var db = Orm.GetDB()
	var count int
	db.Where("user_id=?", userId).Where("reviewed=?", reviewed).Find(&articles).Count(&count)
	if err := db.Where("user_id=?", userId).Where("reviewed=?", reviewed).Offset(offset).Limit(limit).
		Order("updated_at desc").Find(&articles).Error; err != nil {
		panic(err)
	}
	var response []interface{}
	for _, article := range articles {
		response = append(response, article.GetData("list"))
	}
	c.JSON(200, gin.H{
		"data": response,
		"total": count,
	})
}
