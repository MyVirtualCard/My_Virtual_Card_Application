// routes/views.js
import express from "express";
import ViewsModel from "../Models/Views.model.js";
const router = express.Router();
// Endpoint to record a page view
router.post("/:pageUrl", async (req, res) => {
  const { pageUrl, URL_Alies } = req.body;

  try {
    let view = await ViewsModel.findOne({ pageUrl });

    if (view) {
      // Increment view count if page exists
      view.viewCount += 1;

      await view.save();
    } else {
      // Create new entry for the page
      view = new ViewsModel({ pageUrl, URL_Alies });
      await view.save();
    }

    res.status(200).json({ success: true, viewCount: view.viewCount });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
