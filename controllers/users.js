import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Users = db.users;

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attribute: ["email", "phone"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

export const Register = async (req, res) => {
  const { firstname, lastname, gender, email, phone, birthdate, password, confPassword } = req.body;
  if (password !== confPassword)
    return res.status(400).json({
      msg: "password dan confirm password tidak cocok",
    });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      email: email,
      phone: phone,
      birthdate: birthdate,
      password: hashPassword,
    });
    res.json({ msg: "Registrasi berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Password salah" });
    const userId = user[0].id;
    const firstname = user[0].firstname;
    const lastname = user[0].lastname;
    const gender = user[0].gender;
    const email = user[0].email;
    const phone = user[0].phone;
    const birthdate = user[0].birthdate;
    const accessToken = jwt.sign({ userId, firstname, lastname, gender, email, phone, birthdate }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ userId, firstname, lastname, gender, email, phone, birthdate }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 80 * 1000,
    });

    const data = { email, phone, accessToken };
    res.status(200).json({
      success: true,
      message: "Login berhasil",
      data: data,
    });
    res.json;
  } catch (error) {
    res.status(404).json({ msg: "Email tidak ditemukan" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.sendStatus(204);

  try {
    const user = await Users.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user) return res.sendStatus(204);

    const userId = user.id;

    await Users.update(
      { refresh_token: null },
      {
        where: {
          id: userId,
        },
      }
    );

    res.clearCookie("refreshToken");
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
