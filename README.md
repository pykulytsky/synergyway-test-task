# Synergyway test task

## How to deploy using docker-compose

1. Clone this repository
```
git clone {link}
```
2. Change your directory to project directory 
```
cd synergyway-test-task
```
3. Build images
```
docker-compose build
```
4. Migrate Django db
```
docker-compose run backend poetry run migrate
```
5. Deploy using Docker Compose
```
docker-compose up
```
