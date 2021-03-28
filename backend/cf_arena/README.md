# CP-Arena | Backend
This contains backend for CP-Arena made with ```django```.
# Instructions
1. First install dependencies using command ```pip install -r requirements.txt```.
2. Migrate using command ```python manage.py migrate```.
3. Populate database using ```PUT``` request on end-point ```http://127.0.0.1:8000/arena/all_problems_update/``` (After running first time you can run this whenever you want to update the databse. For example when new problems are added in codeforces). For example to populate databse with ```CURL``` you can use command ```curl --location --request PUT http://127.0.0.1:8000/arena/all_problems_update/ ```.
4. Run the server using ```python manage.py runserver```.
5. Now you're good to go 🔥.
