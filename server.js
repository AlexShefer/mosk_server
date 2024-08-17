const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Middleware to parse request bodies
server.use(jsonServer.bodyParser);

// Use default middlewares (logger, static, etc.)
server.use(middlewares);

// Custom route to handle POST requests and send back buildingInfo
server.post("/api/v1/ifc/extract_building_info", (req, res) => {
    // Return existing buildingInfo from db.json without modifying it
    const buildingInfo = router.db.get("buildingInfo").value();
    console.log("Building Info:", buildingInfo);
    res.jsonp(buildingInfo);
});

// Use the default router for all other routes
server.use(router);

// Start the server
server.listen(3000, () => {
    console.log("JSON Server is running on port 3000");
});
