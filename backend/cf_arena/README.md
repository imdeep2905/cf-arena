# CP-Arena | Backend
This contains backend for CP-Arena made with ```django```.
# Instructions
1. First install dependencies using command ```pip install -r requirements.txt```.
2. Migrate using command ```python manage.py migrate```.
3. Run the server using ```python manage.py runserver```.
4. Populate database using ```PUT``` request on end-point ```http://127.0.0.1:8000/arena/all_problems_update/``` (After running first time you can run this whenever you want to update the databse. For example when new problems are added in codeforces). For example to populate databse with ```CURL``` you can use command ```curl --location --request PUT http://127.0.0.1:8000/arena/all_problems_update/ ```.
5. Now you're good to go 🔥.
# API doumentation
### ```arena/all_problems_update/``` 
  - accepts = ```PUT```
  - This will update/create database which stores all thr problems available on codeforces.
### ```arena/verify_user/``` 
  - accepts = ```GET```
  - params = ```cf_handle```
  - This will return JSON:
     ```
        payload (dict) converted to JSON :
            - status (OK/FAILED)
            - rating (int)
            - profile_pic_url (str)
     ```
### ```arena/create_problems/``` 
  - accepts = ```GET```
  - params = ```cf_handle1``` and ```cf_handle2```.
  - This will return JSON:
     ```
        payload (dict) converted to JSON :
            - status (OK/FAILED)
            - problems (list of problems_urls)
     ```
### ```arena/create_room/``` 
  - accepts = ```POST```
  - params = ```cf_handle1``` and ```cf_handle2```.
  - This will return JSON:
     ```
        payload (dict) converted to JSON :
            - status (OK/FAILED)
            - room_id (unique id of the room)
     ```
