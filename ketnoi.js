/* ==========================================================================
   Tệp: ketnoi.js - Trạm kết nối Github Pages <-> Google Apps Script
   ========================================================================== */

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxeQAXxsFNGjJlnnaimCshsK8wLVea9wnVePCR-ioB9Xr3Q4mVVUsDXIUIEYQ1vIZHb/exec"; 

const hks_kE_str = "e" + "m" + "a" + "i" + "l";
const hks_kS_str = "SKT_USER_" + hks_kE_str.toUpperCase();

let USER_ACCOUNT = "";
try { 
    USER_ACCOUNT = sessionStorage.getItem("SKT_USER_ACCOUNT") || sessionStorage.getItem(hks_kS_str) || ""; 
} catch(e) { 
    console.warn("Loi Storage"); 
}

const google = {
    script: {
        run: createRunObject()
    }
};

function createRunObject(successCb = null, failureCb = null) {
    return new Proxy({}, {
        get: function(target, prop) {
            if (prop === 'withSuccessHandler') return function(cb) { return createRunObject(cb, failureCb); };
            if (prop === 'withFailureHandler') return function(cb) { return createRunObject(successCb, cb); };
            
            return function(...args) {
                try {
                    USER_ACCOUNT = window.SKT_GLOBAL_ACCOUNT || sessionStorage.getItem("SKT_USER_ACCOUNT") || sessionStorage.getItem(hks_kS_str) || "";
                } catch(e) {}
                
                let params = {};
                // Khôi phục đúng thuộc tính tham số nguyên bản của Frontend
                if (prop === "SKT_getRecordByMaHS") params = { maHS: args[0] };
                else if (prop === "SKT_saveRecord") params = { mangDuLieu: args[0] };
                else if (prop === "SKT_submitRecord") params = { mangDuLieu: args[0] };
                else if (prop === "SKT_deleteSingleRowNhatKy") params = { payload: args[0] };
                else if (prop === "SKT_uploadMultipleFilesToDrive") params = { filesData: args[0], maHoSo: args[1], folderId: args[2], oldUrl: args[3], writeMode: args[4] };
                else if (prop === "SKT_uploadFolderEvidence") params = { parentId: args[0], folderName: args[1], filesData: args[2], oldUrl: args[3], writeMode: args[4] };
                else if (prop === "SKT_searchRecords") params = { criteria: args[0] };
                else if (prop === "SKT_createReportDoc") params = { criteria: args[0] };
                else if (prop === "SKT_getInitialData") params = { account: args[0], ts: args[1] };
                else if (prop === "SKT_getSubFolders") params = {};
                else if (prop === "SKT_getSearchFilterData") params = {};
                else if (prop === "SKT_getUpdatedMaHoSoList") params = {};

                let requestBody = {
                    action: prop,
                    params: params,
                    account: USER_ACCOUNT
                };
                requestBody[hks_kE_str] = USER_ACCOUNT;

                fetch(WEB_APP_URL, {
                    method: "POST",
                    headers: { "Content-Type": "text/plain;charset=utf-8" },
                    body: JSON.stringify(requestBody)
                })
                .then(res => res.json())
                .then(res => {
                    // Khôi phục thuộc tính trả về nguyên bản
                    if (res.success) { 
                        if (successCb) successCb(res.data !== undefined ? res.data : res); 
                    } 
                    else { 
                        if (failureCb) failureCb(new Error(res.message)); 
                        else alert("Lỗi Server: " + res.message); 
                    }
                })
                .catch(err => {
                    if (failureCb) failureCb(err); 
                    else console.error("Lỗi Fetch:", err);
                });
            };
        }
    });
}
