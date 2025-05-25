const fs = require("fs").promises;

module.exports = async (pool) => {
  try {
    const sql = await fs.readFile(`${__dirname}/../sql/setup`, "utf-8");
    await pool.query(sql);
    console.log("✅ Database setup complete!");
  } catch (error) {
    const dbNotFound = error.message.match(/database '(.+') does not exist/i);

    if (dbNotFound) {
      const [err, db] = dbNotFound;
      console.error("❌ Error: " + err);
      console.info(
        `Try running \`createdb -U postgres ${db}\` in your terminal`
      );
    } else {
      console.error(error);
      console.error("❌ Error: " + error.message);
    }
  }
};

module.exports;
