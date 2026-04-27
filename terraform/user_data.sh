#!/bin/bash
apt update -y
apt install docker.io docker-compose -y
systemctl start docker
systemctl enable docker

git clone https://github.com/TON_REPO.git app
cd app

docker-compose up -d --build