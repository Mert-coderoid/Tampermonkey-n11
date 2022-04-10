// ==UserScript==
// @name        new user script
// @namespace   https://trim21.me/
// @description hello
// @version     0.0.1
// @author      Trim21 <trim21me@gmail.com>
// @match       http*://*/*
// @require     https://cdn.jsdelivr.net/npm/axios@^0.22.0/dist/axios.min.js
// @require     https://cdn.jsdelivr.net/npm/axios-userscript-adapter@~0.1.7/dist/axiosGmxhrAdapter.min.js
// @grant       GM.xmlHttpRequest
// @run-at      document-end
// @connect     localhost
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...

    // create a button
    var button = document.createElement("button");
    button.setAttribute("class", "btn btn-small animated rubberBand valign-wrapper green")
    button.setAttribute("id", "zOINDFblRN")
    var t = document.createTextNode("launch Start");
    button.appendChild(t);
    document.body.appendChild(button);

    // console.log(axios.defaults.adapter);

    var sendThat = []

    // function to get elements by class name
    function init() {
        const x = document.getElementsByClassName("ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left")
        second(x)
        console.log("init bitti")
    }

    // function to get #document object from preview button
    function second(x) {
        console.log("list başladı")
        var list = []
        var pageNum = document.getElementsByClassName("ui-paginator-page ui-state-default ui-corner-all ui-state-active")
        console.log("--", ((Number(pageNum[1].innerHTML) * 20) - 20))
        for (let i = ((Number(pageNum[1].innerHTML) * 20) - 20); i < (((Number(pageNum[1].innerHTML) * 20) - 20) + x.length); i++) {
            console.log(i)
            var mert = ""
            PrimeFaces.ab({ source: `productApprovalTable:${i}:j_id_54`, process: `productApprovalTable:${i}:j_id_54`, update: `productApprovalTable:${i}:j_id_54`, oncomplete: function (xhr, status, args) { xhr.then((value) => { mert = value; list.push(mert) }) } })
        }
        sendThat = []
        setTimeout(function () {
            secondBucuk(list)
        }, 5000);

        console.log("ilk liste", list)
        secondBucuk(list)
    }

    // function to get links from #document object
    function secondBucuk(list) {
        const x = document.getElementsByClassName("ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left")
        console.log("secondBucuk başladı: ", list)

        for (let i of list) {
            var element = i.getElementsByTagName("eval")
            var urlRegex = /(https?:\/\/[^ ]*)/;
            var mert = element[0].innerHTML;
            var varmert = mert.match(urlRegex)
            varmert[0] = varmert[0].replace("';;]]>", "")

            sendThat.push(varmert[0])
            element = ""
            mert = ""
            varmert = ""
        }
        console.log(sendThat)

        // send link list to server
        setTimeout(function () {
            axios.defaults.adapter = axiosGmxhrAdapter;
            axios.post("http://localhost:3000/list", sendThat).then((res) => {
                console.log(res.data);

                // get link list from server and change button Text
                for (let i = 0; i < 20; i++) {
                    console.log(x[i].innerText)
                    console.log(res.data[i].statusCode)
                    x[i].innerText = x[i].innerText + " " + (res.data[i].statusCode)
                }
            })
        }, 3000);
    }

    // button click event
    var view = document.getElementById("zOINDFblRN")
    view.classList.add("view-set");
    view.addEventListener("click", () => init());
})();

