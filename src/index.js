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

// All sizes in pixels of the original image.
// w/h: full image, top/left: where the crop starts, cw/ch: crop size.
// Each crop sits a pixel or so inside the photo so none of the image's
// black frame shows. Tall images have several frame layouts, so the tall
// crop cuts a little more to fit all of them.
const CROPS = {
    normal: { w: 750, h: 600, top: 52, left: 76, cw: 597, ch: 394 },
    tall: { w: 600, h: 750, top: 70, left: 61, cw: 479, ch: 488 }
}

// Cats whose frame sits somewhere else.
const CROP_OVERRIDES = {
    414: { w: 600, h: 750, top: 33, left: 135, cw: 354, ch: 549 },
    495: { w: 600, h: 750, top: 72, left: 121, cw: 360, ch: 480 },
    496: { w: 750, h: 600, top: 81, left: 78, cw: 596, ch: 337 }
}

function getCrop(code, catto) {
    if (CROP_OVERRIDES[code] !== undefined) {
        return CROP_OVERRIDES[code]
    }

    return catto.naturalHeight > catto.naturalWidth ? CROPS.tall : CROPS.normal
}

function renderCatto(statusCode, statusMessage) {
    const cattoActivity = document.querySelector(".catto-activity")
    const catto = document.querySelector(".clipped-catto")

    const cattoCode = document.createElement("span")
    cattoCode.textContent = `${statusCode},`

    const cattoMessage = document.createElement("span")
    cattoMessage.textContent = `${statusMessage}.`

    cattoActivity.replaceChildren(cattoCode, " ", cattoMessage)
    catto.src = `https://http.cat/${statusCode}`
    catto.alt = `A cat illustrating HTTP ${statusCode} ${statusMessage}`

    catto.addEventListener("load", () => {
        const frame = document.querySelector(".contained-catto")
        const crop = getCrop(statusCode, catto)

        for (const [name, value] of Object.entries(crop)) {
            frame.style.setProperty(`--${name}`, value)
        }
        frame.style.setProperty("--ratio", `${crop.cw} / ${crop.ch}`)

        document.querySelector(".catto-content").classList.remove("evasive-catto")
    });
}

const INITIAL_STATUS = process.env.INITIAL_HTTP_STATUS

let code = getRandomStatusCode()
if (INITIAL_STATUS && location.hash === "") {
    location.hash = process.env.INITIAL_STATUS_MESSAGE ?? "refresh"
    code = parseInt(INITIAL_STATUS)
}

renderCatto(code, getStatusMessage(code))