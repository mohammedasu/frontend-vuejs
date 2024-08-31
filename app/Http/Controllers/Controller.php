<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Validator;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function response($return)
    {
        //$return['request_id'] = AppLog::getRequestId();
        if (isset($return['http_code'])) {
            $http_code = $return['http_code'];
            unset($return['http_code']);
        } else {
            $http_code = 200;
        }

        return response()->json($return, $http_code);
    }
}
