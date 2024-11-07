"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Facebook, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Về Thư Viện Của Chúng Tôi
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Giới Thiệu Về Thư Viện</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Chào mừng bạn đến với thư viện trực tuyến của chúng tôi! Đây là
              nơi bạn có thể khám phá, tìm kiếm và đọc hàng ngàn cuốn sách miễn
              phí từ khắp nơi trên thế giới. Thư viện của chúng tôi được tạo ra
              với mục đích mang đến kiến thức và niềm vui đọc sách cho mọi
              người, mọi lúc, mọi nơi.
            </p>
            <p>
              Với giao diện thân thiện và dễ sử dụng, bạn có thể dễ dàng tìm
              kiếm sách theo thể loại, tác giả hoặc từ khóa. Chúng tôi liên tục
              cập nhật và mở rộng bộ sưu tập sách để đáp ứng nhu cầu đa dạng của
              độc giả.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Về Người Sáng Lập</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-32 h-32">
              <AvatarImage
                src="/placeholder.svg?height=128&width=128"
                alt="Lê Tất Đạt"
              />
              <AvatarFallback>LTĐ</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Lê Tất Đạt</h2>
              <p className="mb-4">
                Xin chào! Tôi là Lê Tất Đạt, người sáng lập và phát triển thư
                viện trực tuyến này. Với niềm đam mê công nghệ và tình yêu sách,
                tôi đã tạo ra nền tảng này để chia sẻ kiến thức và khuyến khích
                việc đọc sách trong cộng đồng.
              </p>
              <p className="mb-4">
                Tốt nghiệp ngành Công nghệ Thông tin, tôi luôn mong muốn kết hợp
                kỹ năng lập trình của mình với sứ mệnh phổ biến văn hóa đọc. Thư
                viện này là kết quả của ước mơ đó, và tôi hy vọng nó sẽ trở
                thành nguồn tài nguyên quý giá cho mọi người.
              </p>
              <div className="flex gap-4">
                <Link
                  href="https://github.com/yourusername"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://linkedin.com/in/yourusername"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="https://facebook.com/yourusername"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
