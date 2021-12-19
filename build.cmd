@echo off 

if [%1]==[] (
    echo "Usage: build.cmd <version>"
) else (
    docker build -t saramorillon/mini-git .
    docker image tag saramorillon/mini-git saramorillon/mini-git:%1
    docker push -a saramorillon/mini-git
)
