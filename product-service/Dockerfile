# ใช้ Node.js image
FROM node:18

# ตั้งค่าตำแหน่งทำงาน
WORKDIR /usr/src/app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์แหล่งข้อมูล
COPY . .

# เปิดพอร์ตที่ใช้
EXPOSE 3002

# คำสั่งเริ่มต้น
CMD ["node", "index.js"]