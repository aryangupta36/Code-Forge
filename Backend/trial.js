async function generateProblem() {
    const lang = document.getElementById('language').value;
    const topic = document.getElementById('topic').value;
    const diff = document.getElementById('difficulty').value;
    const output = document.getElementById('output');

    if (lang.includes("Select") || topic.includes("Select") || diff.includes("Select")) {
        output.innerText = "⚠️ Please select all options.";
        return;
    }

    output.innerText = "🤖 Generating...";
    const response = await fetch('/generate-problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: lang, topic: topic, difficulty: diff })
    });
    const data = await response.json();
    output.innerText = data.text;
}

async function getHelp(type) {
    const output = document.getElementById('output');
    output.innerText = `🤖 Thinking of a ${type}...`;

    try {
        const response = await fetch('/get-help', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: type })
        });
        const data = await response.json();
        output.innerText = data.text;
    } catch (err) {
        output.innerText = "❌ Could not get help.";
    }
}

// Map the HTML onclicks to the new helper function
function showHint() { getHelp('hint'); }
function showSolution() { getHelp('solution'); }