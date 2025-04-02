document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const searchBox = document.getElementById("searchBox");
    const truyenList = document.getElementById("truyen-list");

    let darkMode = localStorage.getItem("darkMode") === "enabled";
    if (darkMode) {
        document.body.classList.add("dark-mode");
    }

    darkModeToggle.addEventListener("click", function () {
        darkMode = !darkMode;
        document.body.classList.toggle("dark-mode", darkMode);
        localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
    });

    const truyenData = [
        // Đam mỹ (20 bộ, bao gồm Ma Đạo Tổ Sư, Thiên Quan Tứ Phúc)
        { id: 1, ten: "Thiên Quan Tứ Phúc", tacGia: "Mặc Hương Đồng Khứu", theLoai: "Đam mỹ", hinhAnh: "thien-quan-tu-phuc.jpg" },
        { id: 2, ten: "Ma Đạo Tổ Sư", tacGia: "Mặc Hương Đồng Khứu", theLoai: "Đam mỹ", hinhAnh: "ma-dao-to-su.jpg" },
        { id: 3, ten: "Truyện Đam Mỹ 3", tacGia: "Tác giả X", theLoai: "Đam mỹ", hinhAnh: "dam-my-3.jpg" },
        { id: 4, ten: "Truyện Đam Mỹ 4", tacGia: "Tác giả Y", theLoai: "Đam mỹ", hinhAnh: "dam-my-4.jpg" },
        // ... thêm đủ 20 bộ
        
        // Bách hợp (20 bộ)
        { id: 21, ten: "Truyện Bách Hợp 1", tacGia: "Tác giả A", theLoai: "Bách hợp", hinhAnh: "bach-hop-1.jpg" },
        // ... thêm đủ 20 bộ

        // Ngôn tình (20 bộ)
        { id: 41, ten: "Truyện Ngôn Tình 1", tacGia: "Tác giả B", theLoai: "Ngôn tình", hinhAnh: "ngon-tinh-1.jpg" },
        // ... thêm đủ 20 bộ

        // Trinh thám (20 bộ)
        { id: 61, ten: "Truyện Trinh Thám 1", tacGia: "Tác giả C", theLoai: "Trinh thám", hinhAnh: "trinh-tham-1.jpg" },
        // ... thêm đủ 20 bộ

        // Cổ trang (20 bộ)
        { id: 81, ten: "Truyện Cổ Trang 1", tacGia: "Tác giả D", theLoai: "Cổ trang", hinhAnh: "co-trang-1.jpg" },
        // ... thêm đủ 20 bộ

        // Manga hot (15 bộ)
        { id: 101, ten: "Manga Hot 1", tacGia: "Tác giả E", theLoai: "Manga", hinhAnh: "manga-1.jpg" },
        // ... thêm đủ 15 bộ

        // Kinh dị (10 bộ)
        { id: 116, ten: "Truyện Kinh Dị 1", tacGia: "Tác giả F", theLoai: "Kinh dị", hinhAnh: "kinh-di-1.jpg" }
        // ... thêm đủ 10 bộ
    ];

    function hienThiTruyen(danhSach) {
        truyenList.innerHTML = "";
        danhSach.forEach(truyen => {
            const truyenDiv = document.createElement("div");
            truyenDiv.classList.add("truyen");
            truyenDiv.innerHTML = `
                <img src="images/${truyen.hinhAnh}" alt="${truyen.ten}">
                <h3>${truyen.ten}</h3>
                <p><b>Tác giả:</b> ${truyen.tacGia}</p>
                <p><b>Thể loại:</b> ${truyen.theLoai}</p>
                <button onclick="chonTruyen(${truyen.id})">Xem chi tiết</button>
            `;
            truyenList.appendChild(truyenDiv);
        });
    }

    searchBox.addEventListener("input", function () {
        const searchValue = searchBox.value.toLowerCase();
        const filteredTruyen = truyenData.filter(truyen => truyen.ten.toLowerCase().includes(searchValue));
        hienThiTruyen(filteredTruyen);
    });

    hienThiTruyen(truyenData);

    window.chonTruyen = function (id) {
        localStorage.setItem("truyenDangDoc", id);
        window.location.href = "list-tap.html"; // Chuyển sang trang chọn tập
    };
});
