package User

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
)

/**
 * @api {PUT} user/profile 修改简介-Change
 * @apiGroup User
 * @apiName Change
 * @apiPermission User/Admin
 * @apiParam {string} [username] 用户名
 * @apiParam {string} [avatar] 头像
 * @apiParam {string} [introduction] 个人介绍
 * @apiParam {integer} [gender] 性别
 * @apiParamExample {json} Request-Example:
 * {
 *      'username': 'test',
 *      'avatar': 'example.png',
 *      'introduction': '我很帅',
 *      'gender': 1
 * }
 */

type ChangeValidate struct {
	Username 	 string `json:"username"`
	Avatar   	 string `json:"avatar"`
	Introduction string `json:"introduction"`
	Gender       int    `json:"gender"`
}

func Change(c *gin.Context)  {
	_user, _ := c.Get("user")
	if _user == nil {
		c.AbortWithStatus(401)
		return
	}
	user := _user.(Model.User)
	db := Orm.GetDB()
	var data ChangeValidate
	if err := c.ShouldBindJSON(&data); err != nil {
		panic(err)
	}
	if err := db.Model(&user).Updates(Model.User{
		Username: data.Username,
		Avatar: data.Avatar,
		Introduction: data.Introduction,
		Gender: data.Gender,
	}).Error; err != nil {
		panic(err)
	}
}
