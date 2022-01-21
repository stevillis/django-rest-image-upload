## Image Upload using Django Rest Framework

* Requirements
    * Django 4.0.1
    * djangorestframework 3.13.1

```bash
pip install -r requirements.txt 
```

---

### Run

```shell
python manage.py migrate
python manage.py runserver
```

### Available endpoint

* <http://localhost:8000/images/>
    * POST
        * send an image in the body of the request

---