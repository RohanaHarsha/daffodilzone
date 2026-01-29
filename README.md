Welcome to the daffodilzone ! This project is designed to be easy to set up and run for development

## Table of Contents
- [Overview](#overview)
- [Setup Instructions](#setup-instructions)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)

## Overview
project consists of a **backend** built with Flask and a **frontend** powered by React.

## Setup Instructions
### 1. Install Requirements
Once the virtual environment is active, install all necessary Python packages using the **requirements.txt** file:
```bash
pip install -r requirements.txt
```

### 2. Split terminals 

- **Terminal 1:** navigate **backend folder**  
- **Terminal 2:** navigate **frontend folder**

### 3. Run the Backend
In **Terminal 1**, navigate to the **backend** folder:
```bash
cd backend
```

Start the Flask development server:
```bash
flask run
```

### 4. react app
In **Terminal 2**, navigate to the **frontend** folder:
```bash
cd frontend
```

Start the frontend application:
```bash
npm start
```


## Project Structure
```
daffodl-zone/
├── backend/         # Flask application code
│   └──  # Main Flask application files
├── frontend/        # Frontend application code
│   └── # Node.js project configuration
├── requirements.txt # Python dependencies
├── README.md        # This file
└── venv/            # Virtual environment (created after setup)

```
