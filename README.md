
# Inventory Search Project

## Overview

This is a simple fullstack project for **Inventory Search**, built using **Vanilla JavaScript**, **NodeJS**, **ExpressJs**. It allows users to search and filter the products in a clean and responsive interface.

The application follows a clean architecture for a simple search feature implementation.

<br>

## Key Features
- Search products by name (case-insensitive)
- Filter products by category
- Filter products by price range
- Error handling for invalid price inputs
- Responsive UI
- Fullstack integration (Frontend + Backend)

<br>


## Tech Stack

* HTML
* CSS
* JS
* NodeJs
* ExpressJs

<br>

## Project Structure

```text
inventory-search-project/
|---backend/
|   |---data/
|   |   |---inventory.json      # To store the inventory data
|   |
|   |---server.js               # Entry point for backend
|   |---package.json
|
|---frontend/
|   |---index.html             # main html file 
|   |---script.js              # Used to fetch and display the products dynamically
|   |---styles.css             # Used to apply the CSS to html 
|
|---.gitignore                 # Used to ignore the files and modules
|---README.md

```
<br>

## Prerequisites
### Make sure you have installed:
* Node.js (v14 or higher)
* npm (comes with node)


<br>

## Setup Instructions
### 1. Clone the Repository
```bash
git clone https://github.com/BommishettyVamshi/inventory-search-project

cd inventory-search-project

```

<br>

## Backend Setup
### 2. Navigate to Backend Folder
```bash
cd backend
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Backend Server
```bash
node server.js
or 
npm start
```
**Server will run on:**  
```http://localhost:5000```

<br>

## Frontend Setup
### 5. Navigate to Frontend Folder
```bash
cd ../frontend
```

### 6. Run Frontend
* **Open Directly :**
    * Just open index.html in your browser
* **Use Live Server(if using VS Code):**
    * Install Live Server extension
    * Right-Click on ```index.html```
        
    * Click "Open with Live Server"

<br>

## API EndPoint
### Frontend will call Backend using this API:

```bash
http://localhost:5000/search?q=&category=&minPrice=&maxPrice=
```

```q : search query(product name) ```

``` category: product category ```

``` minPrice: minimum price range of the product ```

```maxPrice: maximum price range of the product ```


<br>

## Data File
### Inventory data is stored in:
```bash
backend/data/inventory.json
```
* You can modify this file to test different data.


<br>

## Search Logic :
### The application implements filtering logic to inventory products using the fileter method by applying the necessary filters such as :
* **q (search query):**
    * Implemented case insensitive by converting both the query and product name from inventory data to lowercase
    * The API will filter the products based on search query if it is not empty otherwise it will return all products

* **category :**
    * The API will filter the products based on category if it is not empty otherwise it will return all category products
* **minPrice and maxPrice :** 
    * The API will filter the products in the range of minPrice and maxPrice if the range (minPrice, maxPrice) is valid.
    * If the minPrice > maxPrice the API will throw an error with message as :
        * minPrice cannot be greater than maxPrice

<br>

## Published APIs:

### Frontend API:
```bash
https://inventory-search-project-six.vercel.app/
```

### Backend API:
```bash
https://inventory-search-project-y75r.onrender.com/search
```

<br>

## Feature Improvements
### 1. Use Persistent Storage (Database)
#### Currently project using the json file as the inventory data , for scaling we can use the database SQL/NoSQL to persistently store and manage the inventory data.

### 2. Pagination 
#### Currently project will display all the products in the frontend but it will cause performance issue if the data is large or having huge products. To handle it we can implement the pagination , where we can display the products for the current window size of the device/browser
