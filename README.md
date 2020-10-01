# Intergraph

## Local Setup

The source code is hosted on GitHub.

https://github.com/kuczera/intergraph

Clone project repository:

```
git@github.com:kuczera/intergraph.git
```

Use npm to install the local dependencies:

```
npm i
```

Setting up the environment variables:

* open the ".env-sample" file in the root folder
* fill the variables as explained in the comments
* save the file as ".env"

Setting up the database configuration

* open the "dbconfig-sample.json" int he root folder
* fill the missing values
* save the file as "dbconfig.json"


Build the project:

```
npm run build
```

Deploy the project:

```
npm run start &
```

## TODOS

- Settings-Page which is saved on the server with Login
- Settings-Page
  -- Database credetials
  -- dynamic configuration
    --- read labels and properties from DB
    --- create table with colums
      ---- properties to be queried on search per label
      ---- property to be shown for a node label in cytoscape
      ---- properties to be shown in info container for a node in the view
- 

## Tools & Frameworks

### Node
https://nodejs.org/

### Express
https://expressjs.com/

### Cytoscape.js
https://js.cytoscape.org/

### WebCola
https://github.com/tgdwyer/WebCola/

### Neo4j
https://neo4j.com/

### EJS
https://ejs.co/

## Contributors
* Stefan Schindler
* Andreas Kuczera
