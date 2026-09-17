# Câu 51: Khai báo Node.js Image làm Base Image
FROM node:20-alpine

# Câu 52: Thiết lập thư mục làm việc bên trong Frontend Container
WORKDIR /app

# Câu 53: Sao chép package.json và package-lock.json vào Container
COPY package*.json ./

# Câu 54: Cài đặt các package của React Application
RUN npm install

# Câu 55: Sao chép source code React vào Container
COPY . .

# Câu 56: Build React Application trong quá trình xây dựng Docker Image
RUN npm run build

# (Bổ sung bắt buộc để Container duy trì hoạt động sau khi build)
# Nếu dùng Vite (chạy port 5173), dùng lệnh: CMD ["npm", "run", "preview"]
# Dùng Create React App (chạy port 3000), dùng lệnh: CMD ["npm", "start"]
CMD ["npm", "run", "preview"]

