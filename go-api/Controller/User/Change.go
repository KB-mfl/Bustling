package User

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"fmt"
	"github.com/gin-gonic/gin"
)

/**
 * @api {PUT} user/profile 修改简介-Change
 * @apiGroup User
 * @apiName Change
 * @apiPermission Login
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
	userEmail, _ := c.Get("user")
	db := Orm.GetDB()
	var user Model.User
	if db.Where("email=?", userEmail).First(&user).RecordNotFound() {
		c.AbortWithStatus(401)
	}
	var data ChangeValidate
	if err := c.ShouldBindJSON(&data); err != nil {
		panic(err)
	}
	var username, avatar, introduction string
	var gender int
	if data.Username != "" {
		username = data.Username
	} else {
		username = user.Username
	}
	if data.Avatar != "" {
		avatar = data.Avatar
	} else {
		avatar = user.Avatar
	}
	if data.Introduction != "" {
		introduction = data.Introduction
	} else {
		introduction = user.Introduction
	}
	fmt.Println(data.Gender)
	if data.Gender != 0 {
		gender = data.Gender
	} else {
		gender = user.Gender
	}
	db.Model(&user).Updates(Model.User{
		Username: username,
		Avatar: avatar,
		Introduction: introduction,
		Gender: gender,
	})
}