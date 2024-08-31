<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('layouts.index');
});

Route::get('/privacy-policy', function () {
    return view('layouts.privacy-policy');
});

Route::get('/community-standards', function () {
    return view('layouts.community-standards');
});

Route::get('/data-policy', function () {
    return view('layouts.data-policy');
});

Route::get('/terms-of-service', function () {
    return view('layouts.terms-of-service');
});

Route::get('/comingsoon', function () {
    return view('layouts.blog');
});

Route::get('/launch', function () {
    return view('layouts.launch');
});

Route::get('/login', function () {
    return view('layouts.dpn.login.index');
});
Route::get('/resetpassword/{token}', function () {
    return view('layouts.dpn.resetpassword.indexpassword');
})->name('reset.password');
Route::get('/resetpassword', function () {
    return view('layouts.dpn.resetpassword.index');
})->name('forgot.password');

Route::get('/verify/{user_ref_no}', function () {
    return view('layouts.dpn.verify.index');
})->name('email.verify');

Route::get('/signup', function () {
    return view('layouts.dpn.signup.index');
});

Route::get('/{any}', 'DashboardController@index')->where('any', '.*');
