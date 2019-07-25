<?php
/**
 * Created by PhpStorm.
 * User: gry
 * Date: 25/07/2019
 * Time: 19:52
 */
namespace App\Http\Controllers\File;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Mimey\MimeTypes;
use PascalDeVink\ShortUuid\ShortUuid;

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

class Upload extends Controller {

    function handle(Request $request) {
        $this->validate($request, [
            'file' => 'file|required',
        ]);

        $file = $request->file('file');
        $size = round($file->getSize() / 10000000);

        if ($size > 3) {
            return parent::error(422, '文件过大了哦');
        }
        $filename = ShortUuid::uuid4();
        $mimeType = $file->getMimeType();

        $mimes = new MimeTypes();
        $extension = $mimes->getExtension($mimeType);
        $file->move(storage_path('app/public/resource'), "$filename.$extension");

        return response([
            'filename' => "$filename.$extension",
        ]);
    }
}