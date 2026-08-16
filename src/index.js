import statuses from "statuses";

const extraStatusCodesMap = {
  "214": "Transformation Applied",
  "419": "Page Expired",
  "420": "Method Failure",
  "444": "No Response",
  "450": "Blocked by Windows Parental Controls",
  "495": "SSL Certificate Error",
  "496": "SSL Certificate Required",
  "497": "HTTP Request Sent to HTTPS Port",
  "498": "Invalid Token",
  "499": "Client Closed Request",
  "521": "Web Server Is Down",
  "522": "Connection Timed Out",
  "523": "Origin Is Unreachable",
  "525": "SSL Handshake Failed",
  "530": "Site Is Frozen",
  "599": "Network Connect Timeout Error"
}

const extraStatusCodes = Object.keys(extraStatusCodesMap).map((code) => Number(code))

function getRandomStatusCode() {
    const pool = extraStatusCodes.concat(statuses.codes)
    return pool[Math.floor(Math.random() * pool.length)]
}

function getStatusMessage(code) {
    if (extraStatusCodesMap[code] !== undefined) {
        return extraStatusCodesMap[code]
    }

    return statuses(code)
}

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

        document.querySelector(".catto-box").classList.remove("no-catto")
    });
}

const code = getRandomStatusCode()
renderCatto(code, getStatusMessage(code))