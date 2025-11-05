# Budgr 💰

Budgr is a personal finance management application designed to simplify tracking of **income, expenses, savings, and budgets**.  

This project was born out of the frustration of managing an overwhelming number of Excel sheets just to keep track of personal finances. Budgr simplifies the process and provides additional tools to make financial management easier and more efficient.

---

## Features

| Feature | Description |
|---------|-------------|
| **Income & Expense Tracking** | Easily log and categorize your finances. |
| **Savings Management** | Track your savings goals and progress. |
| **Budget Management** | Plan and monitor budgets for various categories. |
| **Wishlist with Price Checker** | Add items to your wishlist and compare prices to find the best deals. |
| **User Authentication** | Register and log in securely. |

**Planned Features**:
- Support for more brands in price checking.
- Fully responsive design for mobile devices.
- Ability to host the website online.

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Installation

Clone the repository:
```
git clone https://github.com/grekszadalma/budgr.git
cd budgr
```

### Start the application

```
docker compose up --build -d
```

Access the application via your browser at:
http://localhost:5173

### Register

Navigate to /register to create a new user.

### Login

Navigate to /login to log in with the previously created user.
