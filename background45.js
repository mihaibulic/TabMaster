chrome.tabs.onCreated.addListener(function(tab)
{
    if(tab.pinned)
    {
        var urls = localStorage.urls;
        if (!urls) 
        { 
            return;
        }
        urls = JSON.parse(urls);
   
        var found = false;
        for (var i = 0; i < urls.length; i++)
        {
            if(tab.url === urls[i])
            {
                found = true;
                break;
            }
        }

        if(!found)
        {
            chrome.tabs.remove(tab.id);
        }
    }
});

chrome.windows.onCreated.addListener(function(win)
{
    if(win.type === "normal")
    {
        var urls = localStorage.urls;
        if (!urls) 
        { 
            return;
        }
        urls = JSON.parse(urls);
        
        for (var i = 0; i < urls.length; i++)
        {
            chrome.tabs.create({url: urls[i], windowId: win.id, pinned: true});
        }
    }
});   

chrome.extension.onMessage.addListener(function(details) 
{
    if(details.indexOf("ext") === 0)
    {
        var msg = "tab";
        if(details.indexOf("down") > -1)
        {
            msg += "down";
        }
        else if(details.indexOf("up") > -1)
        {
            msg += "up";
        }

        chrome.tabs.query({}, function(tabs)
        {
            for(var i = 0; i < tabs.length; i++)
            {
                chrome.tabs.sendMessage(tabs[i].id, msg+(i+1));
            }
        });
    }
});

