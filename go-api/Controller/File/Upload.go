package File

import "github.com/gin-gonic/gin"

/**
 * @api {POST} /upload 上传文件-File
 * @apiGroup File
 * @apiName Upload
 * @apiPermission All
 * @apiParam {file} file 小于3M
 * @apiSuccess {string} filename 文件名
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "filename": "xxx.png"
 * }
 */

func Upload(c *gin.Context)  {

}
