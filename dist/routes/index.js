"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatRoutes_1 = __importDefault(require("./chatRoutes")); // Import your chat routes
const router = express_1.default.Router();
// Use the chat routes under the `/api/chat` path
router.use('/api/chat', chatRoutes_1.default);
// Example route for testing
router.get('/', (req, res) => {
    res.send('Welcome to LobChat!');
});
exports.default = router;
