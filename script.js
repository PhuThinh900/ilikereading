// Mã đăng nhập và chuyển sang trang chủ
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Kiểm tra thông tin đăng nhập
    if (username === "admin" && password === "admin") {
        document.querySelector(".login-container").style.display = "none";
        document.getElementById("homePage").style.display = "block";
    } else {
        document.getElementById("error-message").innerText = "Thông tin đăng nhập không chính xác";
    }
});

// Hàm hiển thị danh sách thể loại truyện
function showCategory(category) {
    var categoryDetails = document.getElementById("categoryDetails");
    categoryDetails.innerHTML = ""; // Reset nội dung cũ

    var categoryData = {
        const booksData = {
    dammy: [
        { title: "Ma Đạo Tổ Sư", author: "Mặc Hương Đồng Khứu", image: "images/ma_dao_to_su.jpg", chapters: 120 },
        { title: "Thiên Quan Tứ Phúc", author: "Mặc Hương Đồng Khứu", image: "images/thien_quan_tu_phuc.jpg", chapters: 60 },
        { title: "Mưu Sắc", author: "Quân Tử", image: "images/muu_sac.jpg", chapters: 99 },
        { title: "Người Cũ", author: "Vũ Hòa", image: "images/nguoi_cu.jpg", chapters: 82 },
        { title: "Hoa Mộng", author: "Nhật Hạ", image: "images/hoa_mong.jpg", chapters: 98 },
        { title: "Giới Tính Bí Ẩn", author: "Trần Tâm", image: "images/gioi_tinh_bi_an.jpg", chapters: 115 },
        { title: "Phòng Đêm", author: "Lý Quân", image: "images/phong_dem.jpg", chapters: 134 },
        { title: "Đôi Mắt Đẫm Mưa", author: "Nguyễn Hạnh", image: "images/doi_mat_dam_mua.jpg", chapters: 123 },
        { title: "Trái Tim Hoang Dã", author: "Mai Sơn", image: "images/trai_tim_hoang_da.jpg", chapters: 76 },
        { title: "Câu Chuyện Cũ", author: "Hà Mộc", image: "images/cau_chuyen_cu.jpg", chapters: 92 },
        { title: "Tiếng Gọi Tình Yêu", author: "Nguyễn Hòa", image: "images/tieng_goi_tinh_yeu.jpg", chapters: 108 },
        { title: "Nụ Cười Đẹp", author: "Hứa Quân", image: "images/nu_cuoi_dep.jpg", chapters: 85 },
        { title: "Nhớ Em", author: "Lê Thương", image: "images/nho_em.jpg", chapters: 120 },
        { title: "Lạnh Lùng Mặt Trời", author: "Cao Cường", image: "images/lanh_lung_mat_troi.jpg", chapters: 79 },
        { title: "Tình Yêu Ngọt Ngào", author: "Trịnh Thị", image: "images/tinh_yeu_ngot_ngao.jpg", chapters: 99 },
        { title: "Ánh Đèn Mờ Nhạt", author: "Lâm Tuyết", image: "images/anh_den_mo_nhat.jpg", chapters: 72 },
        { title: "Hồn Ma Tình Ái", author: "Vũ Thu", image: "images/hon_ma_tinh_ai.jpg", chapters: 111 },
        { title: "Chìm Trong Ký Ức", author: "Thiên Kỳ", image: "images/chim_trong_ky_uc.jpg", chapters: 85 },
        { title: "Đoạn Đường Chúng Ta", author: "Mỹ Lan", image: "images/doan_duong_chung_ta.jpg", chapters: 90 },
        { title: "Chỉ Cần Em", author: "Diệp Như", image: "images/chi_can_em.jpg", chapters: 105 }
    ],
    bachhop: [
        { title: "Nhớ Em Như Chờ Đợi", author: "Hoàng Lan", image: "images/nhot_em_nhu_cho_doi.jpg", chapters: 120 },
        { title: "Người Đến Sau", author: "Nguyễn Thiên Nga", image: "images/nguoi_den_sau.jpg", chapters: 150 },
        { title: "Em Là Của Anh", author: "Lê Thu", image: "images/em_la_cua_anh.jpg", chapters: 130 },
        { title: "Tình Yêu Ngọt Ngào", author: "Hạ Linh", image: "images/tinh_yeu_ngot_ngao.jpg", chapters: 115 },
        { title: "Sợi Dây Tình Ái", author: "Lý Thư", image: "images/soi_day_tinh_ai.jpg", chapters: 105 },
        { title: "Là Em Được Không", author: "Lê Vân", image: "images/la_em_duoc_khong.jpg", chapters: 110 },
        { title: "Trái Tim Của Tôi", author: "Mai Thảo", image: "images/trai_tim_cua_toi.jpg", chapters: 85 },
        { title: "Cô Gái Hạnh Phúc", author: "Ngọc Anh", image: "images/co_gai_hanh_phuc.jpg", chapters: 120 },
        { title: "Chờ Em Đến", author: "Minh Phương", image: "images/cho_em_den.jpg", chapters: 95 },
        { title: "Ánh Mắt Tình Yêu", author: "Hồng Quế", image: "images/anh_mat_tinh_yeu.jpg", chapters: 125 },
        { title: "Tôi Và Cô Gái Đó", author: "Lan Anh", image: "images/toi_va_co_gai_do.jpg", chapters: 90 },
        { title: "Dịu Dàng Trái Tim", author: "Trúc Mai", image: "images/dieu_dang_trai_tim.jpg", chapters: 110 },
        { title: "Bên Nhau Dài Lâu", author: "Tú Anh", image: "images/ben_nhau_dai_lau.jpg", chapters: 120 },
        { title: "Tình Đầu Của Tôi", author: "Kim Hương", image: "images/tinh_dau_cua_toi.jpg", chapters: 140 },
        { title: "Em Là Của Anh", author: "Lưu Bình", image: "images/em_la_cua_anh.jpg", chapters: 105 },
        { title: "Ngày Đầu Cũng Là Cuối", author: "Tú Anh", image: "images/ngay_dau_cung_la_cuoi.jpg", chapters: 95 },
        { title: "Chúng Ta Là Một", author: "Minh Châu", image: "images/chung_ta_la_mot.jpg", chapters: 110 },
        { title: "Người Con Gái Tốt", author: "Hương Lan", image: "images/nguoi_con_gai_tot.jpg", chapters: 100 },
        { title: "Lời Nói Dối Của Anh", author: "Ngọc Minh", image: "images/loi_noi_doi_cua_anh.jpg", chapters: 95 }
    ],
    ngontinh: [
        { title: "Nỗi Đau Khó Quên", author: "Lý Quý Hoa", image: "images/noi_dau_kho_quen.jpg", chapters: 98 },
        { title: "Duyên Nợ Lối Xưa", author: "Nguyễn Tuấn Anh", image: "images/duyen_no_voi_xua.jpg", chapters: 130 },
        { title: "Tình Nguyện Cầu", author: "Vũ Lan", image: "images/tinh_nguyen_cau.jpg", chapters: 115 },
        { title: "Lúc Mới Đầu", author: "Nguyễn Hương", image: "images/luc_moi_dau.jpg", chapters: 98 },
        { title: "Thật Lòng", author: "Bích Lan", image: "images/that_long.jpg", chapters: 120 },
        { title: "Điều Không Nói", author: "Phạm Kiều", image: "images/dieu_khong_noi.jpg", chapters: 110 },
        { title: "Chạm Vào Tình Yêu", author: "Kim Hạ", image: "images/cham_vao_tinh_yeu.jpg", chapters: 108 },
        { title: "Tình Yêu Lỗi Lầm", author: "Nguyễn Hoa", image: "images/tinh_yeu_loi_lam.jpg", chapters: 130 },
        { title: "Đoạn Đường Chúng Ta", author: "Lan Anh", image: "images/doan_duong_chung_ta.jpg", chapters: 95 },
        { title: "Một Ngày Khác", author: "Vân Anh", image: "images/mot_ngay_khac.jpg", chapters: 105 },
        { title: "Tình Yêu Cuối Cùng", author: "Lưu Mai", image: "images/tinh_yeu_cuoi_cung.jpg", chapters: 125 },
        { title: "Thời Gian Đã Qua", author: "Hạ Linh", image: "images/thoi_gian_da_qua.jpg", chapters: 120 },
        { title: "Chúng Ta Cùng Lớn Lên", author: "Ngọc Lan", image: "images/chung_ta_cung_lon_len.jpg", chapters: 100 },
        { title: "Lý Do Tình Yêu", author: "Tú Anh", image: "images/ly_do_tinh_yeu.jpg", chapters: 95 },
        { title: "Gặp Lại Em", author: "Quỳnh Lan", image: "images/gap_lai_em.jpg", chapters: 110 },
        { title: "Chờ Một Tình Yêu", author: "Thùy Linh", image: "images/cho_mot_tinh_yeu.jpg", chapters: 125 }
    ],
    trinhtham: [
        { title: "Câu Chuyện Bí Ẩn", author: "Nguyễn Hoàng", image: "images/cau_chuyen_bi_an.jpg", chapters: 85 },
        { title: "Đoán Được Sự Thật", author: "Trí Dũng", image: "images/doan_duoc_su_that.jpg", chapters: 102 },
        { title: "Điều Không Ngờ", author: "Lê Minh", image: "images/dieu_khong_ngo.jpg", chapters: 120 },
        { title: "Ám Mưu Tinh Vi", author: "Mai Duy", image: "images/am_muu_tinh_vi.jpg", chapters: 110 },
        { title: "Mật Mã Tội Ác", author: "Vũ Hòa", image: "images/mat_ma_toi_ac.jpg", chapters: 98 },
        { title: "Lỗ Hổng Lý Thuyết", author: "Thu Thanh", image: "images/lo_hong_ly_thuyet.jpg", chapters: 112 },
        { title: "Điều Tra Bí Ẩn", author: "Tuyết Lan", image: "images/dieu_tra_bi_an.jpg", chapters: 135 },
        { title: "Vụ Án Kép", author: "Trúc Linh", image: "images/vu_an_kep.jpg", chapters: 112 },
        { title: "Tội Ác Hoàn Hảo", author: "Hoàng Quân", image: "images/toi_ac_hoan_hao.jpg", chapters: 95 },
        { title: "Linh Hồn Bí Ẩn", author: "Trần Thiên", image: "images/linh_hon_bi_an.jpg", chapters: 90 },
        { title: "Kẻ Giết Người", author: "Mỹ Lan", image: "images/ke_giet_nguoi.jpg", chapters: 120 },
        { title: "Ám Ảnh Từ Quá Khứ", author: "Vũ Duy", image: "images/am_anh_tu_qua_khu.jpg", chapters: 100 },
        { title: "Bí Ẩn Chết Người", author: "Trí Dũng", image: "images/bi_an_chet_nguoi.jpg", chapters: 80 },
        { title: "Vụ Án Không Thể Giải", author: "Lâm Ngọc", image: "images/vu_an_khong_the_giai.jpg", chapters: 140 },
        { title: "Cuộc Điều Tra Ngầm", author: "Lê Thu", image: "images/cuoc_dieu_tra_ngam.jpg", chapters: 98 },
        { title: "Bức Màn Bí Mật", author: "Mỹ Linh", image: "images/buc_man_bi_mat.jpg", chapters: 103 },
        { title: "Ám Mưu Lẩn Khuất", author: "Thiên Lý", image: "images/am_muu_lan_khuat.jpg", chapters: 120 },
        { title: "Kẻ Bị Nghi Ngờ", author: "Trần Duy", image: "images/ke_bi_nghi_ngo.jpg", chapters: 110 }
    ],
    manga: [
        { title: "Naruto", author: "Masashi Kishimoto", image: "images/naruto.jpg", chapters: 700 },
        { title: "One Piece", author: "Eiichiro Oda", image: "images/one_piece.jpg", chapters: 1040 },
        { title: "Attack on Titan", author: "Hajime Isayama", image: "images/attack_on_titan.jpg", chapters: 139 },
        { title: "My Hero Academia", author: "Kohei Horikoshi", image: "images/my_hero_academia.jpg", chapters: 380 },
        { title: "Demon Slayer", author: "Koyoharu Gotouge", image: "images/demon_slayer.jpg", chapters: 205 },
        { title: "Tokyo Ghoul", author: "Sui Ishida", image: "images/tokyo_ghoul.jpg", chapters: 144 },
        { title: "Fullmetal Alchemist", author: "Hiromu Arakawa", image: "images/fullmetal_alchemist.jpg", chapters: 108 },
        { title: "Dragon Ball", author: "Akira Toriyama", image: "images/dragon_ball.jpg", chapters: 519 },
        { title: "Bleach", author: "Tite Kubo", image: "images/bleach.jpg", chapters: 686 },
        { title: "Death Note", author: "Tsugumi Ohba", image: "images/death_note.jpg", chapters: 108 },
        { title: "One Punch Man", author: "Yusuke Murata", image: "images/one_punch_man.jpg", chapters: 120 },
        { title: "Fairy Tail", author: "Hiro Mashima", image: "images/fairy_tail.jpg", chapters: 545 },
        { title: "Jujutsu Kaisen", author: "Gege Akutami", image: "images/jujutsu_kaisen.jpg", chapters: 231 },
        { title: "Hunter x Hunter", author: "Yoshihiro Togashi", image: "images/hunter_x_hunter.jpg", chapters: 390 },
        { title: "Black Clover", author: "Yūki Tabata", image: "images/black_clover.jpg", chapters: 305 }
    ],
    kinhdi: [
        { title: "The Walking Dead", author: "Robert Kirkman", image: "images/the_walking_dead.jpg", chapters: 193 },
        { title: "Resident Evil", author: "Naoki Serizawa", image: "images/resident_evil.jpg", chapters: 60 },
        { title: "Hellsing", author: "Kouta Hirano", image: "images/hellsing.jpg", chapters: 96 },
        { title: "Gantz", author: "Hiroya Oku", image: "images/gantz.jpg", chapters: 383 },
        { title: "The Promised Neverland", author: "Kaiu Shirai", image: "images/the_promised_neverland.jpg", chapters: 181 },
        { title: "Berserk", author: "Kentaro Miura", image: "images/berserk.jpg", chapters: 364 },
        { title: "Parasyte", author: "Hitoshi Iwaaki", image: "images/parasyte.jpg", chapters: 64 },
        { title: "Tokyo Ghoul:re", author: "Sui Ishida", image: "images/tokyo_ghoul_re.jpg", chapters: 179 },
        { title: "Zom 100: Bucket List of the Dead", author: "Haro Aso", image: "images/zom_100.jpg", chapters: 91 },
        { title: "Gyo", author: "Junji Ito", image: "images/gyo.jpg", chapters: 2 }
    ]
};

    var categoryList = categoryData[category];
    var listHTML = "<h3>" + category.charAt(0).toUpperCase() + category.slice(1) + "</h3>";
    listHTML += "<ul>";
    categoryList.forEach(function (item) {
        listHTML += "<li><img src='" + item.image + "' alt='" + item.title + "' style='width:50px;height:75px;'><br><strong>" + item.title + "</strong><br> Tác giả: " + item.author + "<br>Số tập: " + item.chapters + "</li>";
    });
    listHTML += "</ul>";

    categoryDetails.innerHTML = listHTML;
}

// Chuyển chế độ tối sáng
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    document.querySelector("header").classList.toggle("dark-mode");
    document.querySelector(".home-container").classList.toggle("dark-mode");
    var buttons = document.querySelectorAll("button");
    buttons.forEach(function(button) {
        button.classList.toggle("dark-mode");
    });
}
