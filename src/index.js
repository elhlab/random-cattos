import statuses from "statuses";

function renderCatto(statusCode, statusMessage) {
    const cattoActivity = document.querySelector(".catto-activity")
    const catto = document.querySelector(".clipped-catto")

    cattoActivity.textContent = `${statusCode}, ${statusMessage}.`
    catto.src = `https://http.cat/${statusCode}`
    catto.alt = `A cat illustrating HTTP ${statusCode} ${statusMessage}`

    catto.addEventListener("load", () => {
        catto.classList.toggle(
            "clipped-tall-catto",
            catto.naturalHeight > catto.naturalWidth
        );

        document.querySelector(".catto-box").classList.remove("no-js")
    });
}

const code = statuses.codes[Math.floor(Math.random() * statuses.codes.length)];
setTimeout(() => renderCatto(code, statuses(code)), 500)