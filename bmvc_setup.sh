docker build -t bimagemdocker
docker run --name bconteiner -p 8080:8080 -v$(pwd):/ bcontainer bimagemdocker 