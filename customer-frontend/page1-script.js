// page1-script.js - Logic cho trang taosukien1.html

// Tải dữ liệu khi trang load
document.addEventListener('DOMContentLoaded', function() {
    // Tải dữ liệu đã lưu (nếu có)
    EventData.load();
    
    // Điền dữ liệu vào form
    populateForm();
    
    // Setup dropdown địa chỉ
    setupLocationDropdowns();
    
    // Setup nút Next Page
    setupNextPageButton();

    setupNavigationTabs(); 
});

// Điền dữ liệu vào form
function populateForm() {
    const eventNameInput = document.querySelector('.short-answer .input-field');
    const categorySelect = document.querySelector('.combo-box .dropdown');
    const addressNameInput = document.querySelector('.short-answer-2 .input-field');
    const streetInput = document.querySelector('.short-answer-3 .input-field');
    const provinceSelect = document.querySelector('.combo-box-2 .dropdown');
    const districtSelect = document.querySelector('.combo-box-3 .dropdown');
    const wardSelect = document.querySelector('.combo-box-4 .dropdown');
    const organizerInput = document.querySelector('.short-answer-4 .input-field');
    const eventInfoEditor = document.querySelector('.group-5 .editor');
    const organizerInfoEditor = document.querySelector('.group-9 .editor');
    
    if (EventData.name) eventNameInput.value = EventData.name;
    if (EventData.category) categorySelect.value = EventData.category;
    if (EventData.addressName) addressNameInput.value = EventData.addressName;
    if (EventData.streetNumber) streetInput.value = EventData.streetNumber;
    if (EventData.province) provinceSelect.value = EventData.province;
    if (EventData.organizerName) organizerInput.value = EventData.organizerName;
    if (EventData.content) eventInfoEditor.innerHTML = EventData.content;
    if (EventData.conditions) organizerInfoEditor.innerHTML = EventData.conditions;
}

// Setup dropdown địa chỉ
function setupLocationDropdowns() {
    const primaryDropdown = document.querySelector(".primary-dropdown");
    const secondaryDropdown = document.querySelector(".secondary-dropdown");

    const options = {
        TpHCM: ["1", "3", "4", "5", "6", "7", "8", "10", "11", "12", "Tân Bình", "Tân Phú", "Bình Tân", "Bình Thạnh", "Gò Vấp", "Phú Nhuận", "Thủ Đức"],
        HN: ["Ba Đình", "Bắc Từ Liêm", "Cầu Giấy", "Đống Đa", "Hà Đông", "Hai Bà Trưng", "Hoàn Kiếm", "Hoàng Mai", "Long Biên", "Nam Từ Liêm", "Tây Hồ", "Thanh Xuân"],
        DN: ["Hải Châu", "Cẩm Lệ", "Thanh Khê", "Liên Chiểu", "Ngũ Hành Sơn", "Sơn Trà", "Hòa Vang", "Hoàng Sa"]
    };

    primaryDropdown.addEventListener("change", (event) => {
        const selectedValue = event.target.value;
        secondaryDropdown.innerHTML = '<option value="">Chọn...</option>';

        if (options[selectedValue]) {
            options[selectedValue].forEach(option => {
                const opt = document.createElement("option");
                opt.value = option.toLowerCase();
                opt.textContent = option;
                secondaryDropdown.appendChild(opt);
            });
        }
        
        // Restore district nếu có
        if (EventData.district) {
            secondaryDropdown.value = EventData.district;
        }
    });
    
    // Trigger change để load districts nếu đã có province
    if (EventData.province) {
        primaryDropdown.dispatchEvent(new Event('change'));
    }
}

// Lưu dữ liệu từ form
function saveFormData() {
    const eventNameInput = document.querySelector('.short-answer .input-field');
    const categorySelect = document.querySelector('.combo-box .dropdown');
    const addressNameInput = document.querySelector('.short-answer-2 .input-field');
    const streetInput = document.querySelector('.short-answer-3 .input-field');
    const provinceSelect = document.querySelector('.combo-box-2 .dropdown');
    const districtSelect = document.querySelector('.combo-box-3 .dropdown');
    const wardSelect = document.querySelector('.combo-box-4 .dropdown');
    const organizerInput = document.querySelector('.short-answer-4 .input-field');
    const eventInfoEditor = document.querySelector('.group-5 .editor');
    const organizerInfoEditor = document.querySelector('.group-9 .editor');
    
    // Lưu vào EventData
    EventData.name = eventNameInput.value.trim();
    EventData.category = categorySelect.value;
    EventData.addressName = addressNameInput.value.trim();
    EventData.streetNumber = streetInput.value.trim();
    EventData.province = provinceSelect.options[provinceSelect.selectedIndex]?.text || '';
    EventData.district = districtSelect.options[districtSelect.selectedIndex]?.text || '';
    EventData.ward = wardSelect.options[wardSelect.selectedIndex]?.text || '';
    EventData.organizerName = organizerInput.value.trim();
    EventData.content = eventInfoEditor.innerHTML;
    EventData.conditions = organizerInfoEditor.innerHTML;
    
    // Tạo location đầy đủ
    const locationParts = [
        EventData.streetNumber,
        EventData.addressName,
        EventData.ward,
        EventData.district,
        EventData.province
    ].filter(part => part);
    
    EventData.location = locationParts.join(', ');
    
    // Lưu description (dùng content làm description)
    EventData.description = eventInfoEditor.innerText.substring(0, 500);
    
    console.log('Saved Page 1 Data:', EventData);
}

// Setup nút Next Page
function setupNextPageButton() {
    nextButton.addEventListener('click', function() {
        saveFormData();        // 1. Lưu: name, category, location, content, conditions
        
        const errors = validatePage1Data();
        if (!showErrors(errors)) return;
        
        EventData.save();      // 2. Lưu vào localStorage
        
        window.location.href = 'taosukien2.html'; // 3. Chuyển trang
    });
}

function setupNavigationTabs() {
    // Tab 1: Thông tin (current page) - không cần làm gì
    const tab1 = document.querySelector('.overlap-group-wrapper .overlap-group');
    
    // Tab 2: Hình ảnh
    const tab2 = document.querySelector('.group-4 .overlap');
    if (tab2) {
        tab2.addEventListener('click', function() {
            saveFormData();
            EventData.save();
            window.location.href = 'taosukien2.html';
        });
    }
    
    // Tab 3: Vé và thời gian
    const tab3 = document.querySelector('.overlap-wrapper .overlap');
    if (tab3) {
        tab3.addEventListener('click', function() {
            saveFormData();
            EventData.save();
            window.location.href = 'taosukien3.html';
        });
    }
    
    // Tab 4: Cài đặt
    const tab4 = document.querySelector('.group-3 .overlap');
    if (tab4) {
        tab4.addEventListener('click', function() {
            saveFormData();
            EventData.save();
            window.location.href = 'taosukien4.html';
        });
    }
}