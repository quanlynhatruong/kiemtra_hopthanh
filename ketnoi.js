const url_app = "https://script.google.com/macros/s/AKfycbxeQAXxsFNGjJlnnaimCshsK8wLVea9wnVePCR-ioB9Xr3Q4mVVUsDXIUIEYQ1vIZHb/exec"; 

let tk_ngdu = "";
try { tk_ngdu = sessionStorage.getItem("SKT_USER_ACCOUNT") || sessionStorage.getItem("SKT_USER_EMAIL") || ""; } catch(loi) {}

const google = { script: { run: tao_dt() } };

function tao_dt(s_cb = null, f_cb = null) {
    return new Proxy({}, {
        get: function(t, p) {
            if (p === 'withSuccessHandler') return function(cb) { return tao_dt(cb, f_cb); };
            if (p === 'withFailureHandler') return function(cb) { return tao_dt(s_cb, cb); };
            return function(...m_ts) {
                try { tk_ngdu = window.SKT_GLOBAL_ACCOUNT || sessionStorage.getItem("SKT_USER_ACCOUNT") || sessionStorage.getItem("SKT_USER_EMAIL") || ""; } catch(loi) { tk_ngdu = window.SKT_GLOBAL_ACCOUNT || ""; }
                thuc_thi(p, m_ts, s_cb, f_cb);
            };
        }
    });
}

function thuc_thi(hd, m_ts, s_cb, f_cb) {
    let ts = {};
    if (hd === "lay_dldau") ts = { account: m_ts[0], cb: m_ts[1] };
    else if (hd === "lay_hs") ts = { mhs: m_ts[0] };
    else if (hd === "luu_bg") ts = { mng: m_ts[0] };
    else if (hd === "nop_bg") ts = { mng: m_ts[0] };
    else if (hd === "xoa_bg") ts = { mhs: m_ts[0] };
    else if (hd === "tai_tep") ts = { dt: m_ts[0], mhs: m_ts[1], id: m_ts[2], url: m_ts[3], cd: m_ts[4] };
    else if (hd === "tai_tmu") ts = { pid: m_ts[0], ten: m_ts[1], dt: m_ts[2], url: m_ts[3], cd: m_ts[4] };
    else if (hd === "tim_kiem") ts = { tc: m_ts[0] };
    else if (hd === "tao_bc") ts = { tc: m_ts[0] };
    else if (hd === "lay_tmu") ts = {};
    else if (hd === "lay_loc") ts = {};
    else if (hd === "lay_mhs") ts = {};

    fetch(url_app, {
        method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: hd, params: ts, account: tk_ngdu, email: tk_ngdu })
    }).then(r => r.json()).then(r => {
        if (r.status === "success") { if (s_cb) s_cb(r.data); } else { if (f_cb) f_cb(new Error(r.message)); else alert("Lỗi Máy chủ: " + r.message); }
    }).catch(l => { if (f_cb) f_cb(l); });
}
