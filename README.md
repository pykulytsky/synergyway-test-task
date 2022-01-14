# Synergyway test task

## How to deploy using docker-compose

1. Clone this repository
```
git clone https://github.com/pykulytsky/synergyway-test-task.git
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
*If this command causes an error, please move to the next step, stop Docker Compose after a few seconds and do this step again.*

5. Deploy using Docker Compose
```
docker-compose up
```
