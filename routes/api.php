<?php

use App\Http\Controllers\api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\api\CertificateController;
use App\Http\Controllers\api\EducationController;
use App\Http\Controllers\api\ExperienceController;
use App\Http\Controllers\api\ProjectController;
use App\Http\Controllers\api\SkillController;
use App\Http\Controllers\api\SocialController;
use App\Http\Controllers\api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::post('/register', [AuthController::class, 'makeUser']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/admin/store', [AdminController::class, 'store']);
    Route::put('/admin/update/{admin}', [AdminController::class, 'update']);
    Route::delete('/admin/delete/{admin}', [AdminController::class, 'destroy']);

    Route::post('/certificate/store', [CertificateController::class, 'store']);
    Route::put('/certificate/update/{certificate}', [CertificateController::class, 'update']);
    Route::delete('/certificate/delete/{certificate}', [CertificateController::class, 'destroy']);

    Route::post('/education/store', [EducationController::class, 'store']);
    Route::put('/education/update/{education}', [EducationController::class, 'update']);
    Route::delete('/education/delete/{education}', [EducationController::class, 'destroy']);

    Route::get('/isadmin', [UserController::class, 'index']);

    Route::post('/experience/store', [ExperienceController::class, 'store']);
    Route::put('/experience/update/{experience}', [ExperienceController::class, 'update']);
    Route::delete('/experience/delete/{experience}', [ExperienceController::class, 'destroy']);

    Route::post('/project/store', [ProjectController::class, 'store']);
    Route::put('/project/update/{project}', [ProjectController::class, 'update']);
    Route::delete('/project/delete/{project}', [ProjectController::class, 'destroy']);

    Route::post('/skill/store', [SkillController::class, 'store']);
    Route::put('/skill/update/{skill}', [SkillController::class, 'update']);
    Route::delete('/skill/delete/{skill}', [SkillController::class, 'destroy']);

    Route::post('/social/store', [SocialController::class, 'store']);
    Route::put('/social/update/{social}', [SocialController::class, 'update']);
    Route::delete('/social/delete/{social}', [SocialController::class, 'destroy']);
});

Route::get('/admins', [AdminController::class, 'index']);
Route::get('/certificates', [CertificateController::class, 'index']);
Route::get('/experiences', [ExperienceController::class, 'index']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/skills', [SkillController::class, 'index']);
Route::get('/socials', [SocialController::class, 'index']);
Route::get('/educations', [EducationController::class, 'index']);
Route::post('/login', [AuthController::class, 'login']);
