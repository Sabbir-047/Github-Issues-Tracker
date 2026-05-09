const cardContainer = document.getElementById("cardContainer");
const btnContainer = document.getElementById("btnContainer");
const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");
let issueTracker = document.getElementById("issueTracker");
const spinner = document.getElementById("spinner");
const issueTitle = document.getElementById("issueTitle");
const issueBadge = document.getElementById("issueBadge");
const issueAuthor = document.getElementById("issueAuthor");
const issuedDate = document.getElementById("issuedDate");
const issueDescription = document.getElementById("issueDescription");
const issueAssigne = document.getElementById("issueAssigne");
const issuePriority = document.getElementById("issuePriority");
const issueDetails = document.getElementById("my_modal_5");
let allIssuesData = [];

// 1 -> Load all issues
async function loadIssues() {
    showSpinner();
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;
    const res = await fetch(url);
    const datas = await res.json();
    // console.log(datas);
    // console.log(datas.data);
    allIssuesData = datas.data;
    hideSpinner();
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
            <div onclick ="openIssueModal(${issue.id})" class="h-full card p-4 bg-[#EFEFEF] space-y-4">
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

// 3-> all buttons
allBtn.addEventListener("click", () => {
    displayIssues(allIssuesData);
    activeBtn(allBtn);
    issueTrack(allIssuesData);
});

// 4-> open button
openBtn.addEventListener("click", () => {
    const openIssues = allIssuesData.filter((issue) => issue.status == "open");
    displayIssues(openIssues);
    activeBtn(openBtn);
    issueTrack(openIssues);
});

// 5-> closed button
closedBtn.addEventListener("click", () => {
    const closedIssues = allIssuesData.filter(
        (issue) => issue.status == "closed",
    );
    displayIssues(closedIssues);
    activeBtn(closedBtn);
    issueTrack(closedIssues);
});

// 6-> Filter button
function activeBtn(clickedBtn) {
    allBtn.classList.add("btn-outline");
    openBtn.classList.add("btn-outline");
    closedBtn.classList.add("btn-outline");
    clickedBtn.classList.remove("btn-outline");
}

// 7 -> Issue tracker
function issueTrack(given) {
    let length = given.length;
    issueTracker.textContent = `${length} Issues`;
}

// 8 -> spinner show and hide
function hideSpinner() {
    spinner.classList.add("hidden");
}
function showSpinner() {
    spinner.classList.remove("hidden");
    cardContainer.innerHTML = "";
}

// 9 -> Search implementation
const searchField = document.getElementById("searchField");

searchField.addEventListener("input", (event) => {
    const search = event.target.value.toLowerCase();
    const searchedIssue = allIssuesData.filter((issue) => {
        const title = issue.title.toLowerCase();
        return title.includes(search);
    });
    displayIssues(searchedIssue);
    issueTrack(searchedIssue);
});

// 10 -> Open Modal
async function openIssueModal(issueId) {
    // console.log(issueId);
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`;
    const res = await fetch(url);
    const datas = await res.json();
    const issueInfo = datas.data;
    issueTitle.textContent = issueInfo.title;
    issueBadge.textContent = issueInfo.status;
    issueAuthor.textContent = `Opened by ${issueInfo.author}`;
    issuedDate.textContent = issueInfo.createdAt;
    issueDescription.textContent = issueInfo.description;
    issueAssigne.textContent = issueInfo.assignee;
    issuePriority.textContent = issueInfo.priority;
    const labelContainer = document.getElementById("labelContainer");
    labelContainer.classList.add("space-x-4")
    labelContainer.innerHTML = `
    ${
        issueInfo.labels?.length > 0
            ? issueInfo.labels
                  .map(
                      (label) =>
                          `<div class="badge badge-outline badge-secondary text-[12px] ">${label}</div>`,
                  )
                  .join("")
            : ""
    }
    `;
    issueDetails.showModal();
}

loadIssues();
// loadCategories();
