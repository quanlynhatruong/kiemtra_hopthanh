/* ==========================================================================
   Tệp: ketnoi.js - Trạm kết nối Github Pages <-> Google Apps Script
   ========================================================================== */

const HTS_DUONG_DAN_UNG_DUNG_STR = "https://script.google.com/macros/s/AKfycbxeQAXxsFNGjJlnnaimCshsK8wLVea9wnVePCR-ioB9Xr3Q4mVVUsDXIUIEYQ1vIZHb/exec"; 

let hts_taiKhoanKhachHienTai_str = "";
try { hts_taiKhoanKhachHienTai_str = sessionStorage.getItem("SKT_USER_ACCOUNT") || sessionStorage.getItem("SKT_USER_EMAIL") || ""; } catch(e) { console.warn("Chrome chặn Storage khởi tạo"); }

const google = {
    script: {
        run: hts_taoDoiTuongChay_fn()
    }
};

function hts_taoDoiTuongChay_fn(hts_hamThanhCong_fn = null, hts_hamThatBai_fn = null) {
    return new Proxy({}, {
        get: function(target, prop) {
            if (prop === 'withSuccessHandler') return function(cb) { return hts_taoDoiTuongChay_fn(cb, hts_hamThatBai_fn); };
            if (prop === 'withFailureHandler') return function(cb) { return hts_taoDoiTuongChay_fn(hts_hamThanhCong_fn, cb); };
            
            return function(...args) {
                try {
                    hts_taiKhoanKhachHienTai_str = window.hts_taiKhoanToanCuc_str || sessionStorage.getItem("SKT_USER_ACCOUNT") || sessionStorage.getItem("SKT_USER_EMAIL") || "";
                } catch(e) {
                    hts_taiKhoanKhachHienTai_str = window.hts_taiKhoanToanCuc_str || "";
                }
                hts_thucThiHeThongSau_fn(prop, args, hts_hamThanhCong_fn, hts_hamThatBai_fn);
            };
        }
    });
}

function hts_thucThiHeThongSau_fn(action, argsArray, onSuccess, onFailure) {
    let params = {};
    if (action === "hts_layBanGhiTheoMa_fn") params = { hts_maHSDauVao_str: argsArray[0] };
    else if (action === "hts_luuTamBanGhi_fn") params = { hts_mangDuLieuDauVao_arr: argsArray[0] };
    else if (action === "hts_nopKetQuaCuoi_fn") params = { hts_mangDuLieuDauVao_arr: argsArray[0] };
    else if (action === "hts_xoaMotDongNhatKy_fn") params = { hts_maHSDauVao_str: argsArray[0] };
    else if (action === "hts_taiNhieuTepLen_fn") params = { hts_duLieuTep_arr: argsArray[0], hts_maHoSoDich_str: argsArray[1], hts_idThuMucDich_str: argsArray[2], hts_duongDanCu_str: argsArray[3], hts_cheDoGhi_str: argsArray[4] };
    else if (action === "hts_taiThuMucLen_fn") params = { hts_idThuMucCha_str: argsArray[0], hts_tenThuMucMoi_str: argsArray[1], hts_duLieuTep_arr: argsArray[2], hts_duongDanCu_str: argsArray[3], hts_cheDoGhi_str: argsArray[4] };
    else if (action === "hts_timKiemBanGhi_fn") params = { hts_tieuChiLoc_obj: argsArray[0] };
    else if (action === "hts_taoTaiLieuBaoCao_fn") params = { hts_tieuChiLoc_obj: argsArray[0] };
    else if (action === "hts_layDuLieuKhoiTao_fn") params = { account: argsArray[0], hts_chongNhoDem_str: argsArray[1] };
    else if (action === "hts_layThuMucCon_fn") params = {};
    else if (action === "hts_layDuLieuLocTimKiem_fn") params = {};
    else if (action === "hts_layDanhSachMaMoi_fn") params = {};

    fetch(HTS_DUONG_DAN_UNG_DUNG_STR, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: action, params: params, account: hts_taiKhoanKhachHienTai_str, email: hts_taiKhoanKhachHienTai_str })
    })
    .then(res => res.json())
    .then(res => {
        if (res.hts_thanhCong_bol === "success") { if (onSuccess) onSuccess(res.hts_duLieu_obj); } 
        else { if (onFailure) onFailure(new Error(res.hts_thongBao_str)); else alert("Lỗi Server: " + res.hts_thongBao_str); }
    })
    .catch(err => {
        if (onFailure) onFailure(err); else console.error("Lỗi Fetch:", err);
    });
}
