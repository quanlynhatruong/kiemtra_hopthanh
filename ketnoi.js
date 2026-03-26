/* ==========================================================================
   Tệp: ketnoi.js - Trạm kết nối Github Pages <-> Google Apps Script
   ========================================================================== */

const HTS_WEB_APP_URL_STR = "https://script.google.com/macros/s/AKfycbxeQAXxsFNGjJlnnaimCshsK8wLVea9wnVePCR-ioB9Xr3Q4mVVUsDXIUIEYQ1vIZHb/exec"; 

let hts_tai_khoan_hien_tai_str = "";
try { hts_tai_khoan_hien_tai_str = sessionStorage.getItem("SKT_USER_ACCOUNT") || sessionStorage.getItem("SKT_USER_EMAIL") || ""; } catch(e) { }

const google = {
    script: {
        run: hts_xe_dap_con_fn()
    }
};

function hts_xe_dap_con_fn(successCb = null, failureCb = null) {
    return new Proxy({}, {
        get: function(target, prop) {
            if (prop === 'withSuccessHandler') return function(cb) { return hts_xe_dap_con_fn(cb, failureCb); };
            if (prop === 'withFailureHandler') return function(cb) { return hts_xe_dap_con_fn(successCb, cb); };
            
            return function(...args) {
                try {
                    hts_tai_khoan_hien_tai_str = window.hts_qua_tao_do_str || sessionStorage.getItem("SKT_USER_ACCOUNT") || sessionStorage.getItem("SKT_USER_EMAIL") || "";
                } catch(e) {
                    hts_tai_khoan_hien_tai_str = window.hts_qua_tao_do_str || "";
                }
                hts_tau_hoa_chay_fn(prop, args, successCb, failureCb);
            };
        }
    });
}

function hts_tau_hoa_chay_fn(action, argsArray, onSuccess, onFailure) {
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

    fetch(HTS_WEB_APP_URL_STR, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: action, params: params, account: hts_tai_khoan_hien_tai_str, email: hts_tai_khoan_hien_tai_str })
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
