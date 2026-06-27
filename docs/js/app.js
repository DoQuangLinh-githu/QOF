// =============================================
// APP.JS - QOF (Chỉ 7 mục con)
// =============================================

function initApp() {
    console.log('🌾 QUYNH ORGANIC FARM - Đã khởi động!');
    
    // Render footer
    if (typeof renderFooter === 'function') {
        renderFooter();
    }
    
    // ===== XỬ LÝ CLICK VÀO 7 MỤC =====
    const menuItems = document.querySelectorAll('.nav-item[data-production]');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Bỏ active cũ
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Lấy pageId và render
            const pageId = this.dataset.production;
            if (pageId && typeof renderProductionContent === 'function') {
                renderProductionContent(pageId);
            }
        });
    });
    
    // ===== HIỂN THỊ TRANG CHỦ MẶC ĐỊNH =====
    if (typeof renderProductionContent === 'function') {
        const trangChuItem = document.querySelector('.nav-item[data-production="trangChu"]');
        if (trangChuItem) {
            trangChuItem.classList.add('active');
        }
        renderProductionContent('trangChu');
    }
}

// Khởi động khi DOM sẵn sàng
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}