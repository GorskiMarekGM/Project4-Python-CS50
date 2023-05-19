install:
#install commands
	python3 -m pip install --upgrade pip &&\
		pip install -r requirements.txt
format:
#format code
	black *.py network/*.py project4/*.py
lint:
#flake8 pylint
	pylint --disable=R,C *.py network/*.py project4/*.py
test:
#test

all: install lint test deploy