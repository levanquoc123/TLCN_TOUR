var User = require('../models').User;
var Role = require('../models').Role;
var UserRole = require('../models').UserRole;

const nodemailer = require('nodemailer')
var smtpTransport = require("nodemailer-smtp-transport");

// const transporter = nodemailer.createTransport(
//     smtpTransport({
//       service: "gmail",
//       host: "smtp.gmail.com",
//       secure: false,
//       auth: {
//         user: process.env.EMAIL_FROM,
//         pass: process.env.PASSWORD,
//       }
//     })
//   );
exports.create = (req, res) => {
    User.create(req.body, { include: [UserRole] }).then(data => {
        // const emailData = {
        //     from: process.env.EMAIL_FROM,
        //     to: req.body.email,
        //     subject: `Tạo Tài Khoản Mới`,
        //     html: `
        //               <h1>Bạn đã tạo tài khoản thành công!!!</h1>
        //                 <h1>nhấp vào đây để đăng nhập: </h1>
        //               <p>${process.env.CLIENT_URL}auth//</p>
        //               <hr />
                     
        //           `,
        //   };
        // transporter.sendMail(emailData)
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findall = (req, res) => {
    User.findAll({ attributes: ['id', 'name', 'gioitinh', 'email', 'avatar', "diachi", "sdt", "ngaysinh", "status"], order: [["id", "DESC"]], include: [Role, UserRole] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findone = (req, res) => {
    User.findOne({ where: { id: req.params.id }, include: [Role] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.delete = (req, res) => {
    User.destroy({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.update = (req, res) => {
    User.update(req.body, { where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.checkemail = (req, res) => {
    User.findOne({ where: { email: req.params.email } }).then(data => {
        console.log(req.params.email);
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
