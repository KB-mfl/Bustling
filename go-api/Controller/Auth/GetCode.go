package Auth

import "github.com/gin-gonic/gin"

/**
 * @api {POST} auth/code 获取验证码-GetCode
 * @apiGroup Auth
 * @apiName GetCode
 * @apiPermission All
 * @apiParam {string} email 验证邮箱
 * @apiParamExample {json} Request-Example:
 * {
 *      'email': 'haha@example.com'
 * }
 * @apiError {string} failed 获取失败
 * @apiErrorExample {json} 403:
 * {
 *      'message': '请不要频繁发送信息哦'
 * }
 */

func GetCode(c *gin.Context)  {

}
