const Report = require("../models/Report");

exports.getUserReports = async (req, res) => {
  const { role, persal_number:persal } = req.user;

  if(!role || !persal){
    res.json({success:false,message:"Role and Persal are required"});
 
  }
  try {
    const reports = await Report.getReports(role, persal);
    res.json({success:true,message:"Report fetched successfuly",reports});
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ error: "Database error" });
  }
};
