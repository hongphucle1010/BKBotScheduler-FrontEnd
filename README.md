# Project BKBotScheduler

Deployments: 
- [Frontend](https://bkbotscheduler.vercel.app)

Công nghệ sử dụng:
- Framework [ReactJS](https://reactjs.org/) 
- Ngôn ngữ [TypeScript](https://www.typescriptlang.org/).
- [Tailwind CSS](https://tailwindcss.com/) và [Flowbite](https://flowbite.com/) để thiết kế giao diện.
- [Vite](https://vitejs.dev/) để build project.
- [ESLint](https://eslint.org/) và [Prettier](https://prettier.io/) để kiểm tra code và format code.
- Backend repository: https://github.com/trongvan245/BKScheduler_BE


## Thành viên tham gia project

- 2212615 - Lê Hồng Phúc
- 2210265 - Thái Nguyễn Gia Bảo
- 2211573 - Nguyễn Phúc Gia Khiêm
- 2211605 - Lê Văn Anh Khoa
- 2211834 - Đỗ Thanh Liêm
- 2213046 - Võ Thanh Tâm
- 2213915 - Bùi Trọng Văn

## Yêu cầu
- [Node.js](https://nodejs.org/) (khuyến nghị sử dụng phiên bản 14.x hoặc mới hơn)
- [npm](https://www.npmjs.com/)

## Cài đặt

```bash
# Clone Repository
git clone https://github.com/hongphucle1010/BKBotScheduler-FrontEnd

# Move to repository folder
cd HCMUT_SSPS

# Cài đặt các gói phụ thuộc
npm install
```

Sau khi cài đặt xong, ta còn cần phải thực hiện thêm biến môi trường cho project. Tạo file `.env` trong thư mục gốc của project và thêm các biến môi trường sau:

```env
VITE_BACKEND_URL=YOUR_BACKEND_URL
VITE_GOOGLE_OAUTH_CLIENT_ID=YOUR_GOOGLE_OAUTH_CLIENT_ID
```

## Chạy code trong chế độ dev
```bash
npm run dev
```

## Test chương trình
```bash
npm run test:ui
```

## Build chương trình
```bash
npm run build
```
Mặc định file được build sẽ được tạo trong thư mục `dist`