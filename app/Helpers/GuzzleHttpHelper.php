<?php

namespace App\Helpers;

use App\Helpers\UtilHelper as Util;

class GuzzleHttpHelper
{

    public static function postRequest($url,$request,$type = 'POST'){

        try{
 
            $params = $request->all();

            $token = $request->bearerToken();

            $client = new \GuzzleHttp\Client(['http_errors' => false]);
                        
            $request_id = Util::generateString(true);

            $headers = [     
                'Authorization' => 'Bearer ' . $token,
                'Content-Type'  => 'application/json',
                'x-request-id' => $request_id
            ];
            $response = $client->request($type, $url,['json'=> $params,'headers' => $headers]);

            //print_r($response);die;
            return json_decode($response->getBody(),true);
        }
        catch (Guzzle\Http\Exception\ClientErrorResponseException $e) {

            $req = $e->getRequest();
            $resp =$e->getResponse();
            displayTest($req,$resp);
        }
        catch (Guzzle\Http\Exception\ServerErrorResponseException $e) {

            $req = $e->getRequest();
            $resp =$e->getResponse();
            displayTest($req,$resp);
        }
        catch (Guzzle\Http\Exception\BadResponseException $e) {

            $req = $e->getRequest();
            $resp =$e->getResponse();
            displayTest($req,$resp);
        }
        catch( Exception $e){
            echo "AGH!";
        }

        
       
    }
}

?>