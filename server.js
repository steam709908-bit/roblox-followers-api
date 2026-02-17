const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Roblox Followers API is running 🚀");
});

app.get("/followers/:userId", async (req, res) => {
    const userId = req.params.userId;

    try {
        const response = await axios.get(
            `https://followers.roblox.com/v1/users/${userId}/followers/count`,
            {
                headers: {
                    "User-Agent": "Mozilla/5.0",
                    "Accept": "application/json"
                }
            }
        );

        res.json({
            success: true,
            followers: response.data.count
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Failed to retrieve data from Roblox"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
