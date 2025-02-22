
#  Sporty: Gear Up for Your Game
At Sporty, we bring you the finest collection of sports equipment and accessories to fuel your passion for sports. Whether you're a professional athlete or a weekend warrior, our platform is designed to meet all your sporting needs with ease and style.





# Live link

To Check this project out Visit

```http
https://endearing-platypus-f19714.netlify.app/
```


# Documentation

[Documentation](Assignment-Category-Lotus.pdf)


# API Reference

This API fetches and manipulates data stored in a MongoDB database. The data is hosted using a Node.js server.



#### Base URL
https://a-10-one.vercel.app/


---

## Endpoints

### 1. Get All Items
- **URL:** `/data`
- **Method:** `GET`
- **Description:** Fetch all items from the database.
- **Response Example:**
    ```json
    [
        {
            "_id": "64e12345abc67890",
            "name": "Football",
            "category": "Sports",
            "price": 50,
            "stock": 100
            .......
        },
        {
            "_id": "64e98765xyz43210",
            "name": "Basketball",
            "category": "Sports",
            "price": 30,
            "stock": 50
            ........
        }
    ]
    ```

---

### 2. Get Item by ID
- **URL:** `/data/:id`
- **Method:** `GET`
- **Description:** Fetch a single item using its unique ID.
- **Path Parameter:**
    - `id` (String): The ID of the item.
- **Response Example:**
    ```json
    {
        "_id": "64e12345abc67890",
        "name": "Football",
        "category": "Sports",
        "price": 50,
        "stock": 100
        ........
    }
    ```

---

### 3. Add New Item
- **URL:** `/data`
- **Method:** `POST`
- **Description:** Add a new item to the database.
- **Request Body Example:**
    ```json
    {
        "name": "Tennis Racket",
        "category": "Sports",
        "price": 100,
        "stock": 20
        ........
    }
    ```
- **Response Example:**
    ```json
    {
        "message": "Item added successfully",
        "item": {
            "_id": "64e54321opq76543",
            "name": "Tennis Racket",
            "category": "Sports",
            "price": 100,
            "stock": 20
            .......
        }
    }
    ```

---

### 4. Update an Item
- **URL:** `/data/:id`
- **Method:** `PUT`
- **Description:** Update an existing item by its ID.
- **Path Parameter:**
    - `id` (String): The ID of the item.
- **Request Body Example:**
    ```json
    {
        "price": 120,
        "stock": 25
        ......
    }
    ```
- **Response Example:**
    ```json
    {
        "message": "Item updated successfully",
        "updatedItem": {
            "_id": "64e12345abc67890",
            "name": "Football",
            "category": "Sports",
            "price": 120,
            "stock": 25
            ........
        }
    }
    ```



# Technologies Used

- **MongoDB**: Used as the database to host website data, providing flexible and scalable access to structured and semi-structured data.

- **Firebase**: Leveraged Firebase for efficient and secure authentication management, ensuring a seamless user login and registration experience.


- **Custom Node.js Server**: Built a tailored Node.js server to handle API requests, manage data interactions with MongoDB, and provide a robust backend for smooth client-server communication.

- **React**: JavaScript library for building user interfaces, providing reusable components for the application.

- **React Hooks (useState, useEffect)**: Utilized for managing component state and side effects, enhancing dynamic interactions.

- **React Router**: Seamlessly navigate across multiple pages in your app without reloading, making each interaction feel smooth and intuitive for users.

- **React DOM**: The bridge between React and the browser, allowing React to efficiently update and render UI components in response to state changes. It makes your app interactive by managing the DOM elements that users see and interact with.

- **React Toastify**: Used for displaying toast notifications for actions log in ,log out.

- **JavaScript (ES6)**: Core language for implementing business logic, API fetching, and event handling.

- **HTML5 & CSS3**: Structure and styling of components, with responsive design tailored through Tailwind CSS.

- **Tailwind CSS**: Utility-first CSS framework to style components with ease and efficiency.


- **Fetch API**: Asynchronous data fetching from mongodb through node.js server to dynamically load product data.

- **Context API**: Manage and share global state across components, allowing seamless access to gadget data and user preferences without prop drilling.
- **Lottie React**: Utilized the Lottie React library to integrate engaging and lightweight animations, enhancing the user experience with visually appealing, interactive elements.

- **React Tooltip**: Implemented React Tooltip for intuitive and responsive tooltips, providing contextual information seamlessly and improving usability.





# Features

- **Swiper slider**: Swiper slider is used to make a beautiful slider in Banner section.


- **Structured Navigation Bar**: The site features a user-friendly, responsive navbar that includes essential menu items like Home,add equipment,all equipment and favourite.

- **Dynamic Service Cards**: Product section displays products in a clean grid layout, with cards showcasing product images, names, prices, and a "Learn more" button for more information. 


- **Toast Notifications**: Inform users when they log in or log out ,makes the experience interactive and informative.


- **404 Page Handling**: A custom 404 error page ensures that users are notified if they try to navigate to an unavailable route or resource, improving site navigation.

- **Dynamic Page Titles**: The website dynamically changes the page title based on the active route, providing users with contextual information.

- **Private Routing**: Restrict access to specific pages based on user authentication status, ensuring only logged-in users can view protected routes.

