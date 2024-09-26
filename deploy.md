## frontend
```
cd admin-frontend
docker build -t admin-frontend .

docker run -d -p 80:80 admin-frontend
```
## backend
```
cd backend-directory
docker build -t backend .

docker run -d -p 3009:3009 backend
```