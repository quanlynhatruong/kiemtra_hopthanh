/* ==========================================================================
   Tệp: ketnoi.js - Trạm kết nối Github Pages <-> Google Apps Script
   ========================================================================== */

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxeQAXxsFNGjJlnnaimCshsK8wLVea9wnVePCR-ioB9Xr3Q4mVVUsDXIUIEYQ1vIZHb/exec"; 

// Bọc try-catch chống sập hệ thống khi Chrome chặn Storage. Hỗ trợ song song cả cache cũ/mới.
let USER_ACCOUNT = "";
try { USER_ACCOUNT = sessionStorage.getItem("SKT_USER_ACCOUNT") || sessionStorage.getItem("SKT_USER_EMAIL") || ""; } catch(e) { console.warn("Chrome chặn Storage khởi tạo"); }

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
                    USER_ACCOUNT = window.SKT_GLOBAL_ACCOUNT || sessionStorage.getItem("SKT_USER_ACCOUNT") || sessionStorage.getItem("SKT_USER_EMAIL") || "";
                } catch(e) {
                    USER_ACCOUNT = window.SKT_GLOBAL_ACCOUNT || "";
                }
                executeBackend(prop, args, successCb, failureCb);
            };
        }
    });
}

function executeBackend(action, argsArray, onSuccess, onFailure) {
    let params = {};
    if (action === "SKT_getRecordByMaHS") params = { maHS: argsArray[0] };
    else if (action === "SKT_saveRecord") params = { dataArray: argsArray[0] };
    else if (action === "SKT_submitFinalRecord") params = { dataArray: argsArray[0] };
    else if (action === "SKT_deleteSingleRowNhatKy") params = { maHS: argsArray[0] };
    else if (action === "SKT_uploadMultipleFilesToDrive") params = { filesData: argsArray[0], maHoSo: argsArray[1], folderId: argsArray[2], oldUrl: argsArray[3], writeMode: argsArray[4] };
    else if (action === "SKT_uploadFolderEvidence") params = { parentId: argsArray[0], folderName: argsArray[1], filesData: argsArray[2], oldUrl: argsArray[3], writeMode: argsArray[4] };
    else if (action === "SKT_searchRecords") params = { criteria: argsArray[0] };
    else if (action === "SKT_createReportDoc") params = { criteria: argsArray[0] };
    else if (action === "SKT_getInitialData") params = { account: argsArray[0], ts: argsArray[1] };
    else if (action === "SKT_getSubFolders") params = {};
    else if (action === "SKT_getSearchFilterData") params = {};
    else if (action === "SKT_getUpdatedMaHoSoList") params = {};

    fetch(WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        // Truyền lên cả 'account' và 'email' để đảm bảo máy chủ Backend ở bản mới hay cũ đều khớp quyền
        body: JSON.stringify({ action: action, params: params, account: USER_ACCOUNT, email: USER_ACCOUNT })
    })
    .then(res => res.json())
    .then(res => {
        if (res.status === "success") { if (onSuccess) onSuccess(res.data); } 
        else { if (onFailure) onFailure(new Error(res.message)); else alert("Lỗi Server: " + res.message); }
    })
    .catch(err => {
        if (onFailure) onFailure(err); else console.error("Lỗi Fetch:", err);
    });
}
