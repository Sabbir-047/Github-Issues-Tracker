const cardContainer = document.getElementById("cardContainer");

// 1 -> Load all issues
async function loadIssues() {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;
    const res = await fetch(url);
    const datas = await res.json();
    // console.log(datas);
    // console.log(datas.data);
    displayIssues(datas.data);
}

// 2 - > display all the issues
async function displayIssues(issues) {
    console.log(issues);
    cardContainer.innerHTML = "";

    issues.forEach((issue) => {
        const card = document.createElement("div");
        card.className = `border-t-3 rounded-lg ${issue.status === "open" ? "border-t-green-500" : "border-t-violet-500"}`
        card.innerHTML = `
            <div class="card p-4 bg-[#EFEFEF] space-y-4">
                    <div class="flex justify-between items-center">
                        <img src="assets/${issue.status === "open" ? 'Open_Status.png' : 'Closed_Status.png'}" alt="${issue.status === "open" ? "open" : "Closed"}">
                        <div class="badge ${issue.priority === 'high' ? 'badge-outline badge-error' 
                        : issue.priority === 'medium' ? 'badge-outline badge-warning'
                        : 'badge-outline badge-neutral'}">${issue.priority}</div>
                    </div>
                    <div class="space-y-3">
                        <h3 class="text-sm font-semibold color-primary">${issue.title}</h3>
                        <p class="color-secondary font-normal text-[12px]">${issue.description}</p>
                        <div class="flex gap-3 items-center">
                            <div class="flex gap-3 items-center">
                            ${issue.labels?.length > 0 
                                ? issue.labels.map(label => `<div class="badge badge-outline badge-secondary">${label}</div>`).join('') 
                                : ''
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

loadIssues();
