module.exports = [
  [/\/api(\/common(\/\w+))(?:\/(\d+))?/, ':1?id=:3', 'rest'],
  [/\/api(\/admin(\/\w+))(?:\/(\d+))?/, ':1?id=:3', 'rest'],
  [/\/api(\/user(\/\w+))(?:\/(\d+))?/, ':1?id=:3', 'rest'],
  [/\/api\/(\w+)(?:\/(\d+))?/, ':1?id=:2', 'rest']
];
