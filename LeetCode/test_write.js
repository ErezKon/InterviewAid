const fs = require('fs');
try {
    fs.writeFileSync('c:/Code/Interview/LeetCode/test_out.txt', 'it works');
} catch(e) {
    // try alternate path
    fs.writeFileSync('test_out.txt', 'it works from cwd: ' + process.cwd());
}
