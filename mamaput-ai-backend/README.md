# Backend Folder
# MamaPut AI Backend

## Description
This directory contains the backend code for the MamaPut AI application. It's built using Node.js and Prisma.

## Prerequisites
-   [Node.js](https://nodejs.org/en/download/) (version >= 14, check package.json for specific version)
-   [npm](https://www.npmjs.com/get-npm) (usually comes with Node.js)
-   [Prisma CLI](https://www.prisma.io/docs/reference/tools-reference/prisma-cli) (if not globally installed, it will be used from node_modules)
-   PostgreSQL Database.

## Setup Instructions

1.  *Clone the repository:*
    bash
    git clone https://github.com/Avvyyy/MamaPut-AI.git
    cd mamaput-ai-backend
    

2.  *Install dependencies:*
    bash
    npm install
    

3.  *Set up the database:*

    * *Create a PostgreSQL database:* Create a PostgreSQL database using a tool like psql or a GUI like pgAdmin.
    * **Configure the .env file:**
        * There should be a .env file in the root of your backend directory.  If there isn't, you might have a .env.example or similar file that you should copy and rename to .env.
        * Open the .env file and set the DATABASE_URL environment variable to point to your PostgreSQL database.  For example:
            
            DATABASE_URL="postgresql://user:password@host:port/database_name"
            
        * *Important:* Ensure the PostgreSQL user has the necessary permissions (create, read, write) for the specified database.

4.  *Run Prisma migrations:*
    bash
    npx prisma migrate dev --name init
    
     * This command creates the database schema based on your Prisma schema (located in the prisma directory).  The --name init adds a name to the migration.
     * If you encounter an error saying prisma command not found, try running npm install prisma --save-dev

5.  *Generate Prisma Client:*
    bash
    npx prisma generate
    
    * This command generates the Prisma Client, which is a database access library.  This needs to be done after migrations.

6.  *Start the server:*
    bash
    npm run start
    
    * This command, as shown in the screenshot, likely starts the development server. Check the package.json file for other scripts like start or prod for production.

##  Possible Other Commands (Check package.json)
* npm run start:  Likely starts the production server.
* npm run build:  Likely builds the application for production.
* npm test: Runs any tests.

## File Structure