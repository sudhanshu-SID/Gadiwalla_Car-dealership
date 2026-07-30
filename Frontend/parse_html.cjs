const fs = require('fs');

function extractStructure(filename) {
    const html = fs.readFileSync(filename, 'utf-8');
    // regex to find all divs that have id and class, let's just get some main elements
    const matches = html.match(/<(div|nav|section|footer|header|main)[^>]*>/g);
    if (!matches) return;
    console.log(`\n--- ${filename} ---`);
    let count = 0;
    for (const match of matches) {
        if (match.includes('id=') || match.includes('class=')) {
            // only print first 30 to get a sense of structure
            if (count < 30) {
                console.log(match.substring(0, 150));
                count++;
            }
        }
    }
}

extractStructure('stitch_homepage.html');
extractStructure('stitch_login.html');
