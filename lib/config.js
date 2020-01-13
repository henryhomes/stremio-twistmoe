
function atob(str) {
  return Buffer.from(str, 'base64').toString('binary');
}

module.exports = {
  ACCESS_TOKEN: atob("MXJqMnZSdGVnUzhZNjBCM3czcU5abTVUMlEwVE4yTlI="),
  AES_KEY: atob("TFhnSVZQJlBvck82OFJxN2RUeDhOXmxQIUZhNXNHSl4qWEs=")
}
