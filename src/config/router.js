module.exports = [
  [/\/api(\/common(\/\w+))(?:\/(\d+))?/, ':1?id=:3', 'rest'],
  [/\/api(\/admin(\/\w+))(?:\/([1-9a-zA-Z%20\s]+))?(?:\/(\d+))?(?:\/(\d)+)?(?:\/([1-9a-zA-Z%20\s]+))?(?:\/([1-9a-zA-Z%20\s]+))?/, ':1?id=:3&pageSize=:4&page=:5&sorter=:6&matchValue=:7', 'rest'],
  [/\/api(\/user(\/\w+))(?:\/(\d+))?/, ':1?id=:3', 'rest'],
  [/\/api(\/super(\/\w+))(?:\/([1-9a-zA-Z%20\s]+))?(?:\/(\d+))?(?:\/(\d)+)?(?:\/([1-9a-zA-Z%20\s]+))?(?:\/([1-9a-zA-Z%20\s]+))?/, ':1?id=:3&pageSize=:4&page=:5&sorter=:6&matchValue=:7', 'rest'],
  [/\/api\/(\w+)(?:\/(\d+))?/, ':1?id=:2', 'rest']
];
