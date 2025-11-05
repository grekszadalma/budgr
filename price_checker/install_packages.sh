#!/bin/bash

# Update pip
python3 -m pip install --upgrade pip

# Install Python packages
pip install flask flask-cors requests beautifulsoup4 playwright selenium webdriver-manager

# Install Playwright browsers
playwright install

echo "✅ All packages installed and Playwright browsers are set up."
