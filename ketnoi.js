/* ==========================================================================
   Tệp: ketnoi.js
   ========================================================================== */

const HTS_DUONG_DAN_UNG_DUNG_STR = "https://script.google.com/macros/s/AKfycbxeQAXxsFNGjJlnnaimCshsK8wLVea9wnVePCR-ioB9Xr3Q4mVVUsDXIUIEYQ1vIZHb/exec"; 

const hts_khoa_cua_sat_str = "e" + "m" + "a" + "i" + "l";
const hts_tu_lanh_to_str = "SKT_USER_" + hts_khoa_cua_sat_str.toUpperCase();

function hts_cuc_tay_nho_fn() {
    if (window.hts_ngu_bay_xanh_str) return window.hts_ngu_bay_xanh_str;
    if (window.hts_bo_nho_tam_obj && window.hts_bo_nho_tam_obj["SKT_USER_ID"]) {
        return window.hts_bo_nho_tam_obj["SKT_USER_ID"];
    }
    try {
        return sessionStorage.getItem("SKT_USER_ID") || sessionStorage.getItem(hts_tu_lanh_to_str) || "";
    } catch (hts_loi_da_roi_obj) {
        return "";
    }
}

let hts_tai_khoan_khach_str = hts_cuc_tay_nho_fn();

const google = {
    script: {
        run: hts_dong_ho_tay_fn()
    }
};

function hts_dong_ho_tay_fn(hts_ham_xanh_fn = null, hts_ham_do_fn = null) {
    return new Proxy({}, {
        get: function(hts_doi_tuong_goc_obj, hts_thuoc_tinh_str) {
            if (hts_thuoc_tinh_str === 'withSuccessHandler') return function(hts_ham_goi_lai_fn) { return hts_dong_ho_tay_fn(hts_ham_goi_lai_fn, hts_ham_do_fn); };
            if (hts_thuoc_tinh_str === 'withFailureHandler') return function(hts_ham_goi_lai_fn) { return hts_dong_ho_tay_fn(hts_ham_xanh_fn, hts_ham_goi_lai_fn); };
            
            return function(...hts_danh_sach_tham_so_arr) {
                hts_tai_khoan_khach_str = hts_cuc_tay_nho_fn();
                hts_thuc_thi_goi_fn(hts_thuoc_tinh_str, hts_danh_sach_tham_so_arr, hts_ham_xanh_fn, hts_ham_do_fn);
            };
        }
    });
}

function hts_thuc_thi_goi_fn(hts_tinh_may_do_str, hts_danh_sach_tham_so_arr, hts_ham_xanh_fn, hts_ham_do_fn) {
    let hts_nhin_la_bay_obj = {};
    if (hts_tinh_may_do_str === "hts_xanh_chay_am_fn") hts_nhin_la_bay_obj = { hts_cam_hoa_da_str: hts_danh_sach_tham_so_arr[0] };
    else if (hts_tinh_may_do_str === "hts_cho_nhay_hoa_fn") hts_nhin_la_bay_obj = { hts_lua_nuoc_bay_arr: hts_danh_sach_tham_so_arr[0] };
    else if (hts_tinh_may_do_str === "hts_vui_doc_ban_fn") hts_nhin_la_bay_obj = { hts_lua_nuoc_bay_arr: hts_danh_sach_tham_so_arr[0] };
    else if (hts_tinh_may_do_str === "hts_sau_ngot_chu_fn") hts_nhin_la_bay_obj = { hts_cam_hoa_da_str: hts_danh_sach_tham_so_arr[0] };
    else if (hts_tinh_may_do_str === "hts_meo_bay_den_fn") hts_nhin_la_bay_obj = { hts_dat_go_nhin_arr: hts_danh_sach_tham_so_arr[0], hts_chu_ngua_di_str: hts_danh_sach_tham_so_arr[1], hts_nui_cao_doc_str: hts_danh_sach_tham_so_arr[2], hts_bien_sau_ngu_str: hts_danh_sach_tham_so_arr[3], hts_nang_gat_noi_str: hts_danh_sach_tham_so_arr[4] };
    else if (hts_tinh_may_do_str === "hts_cua_hat_giay_fn") hts_nhin_la_bay_obj = { hts_cay_xanh_hat_str: hts_danh_sach_tham_so_arr[0], hts_hoa_do_bay_str: hts_danh_sach_tham_so_arr[1], hts_dat_go_nhin_arr: hts_danh_sach_tham_so_arr[2], hts_bien_sau_ngu_str: hts_danh_sach_tham_so_arr[3], hts_nang_gat_noi_str: hts_danh_sach_tham_so_arr[4] };
    else if (hts_tinh_may_do_str === "hts_lan_boi_ngu_fn") hts_nhin_la_bay_obj = { hts_da_lanh_nghe_obj: hts_danh_sach_tham_so_arr[0] };
    else if (hts_tinh_may_do_str === "hts_giay_nghe_da_fn") hts_nhin_la_bay_obj = { hts_da_lanh_nghe_obj: hts_danh_sach_tham_so_arr[0] };
    else if (hts_tinh_may_do_str === "hts_bay_da_ngu_fn") hts_nhin_la_bay_obj = { hts_ban_hoc_go_str: hts_danh_sach_tham_so_arr[0], hts_ghe_da_cu_str: hts_danh_sach_tham_so_arr[1] };
    else if (hts_tinh_may_do_str === "hts_may_xanh_di_fn") hts_nhin_la_bay_obj = {};
    else if (hts_tinh_may_do_str === "hts_gio_mua_an_fn") hts_nhin_la_bay_obj = {};
    else if (hts_tinh_may_do_str === "hts_la_cuoi_ban_fn") hts_nhin_la_bay_obj = {};

    fetch(HTS_DUONG_DAN_UNG_DUNG_STR, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ 
            hts_tinh_may_do_str: hts_tinh_may_do_str, 
            hts_nhin_la_bay_obj: hts_nhin_la_bay_obj, 
            uid: hts_tai_khoan_khach_str, 
            email: hts_tai_khoan_khach_str 
        })
    })
    .then(hts_may_tinh_xach_obj => hts_may_tinh_xach_obj.json())
    .then(hts_dien_thoai_cu_obj => {
        if (hts_dien_thoai_cu_obj.status === "success") { 
            if (hts_ham_xanh_fn) hts_ham_xanh_fn(hts_dien_thoai_cu_obj.data); 
        } 
        else { 
            if (hts_ham_do_fn) hts_ham_do_fn(new Error(hts_dien_thoai_cu_obj.message)); 
        }
    })
    .catch(hts_loi_da_roi_obj => {
        if (hts_ham_do_fn) hts_ham_do_fn(hts_loi_da_roi_obj); 
    });
}
