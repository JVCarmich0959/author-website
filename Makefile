.PHONY: install test lint format precommit

install:
	pip install -r requirements.txt
	npm install

lint:
	flake8 .
	black --check .
	isort --check .

format:
	black .
	isort .

test:
	npm test
	pytest

precommit:
	pre-commit run --all-files
