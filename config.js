const config = {
  min: 2,
  max: process.env.TEST ? 1000 : process.env.MAX,
  threadCount: +process.argv[2] || 4,
};

config.range = Math.ceil((config.max - config.min) / config.threadCount);

export default config;
