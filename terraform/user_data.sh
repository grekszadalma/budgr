#!/bin/bash
set -e

# Update
apt update -y

# Install Docker + Git
apt install -y docker.io docker-compose git

# Start Docker
systemctl enable docker
systemctl start docker

# Allow ubuntu user to use Docker
usermod -aG docker ubuntu

# Go to home
cd /home/ubuntu

# Clone repo (only if not exists)
if [ ! -d "app" ]; then
  git clone https://github.com/grekszadalma/budgr.git app
fi

cd app

# Checkout correct branch
git checkout release/v1.0.0
git pull origin release/v1.0.0

# Run containers
docker-compose down || true
docker-compose up -d --build