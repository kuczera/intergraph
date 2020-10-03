# Intergraph

This repository contains project files for both [frontend](./intergraph-frontend) and [backend](./intergraph-backend). You can find more detailed information about how to build and deploy the corresponding solutions in their directories.

## Local Test Deployment

The source code is hosted on GitHub.  
https://github.com/kuczera/intergraph

### Clone repository

`git clone git@github.com:kuczera/intergraph.git`

### Setup backend environment variables

Open `./intergraph-backend/.env` file to set up host url and credentials for the graph database.

### Install dependencies

Run `npm install` to install dependencies for the test deployment script. Run `npm run localtest` afterwards to install dependencies for frontend and backend. Installing these may take some time.

### Run local test

Run `npm run start` to run both frontend and backend for a local test.

## TODOS

- Settings-Page which is saved on the server with Login
- Settings-Page
  - Database credetials
  - dynamic configuration
    - read labels and properties from DB
    - create table with colums
      - properties to be queried on search per label
      - property to be shown for a node label in cytoscape
      - properties to be shown in info container for a node in the view



## Tools & Frameworks

### NodeJS
https://nodejs.org/en/docs/

### ExpressJS
https://expressjs.com/de/api.html

### Cytoscape.js
https://js.cytoscape.org/

### WebCola
https://github.com/tgdwyer/WebCola/

### Neo4j
https://neo4j.com/docs/

### Angular
https://angular.io/docs

## Contributors
* Stefan Schindler
* Andreas Kuczera
