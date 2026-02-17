const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/followers/:userid", async (req, res) => {
    try {
        const userId = req.params.userid;

        const response = await axios.get(
            `https://friends.roblox.com/v1/users/${userId}/followers/count`,
            {
                headers: {
                    "User-Agent": "Roblox/WinInet"
                }
            }
        );

        res.json({
            success: true,
            followers: response.data.count
        });

    } catch (error) {
        console.log(error.response?.data || error.message);
        res.json({
            success: false,
            error: "Roblox API blocked request"
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
