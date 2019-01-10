const projectElement = document.getElementById("projects");
const repo = "haraldF/webdev-project-skeleton";

async function getProjects() {
    let result = [];

    const response = await fetch(`https://api.github.com/repos/${repo}/contents`);
    if (!response.ok)
        throw new Error("Invalid response: " + response.statusText);
    const reply = await response.json();
    for (let entry of reply) {
        if (entry.type !== "dir") {
            continue;
        }

        result.push(entry.path);
    }

    return result;
}

async function render() {
    let projects = await getProjects();
    for (let project of projects) {
        let listItemElement = document.createElement("li");
        let anchorElement = document.createElement("a");
        anchorElement.href = project;
        anchorElement.textContent = project;
        listItemElement.appendChild(anchorElement);
        projectElement.appendChild(listItemElement);
    }
}

render();
