<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name'=>'yazan',
            'email'=>'yazan.kh.anam@gmail.com',
            'password'=>'123123123',
            'is_admin'=>true,
            'image'=>"null"
        ]);
    }
}
