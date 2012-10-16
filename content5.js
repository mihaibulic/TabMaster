window.addEventListener('keydown', keydown, false);
window.addEventListener('keyup', keyup, false);

var pressed = false;

function keydown(e)
{
    if((e.ctrlKey || e.altKey) && e.keyCode === 192  && !pressed)
    {
        chrome.extension.sendMessage('extdown');
        pressed = true;
    }
}

function keyup(e)
{
    if((e.ctrlKey || e.altKey) && e.keyCode === 192  && pressed)
    {
        chrome.extension.sendMessage('extup');
        pressed = false;
    }
}

var originalTitle = "";
chrome.extension.onMessage.addListener(function(details)
{
    if(details.indexOf("tabdown") === 0)
    {
        originalTitle = document.title;
        document.title = "(" + details.substring(7) + ") " + originalTitle;
    } 
    else if(details.indexOf("tabup") === 0)
    {
        document.title = originalTitle; 
    }
});
