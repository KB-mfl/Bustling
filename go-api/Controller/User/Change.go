package User

import "github.com/gin-gonic/gin"

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

func Change(c *gin.Context)  {

}
