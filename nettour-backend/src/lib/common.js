const moment = require("moment");

function formatFileName(name) {
  const date = moment().format("YYYYMMDD");
  const randomString = Math.random().toString(36).substring(2, 7);
  const claenFileName = name.toLowerCase().replace(/[^a-z0-9가-힣]/g, "-.");
  const newFilename = `postImages/${date}-${randomString}-${claenFileName}`;
  return newFilename.substring(0, 60);
}

exports.formatFileName = formatFileName;
