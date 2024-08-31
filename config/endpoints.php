<?php
    if (config('app.env') == 'local')
    {
        return [
            'api-url' => 'http://localhost/healwell24-dpn/public/api/v1/'
        ];
    }
    elseif (config('app.env') == 'development'){
        
        return [
            'api-url' => 'https://testapi.docscampus.com/api/v1/'
        ];
    }
    else {
        
        return [
            'api-url' => 'https://docscampus.com/api/v1/'
        ];
    }
?>