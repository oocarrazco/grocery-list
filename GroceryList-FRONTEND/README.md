# GroceryList

This project was created using [Angular CLI](https://github.com/angular/angular-cli) version 19.1, .NET version 8.0, and SQL Server.

This project is also containerized using Docker


## To Run the Project

1. **Clone or Pull the Repository**  
   Use the following command to clone the repository:  
   ```bash
   git clone https://github.com/oocarrazco/GroceryList.git
   ```

   Or pull the latest changes if you already have the repository:

    ```bash
   git pull origin main
   ```

2. **Set Up Environment Variables**

    - Rename the .env.example file to .env:

    ```bash
    mv .env.example .env
    ```

    - Replace any parameter with the YOUR_ prefix in the .env file with your own values. This file is used to configure sensitive information securely.


3. **Navigate to the Project Directory**
    
    Move to the directory containing the docker-compose.yml file:

    ```bash
    cd GroceryList
    ```

4. **Start the Application**

    Run the following command to build and start the application:

    ```bash
    docker compose up
    ```

5. **Access the Application**

    Once the containers are running, access the application as specified: 

    - REST API (backend): http://localhost:7003/swagger/
    - Angular (frontend): http://localhost:4200/


6. **Stop the Application (Optional)**

    To stop the application, press Ctrl+C in the terminal where it's running, and then remove the containers with:

    ```bash
    docker compose down
    ```


### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```
