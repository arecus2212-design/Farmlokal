"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchExternalData = fetchExternalData;
const axios_1 = __importDefault(require("axios"));
const auth_service_1 = require("./auth.service");
function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}
async function fetchExternalData(retries = 3) {
    const token = await (0, auth_service_1.getAccessToken)();
    try {
        console.log("Calling external API...");
        const response = await axios_1.default.get("https://jsonplaceholder.typicode.com/posts/1", {
            timeout: 3000,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        if (retries > 0) {
            console.log("Retrying...");
            await sleep((4 - retries) * 500);
            return fetchExternalData(retries - 1);
        }
        throw new Error("External API failed");
    }
}
//# sourceMappingURL=external.service.js.map