IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'grocery_list_db')
BEGIN
    CREATE DATABASE [grocery_list_db];
END
