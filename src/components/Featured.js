"use client"

import React from 'react';

function ResourceCard({ id, title, description }) {
  const handleClick = () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="bg-white rounded shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Featured() {
  const resources = [
    {
      id: "digital-collections",
      title: "Bộ sưu tập kỹ thuật số",
      description: "Khám phá các bộ sưu tập kỹ thuật số của chúng tôi, bao gồm sách điện tử, bài báo và nhiều hơn nữa.",
      details: "Bộ sưu tập kỹ thuật số của chúng tôi có hơn 100.000 sách điện tử, 50.000 bài báo học thuật và nhiều tài nguyên đa phương tiện. Truy cập các tài liệu này 24/7 từ bất kỳ đâu với thẻ thư viện của bạn. Các bộ sưu tập phổ biến bao gồm Lưu trữ Báo Cổ, Cơ sở dữ liệu Tạp chí Khoa học và Bộ sách điện tử Văn học Cổ điển."
    },
    {
      id: "research-guides",
      title: "Hướng dẫn nghiên cứu",
      description: "Nhận trợ giúp cho nghiên cứu của bạn, từ việc tìm kiếm nguồn đến trích dẫn công việc của bạn.",
      details: "Hướng dẫn nghiên cứu của chúng tôi bao gồm nhiều chủ đề và lĩnh vực. Mỗi hướng dẫn do các thủ thư chuyên gia biên soạn và bao gồm các cơ sở dữ liệu được khuyến nghị, các tài nguyên chính và mẹo cho chiến lược nghiên cứu hiệu quả. Chúng tôi cung cấp hướng dẫn cho các môn phổ biến như Lịch sử, Sinh học, Khoa học Máy tính và Văn học, cũng như các chủ đề chuyên ngành như Trực quan hóa Dữ liệu và Đánh giá Hệ thống."
    },
    {
      id: "study-spaces",
      title: "Khu vực học tập",
      description: "Tìm một chỗ yên tĩnh để học, làm việc nhóm hoặc làm việc trên một dự án.",
      details: "Thư viện của chúng tôi cung cấp nhiều khu vực học tập phù hợp với các nhu cầu khác nhau. Chúng tôi có các phòng đọc im lặng, khu vực học nhóm và không gian hợp tác có công nghệ hỗ trợ. Các tiện nghi bao gồm ánh sáng có thể điều chỉnh, nội thất tiện nghi và ổ cắm điện tại mỗi chỗ ngồi. Đặt phòng học riêng trực tuyến hoặc sử dụng các khu vực mở theo nguyên tắc ai đến trước, phục vụ trước."
    },
    {
      id: "library-hours",
      title: "Giờ hoạt động của thư viện",
      description: "Mở cửa từ Thứ Hai - Thứ Sáu: 8h - 22h, Thứ Bảy - Chủ Nhật: 10h - 20h",
      details: "Giờ Thư viện Chính:\nThứ Hai - Thứ Sáu: 8h - 22h\nThứ Bảy - Chủ Nhật: 10h - 20h\n\nBộ sưu tập Đặc biệt:\nThứ Hai - Thứ Sáu: 9h - 17h\nThứ Bảy: 10h - 16h\nChủ Nhật: Đóng cửa\n\nLưu ý: Giờ có thể thay đổi trong các ngày lễ và kỳ thi. Kiểm tra trang web của chúng tôi hoặc gọi điện để có thông tin cập nhật nhất."
    },
    {
      id: "meet-staff",
      title: "Gặp gỡ Nhân viên",
      description: "Các thủ thư của chúng tôi luôn sẵn sàng hỗ trợ! Ghé qua bàn thông tin hoặc đặt lịch hẹn tư vấn.",
      details: "Đội ngũ nhân viên của chúng tôi bao gồm các chuyên gia về môn học, thủ thư nghiên cứu và các chuyên gia công nghệ. Gặp gỡ một số thành viên trong nhóm của chúng tôi:\n\n- Lê Tất Đạt, Thủ thư Trưởng (chuyên về Văn học và Lịch sử)\n- Lê Hoàng Long, Thủ thư Hỗ trợ Nghiên cứu (tập trung vào STEM)\n- Nguyễn Như Huy Hoàng, Điều phối viên Tài nguyên Kỹ thuật số\n- Nguyễn Nhật Anh, Chuyên gia Công nghệ Thông tin\n- Vũ Quang Dũng."
    }
  ];

  return (
    <>
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Nguồn tài nguyên nổi bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {resources.map(resource => (
              <ResourceCard
                key={resource.id}
                id={resource.id}
                title={resource.title}
                description={resource.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed information sections */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto">
          {resources.map(resource => (
            <div key={resource.id} id={resource.id} className="mb-12">
              <h3 className="text-2xl font-bold mb-4">{resource.title}</h3>
              <p className="whitespace-pre-line">{resource.details}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Featured;
