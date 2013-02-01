// Save this script as `options.js`

// Saves options to localStorage.
function saveOptions() 
{
    var urls = document.getElementById("urls").value.split(", "); 
    
    if(!urls)
        return;

    var empty = true;
    for(var i = 0; i < urls.length; i++)
    {
        if(urls[i].length > 0)
        {
            empty = false;
            if(urls[i].indexOf("http://") !== 0 && urls[i].indexOf("https://") !== 0)
            {
                urls[i] = "http://" + urls[i];
            }

            if(urls[i].charAt(urls[i].length - 1) !== "/")
            {
                urls[i] += "/";
            } 
        }
    }

    if(empty)
    {
        urls = new Array();
    }
    localStorage.urls = JSON.stringify(urls);
    var status = document.getElementById("status");
    status.innerHTML = urls.length + " urls saved.";

    setTimeout(function() 
        {
            status.innerHTML = "";
        }, 750);
}

// Restores select box state to saved value from localStorage.
function restoreOptions() 
{
    var urls = localStorage.urls;
    if (!urls)
    {
        return;
    }
    urls = JSON.parse(urls);
    var text = document.getElementById("urls");

    for (var i = 0; i < urls.length; i++) 
    {
        if(urls[i].length > 0)
        {
            text.innerHTML += urls[i];
            if(i + 1 < urls.length)
            {
                text.innerHTML += ", ";
            }
        }
    }
}

function init()
{
    restoreOptions();
    document.querySelector('#save').addEventListener('click', saveOptions);
}

window.onload = init;
