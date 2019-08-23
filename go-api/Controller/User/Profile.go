package User

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
)

/**
 * @api {GET} user/profile/:user_id 获取用户信息-GetProfile
 * @apiGroup User
 * @apiName Profile
 * @apiPermission All
 * @apiSuccess {string} username 用户名
 * @apiSuccess {string} avatar 头像
 * @apiSuccess {string} email 邮箱
 * @apiSuccess {integer} gender 性别
 * @apiSuccess {json} role 角色
 * @apiSuccess {text} introduction 简介
 * @apiSuccess {string} created_at 用户创建时间
 * @apiSuccessExample {json} Success-Example:
 * {
 *      'username': 'test',
 *      'avatar': 'picture.png',
 *      'email': 'haha@example.com',
 *      'gender': 1,
 *      'role': {
 *          'roleId': 1,
 *          'alias': 'admin',
 *          'name': '管理员',
 *      },
 *      'introduction': 'this is a good people',
 *      'created_at': 'created_at': '2019-09-24T17:43:11+08:00',
 * }
 */

func Profile(c *gin.Context)  {
	db := Orm.GetDB()
	otherUserId := c.Param("user_id")
	var user Model.User
	if err := db.Where("id=?", otherUserId).First(&user).Error; err != nil {
		panic(err)
	}
	c.JSON(200, user.GetData("profile"))
}
