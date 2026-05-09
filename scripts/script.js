const cardContainer = document.getElementById("cardContainer");
const btnContainer = document.getElementById("btnContainer");
const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");
let allIssuesData = [];

// 1 -> Load all issues
async function loadIssues() {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;
    const res = await fetch(url);
    const datas = await res.json();
    // console.log(datas);
    // console.log(datas.data);
    allIssuesData = datas.data;
    displayIssues(allIssuesData);
}

// 2 - > display all the issues
function displayIssues(issues) {
    // console.log(issues);
    cardContainer.innerHTML = "";

    issues.forEach((issue) => {
        const card = document.createElement("div");
        card.className = `border-t-3 rounded-lg ${issue.status === "open" ? "border-t-green-500" : "border-t-violet-500"}`;
        card.innerHTML = `
            <div class="h-full card p-4 bg-[#EFEFEF] space-y-4">
                    <div class="flex justify-between items-center">
                        <img src="assets/${issue.status === "open" ? "Open_Status.png" : "Closed_Status.png"}" alt="${issue.status === "open" ? "open" : "Closed"}">
                        <div class="badge ${
                            issue.priority === "high"
                                ? "badge-outline badge-error"
                                : issue.priority === "medium"
                                  ? "badge-outline badge-warning"
                                  : "badge-outline badge-neutral"
                        }">${issue.priority}</div>
                    </div>
                    <div class="space-y-3">
                        <h3 class="text-sm font-semibold color-primary">${issue.title}</h3>
                        <p class="color-secondary font-normal text-[12px] line-clamp-2">${issue.description}</p>
                        <div class="flex gap-3 items-center">
                            <div class="flex gap-3 items-center">
                            ${
                                issue.labels?.length > 0
                                    ? issue.labels
                                          .map(
                                              (label) =>
                                                  `<div class="badge badge-outline badge-secondary text-[12px]">${label}</div>`,
                                          )
                                          .join("")
                                    : ""
                            }
                        </div>
                    </div>
                    <hr class="text-gray-300">
                    <div>
                        <p class="text-[12px] color-secondary">${issue.author}</p>
                        <p class="text-[12px] color-secondary">${issue.createdAt}</p>
                    </div>
                </div>
            </div>    
        `;
        cardContainer.appendChild(card);
    });
}

// all buttons
allBtn.addEventListener("click", () => {
    displayIssues(allIssuesData);
})

// open button
openBtn.addEventListener("click", () => {
    const openIssues = allIssuesData.filter((issue) => issue.status == "open");
    displayIssues(openIssues);
})

// closed button
closedBtn.addEventListener("click", () => {
    const closedIssues = allIssuesData.filter((issue) => issue.status == "closed");
    displayIssues(closedIssues);
})



loadIssues();
// loadCategories();
