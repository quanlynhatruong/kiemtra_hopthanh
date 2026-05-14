/**
 * CẤU HÌNH GIAO DIỆN & KẾT NỐI HỆ THỐNG WEB APP
 * Hệ thống: Sổ Kiểm Tra Nội Bộ (SKT)
 * Tác giả: Hoàng Ngọc Lâm
 */
const SKT_GAS_URL = "https://script.google.com/macros/s/AKfycbxeQAXxsFNGjJlnnaimCshsK8wLVea9wnVePCR-ioB9Xr3Q4mVVUsDXIUIEYQ1vIZHb/exec";
const SKT_LOGO_URL = "https://i.ibb.co/S46wLjDt/logo-tr-ng-TH-THCS-Hop-Thanh3-removebg-preview.png";
const SKT_TEN_TRUONG = "Trường TH&THCS Hợp Thành";
const SKT_TEN_TRUONG_UP = "TRƯỜNG TH&THCS HỢP THÀNH";

/* ========================================================================= */
/* KHỞI TẠO CẤU TRÚC HEADER TỰ ĐỘNG TỪ FILE JS                               */
/* ========================================================================= */
(function() {
    // 1. Khởi tạo thẻ bộ mã ký tự (utf-8)
    var metaCharset = document.createElement('meta');
    metaCharset.setAttribute('charset', 'utf-8');
    document.head.appendChild(metaCharset);

    // 2. Thiết lập Tiêu đề trang (Title)
    document.title = "Sổ Kiểm Tra Nội Bộ - " + SKT_TEN_TRUONG;

    // 3. Khởi tạo thẻ link Icon (Favicon)
    var linkIcon = document.createElement('link');
    linkIcon.rel = 'icon';
    linkIcon.href = SKT_LOGO_URL;
    document.head.appendChild(linkIcon);
})();
