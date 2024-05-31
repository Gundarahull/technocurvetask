const express = require("express");
const app = express();
const sequelize = require("./database/db");
const PrLineItems = require("./models/models");
const VendorUsers = require("./models/secondModel");

require("dotenv").config();
app.use(express.json())

VendorUsers.belongsTo(PrLineItems)

app.post("/post/m1", async (req, res) => {
  console.log(req.body)
  const postData = await PrLineItems.create(req.body);
  if (postData) {
    res.status(200).json({ message: postData });
  }
});

app.post("/post/m2", async (req, res) => {
  console.log(req.body)
  const postDatam2 = await VendorUsers.create(req.body);
  if (postDatam2) {
    res.status(200).json({ message: postDatam2 });
  }
});

app.get("/api/getVendorUsers", async (req, res) => {
  const { prId, custOrgId } = req.query;
  if (!prId || !custOrgId) {
    res.status(400).json({ error: "Missing required query Parameters" });
  }
  try {
    const VendorUsersList = await PrLineItems.findAll({
      attributes: [],
      include: {
        model: VendorUsers,
        attributes: ["vendorOrganizationId", "UserName", "Name"],
        where: { Role: "Admin" },
      },
      where: { purchaseRequestid: prId, custorgid: custOrgId },
      group: [
        "VendorUsers.vendorOrganizationId",
        "VendorUsers.Username",
        "VendorUsers.Name",
      ],
    });
    const result = VendorUsersList.map((item) => ({
      supplierId: item.VendorUser.vendorOrganizationId,
      userName: item.VendorUser.UserName,
      name: item.VendorUser.Name,
      // console.log("items in ",item)
    }));
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "ERROR AT GET API" });
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DB CONNECTION DONE");
  })
  .catch(() => {
    console.log("NO CONNECTION WITH DB");
  });

sequelize.sync().then(()=>{
  console.log("DB SYNC DONE");
}).catch(()=>{
  console.log("NO SYNC")
})
app.listen(process.env.PORT, () => {
  console.log("SERVER IS STARTED");
});
