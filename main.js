// I have zero experience in JS so the code might be bad
(function () {
    function fnAddButtons() { // Create 'Download' button
        var btn = document.createElement("button");
        btn.className = "round-button media-subscribe bg-white"
        btn.id = "downloadBtn"
        var span = document.createElement("span");
        span.className = "subscribe-button-label"
        span.textContent = "Download"
        span.id = "downloadSpn"
        document.getElementsByClassName("subscribe-buttons")[0].appendChild(btn);
        document.getElementById("downloadBtn").appendChild(span);
    }
    function fnDefineEvents() {
        document.getElementById("downloadBtn").addEventListener("click", function (event) {
            action();
        });
    }
    function action() {
        var vids = document.getElementsByTagName('video');
        var xhr = new XMLHttpRequest();
        xhr.open('GET', vids.item(0).getAttribute('src'), true);
        xhr.responseType = 'blob';

        xhr.onloadstart = function () { // Show a progress bar
            var progressBar = document.createElement("div");
            progressBar.id = "downloadingProgress";
            progressBar.style.width = "4px";
            progressBar.style.height = "35px";
            progressBar.style.backgroundColor = "#495A6A";
            progressBar.style.display = "block";
            progressBar.style.borderRadius = "25px";
            progressBar.style.overflow = "Hidden";
            progressBar.style.marginLeft = "7px"
            progressBar.style.position = "relative"
            document.getElementsByClassName("media-by")[0].appendChild(progressBar);
            var progressBarFill = document.createElement("div");
            progressBarFill.style.background = "#85C742";
            progressBarFill.style.display = "block";
            progressBarFill.style.position = "absolute";
            progressBarFill.style.height = "0%";
            progressBarFill.style.width = "4px";
            progressBarFill.style.top = "0";
            progressBarFill.style.left = "0";
            progressBarFill.id = "downloadingProgressFill"
            progressBarFill.style.bottom = "0";
            progressBarFill.style.borderRight = "2px solid #fff";
            progressBarFill.style.boxSizing = "content-box";
            progressBarFill.style.transition = "width 200ms ease";
            progressBarFill.style.borderColor = "#0a1725";
            document.getElementById("downloadingProgress").appendChild(progressBarFill);
        };

        xhr.onprogress = function (event) { // Update the progress bar with the current progress
            var progressBar = document.getElementById("downloadingProgressFill");
            var percentage = (event.loaded / event.total) * 100;
            progressBar.style.height = percentage + "%";
        };

        xhr.onload = function (e) { // Download
            if (this.status === 200) {
                var blob = this.response;
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'video.mp4';
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(url);
            }
        };

        xhr.onloadend = function () { // Hide the progress bar
            var progressBar = document.getElementById("downloadingProgress");
            var progressBarFill = document.getElementById("downloadingProgressFill");
            progressBar.remove();
            progressBarFill.remove();
        };

        xhr.send();
    }
    fnAddButtons();
    fnDefineEvents();
})();
// Squatch#7726