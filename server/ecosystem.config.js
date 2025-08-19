module.exports = {
  apps: [
    {
      name: "real-estate",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
