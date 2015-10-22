# inventory
inventory management system for MakerBar space

# quickstart
## install django 1.8.4 (be sure to use python 2)

pip install -r requirements.txt

## install js / css build tools

make init

make dev

## make the django db

./manage.py dev makemigrations

./manage.py dev migrate



## run the server

./manage.py dev runserver
