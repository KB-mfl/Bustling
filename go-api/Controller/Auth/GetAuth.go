package Auth

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
)

/**
 * @api {GET} auth/auth 获取用户信息-GetAuth
 * @apiGroup Auth
 * @apiName GetAuth
 * @apiPermission All
 * @apiSuccess {string} username 用户名
 * @apiSuccess {string} avatar 头像
 * @apiSuccess {string} email 邮箱
 * @apiSuccess {integer} gender 性别
 * @apiSuccess {json} role 角色
 * @apiSuccess {text} introduction 简介
 * @apiSuccessExample {json} Success-Example:
 * {
 *      'username': 'test',
 *      'avatar': 'picture.png',
 *      'email': 'haha@example.com'
 *      'gender': 1
 *      'role': {
 *          'roleId': 1,
 *          'alias': 'admin',
 *          'name': '管理员',
 *      }
 *      'introduction': 'this is a good people'
 * }
 */

func GetAuth(c *gin.Context)  {
	userId, _ := c.Get("user")
	if userId == nil {
		c.AbortWithStatus(401)
		return
	}
	db := Orm.GetDB()
	var user Model.User
	if db.Table("user").Where("id=?", userId).First(&user).RecordNotFound() {
		c.JSON(404, gin.H{"message":"该用户找不到了哦"})
		return
	}
	c.JSON(200, user.GetData("detail"))
}
