# React-CRUD

### This project is an assesment test project on React-crud for category of business item. 


## Description
You are to create a we client to use a set Restful API endpoints that support CRUD operations for some arbitrary hierarchical data.
The web client should support the following operations
1. Create new item
2. View data as paginated table
3. View data as lazy loaded tree
4. Support switching between table and tree view on same page
5. Filter data by name
6. Update item name, description and parent. An item cannot become its own parent. Descendants of an item cannot become its parent. These should therefore be excluded from the available options when choosing the parent of an item
7. Delete item

## Starting the project

Use docker
1. Open your terminal in the directory containing **docker-compose.yaml**
2. Execute the command below
```bash
~/ docker-compose up
```
### Starting the react-app
```bash
git clone https://github.com/JosephJohncross/react-crud.git

cd vite-project
npm install
npm run dev
```

## Contributing

More suggestions and alternative approaches to solving the above problem are welcome

