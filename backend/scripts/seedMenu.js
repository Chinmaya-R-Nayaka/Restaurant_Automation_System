
const fs = require("fs");
const path = require("path");

const API_URL = process.env.API_URL;
const cookie = process.env.RAS_COOKIE;

async function seedMenu() {
  if (!cookie) {
    console.error("Set RAS_COOKIE before running this script.");
    return;
  }

  const filePath = path.join(__dirname, "../data/menuItems.json");
  const items = JSON.parse(fs.readFileSync(filePath, "utf8"));

  let success = 0;
  let failed = 0;

  for (const item of items) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie,
        },
        body: JSON.stringify(item),
      });

      const result = await response.json();

      if (!response.ok) {
        failed++;
        console.log(
          `FAILED: ${item.itemCode} - ${result.message || response.status}`
        );
        continue;
      }

      success++;
      console.log(`ADDED: ${item.itemCode} - ${item.itemName}`);
    } catch (error) {
      failed++;
      console.log(`ERROR: ${item.itemCode} - ${error.message}`);
    }
  }

  console.log("\n--- Seeding Summary ---");
  console.log("Successful:", success);
  console.log("Failed:", failed);
}

seedMenu();
