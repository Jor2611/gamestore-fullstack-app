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

* **client** (**Planned**): This directory (to be added later) will house the client-side frontend code, responsible for the user interface and user interactions within the game store application.
* **basement** (**ReactJS** with **Chakra UI**): Implements the admin panel ("basement") for managing games, users, keys, and other aspects of the store.
* **backend** (**NestJS**): Contains the backend logic for the game store, handling database interactions, game management, user authentication, and other functionalities.
* **database**: The application utilizes PostgreSQL as its primary database for storing game information, user data, and other relevant game store details.

**Structure Notice**

In a real-world scenario, it's recommended to maintain separate repositories for the backend, admin panel (basement), and client-side frontend for better organization, scalability, and independent deployments. However, for this early development stage, keeping everything in a single repository simplifies the setup process.