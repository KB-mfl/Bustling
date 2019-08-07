package User

import "github.com/gin-gonic/gin"

/**
 * @api {PUT} user/security 修改密码-ResetPassword
 * @apiGroup User
 * @apiName ResetPassword
 * @apiPermission Login
 * @apiParam {string} password_old 旧密码
 * @apiParam {string} password_new 新密码
 * @apiParamExample {json} Request-Example:
 * {
 *      'password_old': 'ce8749330e860006d92f26528071b26bc93d234d',
 *      'password_new': 'dc89fbb8f0bdb28a3755743032f8ab05f0e0b77d'
 * }
 */

func ResetPassword(c *gin.Context)  {

}
