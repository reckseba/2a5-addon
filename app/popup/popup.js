function call2a5(tabs) {

    // there will be only one result as we queried for the active tab
    let tab = tabs[0];

    // we want to know the url of that activeTab
    const urlLong = tab.url;

    //console.log("I'll shorten this link now: " + urlLong);

    // TODO some pre-checks before sending XHR

    // prepare new XH-Request
    let xhr = new XMLHttpRequest();

    // prepare the body we want to send containing the long URL
    let json = JSON.stringify({
        urlLong: urlLong
    });

    // our endpoint and we want to post
    xhr.open('PUT', 'https://2a5.de/api/newUrlLong');

    // we'll post an json object as this is required by our endpoint
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    // send it
    xhr.send(json);

    xhr.onload = function() {

        // check for http status code - if not 200 success then log sth
        if (![201, 409].includes(xhr.status)) {
            console.log(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {

            // the return object looks like this:
            // {"_id":"123123123","urlLong":"https://example.com/","updated":"2021-11-16T20:16:37.758Z","urlShort":"abc","urlShortFull":"https://2a5.de/abc","urlQrCode":"data:image/png;base64,dasdasdasdasd=","__v":0}
            const jsonResult = JSON.parse(xhr.response);
            
            //console.log(jsonResult.urlShortFull);

            // write the short url directly to the clipboard
            navigator.clipboard.writeText(jsonResult.urlShortFull).then(function() {
                console.log("Put short url successfully to the clipboard.");
            }, function() {
                console.log("Wasn't able to write to clipboard.");
            });

            // put the qr code to the popup img tag
            document.querySelector("#qrcode").setAttribute("src", jsonResult.urlQrCode);

        }
    }

}

// when the user clicks on the toolbar icon the popup.html gets loaded and with it this popup.js
browser.tabs.query({currentWindow: true, active: true}).then(call2a5, console.error);
