**Gratitude Evaluation Test Repo**
<br>
Submission for Laravel Dev Position. Follow the steps below to be able to test and evaluate
the work completed. Pull repo from current location on github
<br>
1. Install php dependencies while in the repo folder on your local machine.<br>
``composer install``
2. Install node dependencies.<br>
``npm install``
3. Compile Assets for the frontend.<br>
``npm run prod``
4. Create a database in mysql.
5. Copy the .env.example file onto .env <br>
``cp .env.example .env``
6. Generate the laravel application key<br>
``php artisan key:generate``
7. Add the database details for the database created in **step 4**.
8. Run App Migrations and Seeds with the following commands<br>
``php artisan migrate``
<br>
``php artisan db:seed``
9. Run laravel using ``php artisan serve`` navigate to the url shown and create a user to begin using the app.
