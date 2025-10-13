// page4-script.js - Logic cho trang taosukien4.html (Cài đặt và Submit)

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page 4 loaded');
    
    // Tải dữ liệu từ localStorage
    EventData.load();
    
    // Hiển thị summary data
    displayEventSummary();
    
    // Setup dynamic URL
    setupDynamicURL();
    
    // Setup Submit button
    setupSubmitButton();
    
    // Setup navigation tabs
    setupNavigationTabs();
    
    console.log('Current event data:', EventData);
});

function displayEventSummary() {
    // Hiển thị tóm tắt thông tin sự kiện (optional)
    console.log('Event Summary:');
    console.log('- Name:', EventData.name);
    console.log('- Category:', EventData.category);
    console.log('- Location:', EventData.location);
    console.log('- Start:', EventData.start_time);
    console.log('- End:', EventData.end_time);
    console.log('- Has poster:', !!EventData.logo_url);
    console.log('- Has banner:', !!EventData.banner_url);
}

// Dynamic URL update
function setupDynamicURL() {
    const inputCode = document.getElementById("input-code");
    const dynamicCode = document.getElementById("dynamic-code");
    
    if (!inputCode || !dynamicCode) {
        console.warn('Dynamic URL elements not found');
        return;
    }
    
    inputCode.addEventListener("input", function() {
        const userInput = this.value.trim();
        
        if (userInput) {
            dynamicCode.textContent = userInput;
        } else {
            dynamicCode.textContent = "";
        }
    });
}

// Setup Submit button - GỌI API TẠO SỰ KIỆN
function setupSubmitButton() {
    const submitButton = document.querySelector('.submit-button');
    
    if (!submitButton) {
        console.error('Submit button not found!');
        return;
    }
    
    submitButton.addEventListener('click', async function() {
        console.log('🔘 Submit button clicked');
        
        try {
            // 1. Lưu dữ liệu từ trang này
            saveCurrentPageData();
            
            // 2. Validate tất cả
            const page1Errors = validatePage1Data();
            if (page1Errors.length > 0) {
                alert('❌ Lỗi ở Trang 1:\n' + page1Errors.join('\n'));
                return;
            }
            
            const page3Errors = validatePage3Data();
            if (page3Errors.length > 0) {
                alert('❌ Lỗi ở Trang 3:\n' + page3Errors.join('\n'));
                return;
            }
            
            // 3. Hiển thị confirm
            const confirmMessage = `
🎫 XÁC NHẬN TẠO SỰ KIỆN

📌 Tên: ${EventData.name}
📂 Thể loại: ${EventData.category}
📍 Địa điểm: ${EventData.location}
🕐 Bắt đầu: ${new Date(EventData.start_time).toLocaleString('vi-VN')}
🕐 Kết thúc: ${new Date(EventData.end_time).toLocaleString('vi-VN')}
📊 Trạng thái: ${EventData.status}

Bạn có chắc chắn muốn tạo sự kiện?
            `.trim();
            
            if (!confirm(confirmMessage)) {
                console.log('User cancelled');
                return;
            }
            
            // 4. Hiển thị loading
            showLoading('Đang tạo sự kiện...');
            
            // 5. GỌI API
            console.log('📡 Calling API...');
            const result = await createEvent();
            
            // 6. Ẩn loading
            hideLoading();
            
            // 7. Thành công
            console.log('✅ Event created:', result);
            
            alert(`
✅ TẠO SỰ KIỆN THÀNH CÔNG!

ID: ${result.id}
Tên: ${result.name}
Trạng thái: ${result.status}
Thời gian tạo: ${new Date(result.created_at).toLocaleString('vi-VN')}
            `.trim());
            
            // 8. Xóa dữ liệu tạm
            EventData.clear();
            localStorage.removeItem('tickets');
            
            // 9. Redirect hoặc reset
            setTimeout(() => {
                if (confirm('Bạn có muốn tạo sự kiện mới?')) {
                    window.location.href = 'taosukien1.html';
                }
            }, 1000);
            
        } catch (error) {
            hideLoading();
            
            console.error('❌ Submit Error:', error);
            
            alert(`
❌ LỖI KHI TẠO SỰ KIỆN

Chi tiết: ${error.message}

Vui lòng kiểm tra:
- Kết nối mạng
- Backend server đang chạy
- CORS đã được cấu hình
- Dữ liệu đầu vào hợp lệ

Xem Console (F12) để biết thêm chi tiết.
            `.trim());
        }
    });
}

// Lưu dữ liệu từ trang hiện tại
function saveCurrentPageData() {
    console.log('Saving page 4 data...');
    
    // Lấy giá trị privacy
    const publicRadio = document.getElementById('public-event');
    const privateRadio = document.getElementById('private-event');
    
    if (publicRadio && publicRadio.checked) {
        EventData.status = 'published';
        console.log('Set status to: published');
    } else if (privateRadio && privateRadio.checked) {
        EventData.status = 'draft';
        console.log('Set status to: draft');
    }
    
    // Lưu confirmation message (optional)
    const confirmationEditor = document.querySelector('.group-6 .editor');
    if (confirmationEditor) {
        const confirmationMessage = confirmationEditor.innerHTML;
        // Có thể lưu vào một field khác nếu cần
        // EventData.confirmation_message = confirmationMessage;
        console.log('Confirmation message length:', confirmationMessage.length);
    }
    
    // Lưu vào localStorage
    EventData.save();
    console.log('Page 4 data saved');
}

// Format datetime để hiển thị
function formatDateTimeDisplay(isoString) {
    if (!isoString) return 'N/A';
    
    try {
        const date = new Date(isoString);
        return date.toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (e) {
        return isoString;
    }
}

function setupNavigationTabs() {
    // Tab 1: Thông tin
    const tab1 = document.querySelector('.overlap-group-wrapper .overlap-group');
    if (tab1) {
        tab1.addEventListener('click', function() {
            EventData.save();
            window.location.href = 'taosukien1.html';
        });
    }
    
    // Tab 2: Hình ảnh
    const tab2 = document.querySelector('.group-2 .overlap-group');
    if (tab2) {
        tab2.addEventListener('click', function() {
            EventData.save();
            window.location.href = 'taosukien2.html';
        });
    }
    
    // Tab 3: Vé và thời gian
    const tab3 = document.querySelector('.overlap-wrapper .overlap-group');
    if (tab3) {
        tab3.addEventListener('click', function() {
            EventData.save();
            window.location.href = 'taosukien3.html';
        });
    }
    
    // Tab 4: Cài đặt (current page) - không cần làm gì
}
// Text editor functions (cho confirmation message)
function insertImage() {
    const url = prompt('Nhập URL hình ảnh:');
    if (url) {
        document.execCommand('insertImage', false, url);
    }
}

function insertVideo() {
    const url = prompt('Nhập URL video:');
    if (url) {
        const editor = document.querySelector('.editor');
        if (editor) {
            const video = document.createElement('video');
            video.src = url;
            video.controls = true;
            video.style.maxWidth = '100%';
            editor.appendChild(video);
        }
    }
}

// Validate page 3 data (copy từ page3-script.js để dùng ở đây)
function validatePage3Data() {
    const errors = [];
    
    if (!EventData.start_time) {
        errors.push('Thiếu thời gian bắt đầu sự kiện');
    }
    
    if (!EventData.end_time) {
        errors.push('Thiếu thời gian kết thúc sự kiện');
    }
    
    if (EventData.start_time && EventData.end_time) {
        if (new Date(EventData.start_time) >= new Date(EventData.end_time)) {
            errors.push('Thời gian kết thúc phải sau thời gian bắt đầu');
        }
    }
    
    return errors;
}   