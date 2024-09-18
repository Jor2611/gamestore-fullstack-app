## GameStore FullStack App - Shop for Gamers (Early Stage)

This repository houses the backend and admin panel (basement) for a game store application, empowering administrators to manage a thriving digital marketplace for gamers. It's currently under development, with the client-side frontend to be implemented in the future.

**Key Features (Admin Panel)**

* **Game Management:** Effortlessly add new games to the store, providing comprehensive details and captivating descriptions.
* **Platform-Specific Key Generation:** Generate unique activation keys for different gaming platforms, ensuring seamless access for your customers.
* **User Management:** Create and manage user accounts, facilitating a smooth purchasing experience.

**Client Experience (Planned)**

* **Game Browsing and Selection:** Users will explore a user-friendly interface to discover and choose the games they desire.
* **Secure Purchase Process:** Implement a secure payment gateway to enable convenient game purchases.
* **Key Retrieval:** Upon purchase, users will receive the relevant activation key for their chosen platform.

**Project Structure**

* **ingress** (**Nginx**): This is used only for the Docker Compose setup. It's a simple Nginx reverse proxy server that routes requests to components inside the Docker Compose network.
* **client** (**Planned**): This directory (to be added later) will house the client-side frontend code, responsible for the user interface and user interactions within the game store application.
* **basement** (**ReactJS** with **Chakra UI**): Implements the admin panel ("basement") for managing games, users, keys, and other aspects of the store.
* **backend** (**NestJS**): Contains the backend logic for the game store, handling database interactions, game management, user authentication, and other functionalities.
* **database**: The application utilizes PostgreSQL as its primary database for storing game information, user data, and other relevant game store details.


## Teaser
To see current stage of the application follow the steps below. 

### Prerequisites

- Docker & Docker Compose.

### Installation

1. **Clone the Repository.**
      ```bash
      git clone <repository_url>
      ```
      **OR**: Just copy docker-compose.yaml

2. **Create .env file in same directory with docker-compose.yaml**
    ```bash
      NODE_ENV=docker
      PORT=3000
      PG_HOST=postgres
      PG_PORT=5432
      PG_USERNAME=[postgres-username]
      PG_PASSWORD=[postgres-password]
      PG_DATABASE=[postgres-dbname]
      TRX_LOCK_TIMEOUT=5s
      JWT_SECRET=[secret-for-jwt]
      JWT_EXPIRATION=30d
      JWT_ADMIN_EXPIRATION=4h
      JWT_REMEMBER_EXPIRATION=1y
      ALLOWED_ORIGINS=*
    ```

3. **Run Docker Compose**
      ```bash
      docker-compose up
      ```

4. **Generate an admin user**
      ```bash
      curl -X POST http://localhost:5000/api/account/basement \
        -H "Content-Type: application/json" \
        -d '{"email": "dummy@gmail.com", "password": "asd123456"}'
      ```

5. **Open page in browser**: http://localhost:5000

### Clean Up

1. **Shutdown Docker Compose**
     ```bash
      docker-compose down
     ```
     ***Attention***:Make sure to run command in the same directory as `docker-compose up`

2. **Remove Docker images**
      ```bash
      docker rmi jorakhachatryan/gamestore-ingress jorakhachatryan/gamestore-basement jorakhachatryan/gamestore-api -f
      ```

**Structure Notice**

In a real-world scenario, it's recommended to maintain separate repositories for the backend, admin panel (basement), and client-side frontend for better organization, scalability, and independent deployments. However, for this early development stage, keeping everything in a single repository simplifies the setup process.
