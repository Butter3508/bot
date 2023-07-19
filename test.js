const str = `---------------
14.08 tps  -  57 players  -  0 ping - restart từ 1h 41s trước
Website: coming soon
Discord: https://discord.gg/6jpcR8GUtu
Nếu bạn thích server này hãy cùng ủng hộ duy trì nó nhé, nhờ vào mọi người.
Server duy trì 100% vào tiền donate của player , mong bạn góp một phần công sức để duy trì nó.
/help để hiển thị hết tất cả các lệnh.`

const tpsStr = str.trim().substring(16, str.indexOf(' tps'))

console.log(tpsStr)