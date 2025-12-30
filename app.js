import path from "path";
import express from "express";
import http from "http";               // 🔥 THÊM
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger.js";
import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/auth.route.js";
import accRoutes from "./src/routes/account.route.js";
import charRoutes from "./src/routes/character.route.js";
import itemsRoutes from "./src/routes/items.route.js";
import itemdetailsRoutes from "./src/routes/itemdetails.route.js";
import itemcrawlerRoutes from "./src/routes/itemscrawler.route.js";
import bossRoutes from "./src/routes/boss.route.js";
import userRoutes from "./src/routes/user.route.js";
import notificationRoutes from "./src/routes/notification.route.js";
import adminNotificationRoute from "./src/routes/admin.notification.route.js";

import { initSocket } from "./src/config/socket.js";
import { fileURLToPath } from "url";

dotenv.config();

// =====================
// PATH SETUP (ESM)
// =====================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =====================
// APP INIT
// =====================
const app = express();

// =====================
// DATABASE
// =====================
connectDB();

// =====================
// MIDDLEWARE
// =====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// =====================
// VIEW ENGINE (EJS)
// =====================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// =====================
// STATIC FILES
// =====================
app.use(express.static(path.join(__dirname, "src", "public")));

// =====================
// ROUTES
// =====================
app.use("/admin", adminNotificationRoute);

app.use("/api", authRoutes);
app.use("/api/account", accRoutes);
app.use("/api/character", charRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/item-details", itemdetailsRoutes);
app.use("/api/itemscrawler", itemcrawlerRoutes);
app.use("/api/boss", bossRoutes);
app.use("/api/user", userRoutes);
app.use("/api", notificationRoutes);

// =====================
// SWAGGER
// =====================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// =====================
// 404
// =====================
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// =====================
// 🔥 HTTP SERVER + SOCKET
// =====================
const server = http.createServer(app);        // 🔥 BẮT BUỘC
const io = initSocket(server);                // 🔥 INIT SOCKET
app.set("io", io);                            // 🔥 SHARE IO

export { app, server };
