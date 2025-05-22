import User from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

const createUser = async (req, res) => {
    try{
        const { username, password } = req.body;

        // Cek apakah username sudah ada
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Encrypt dan menyimpan password
        const encryptPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            password: encryptPassword,
        });

        res.status(201).json({ message: "User created successfully" });
    }   catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const loginHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    if (user) {
      const userPlain = user.toJSON(); // Konversi ke object
      const { password: _, refresh_token: __, ...safeUserData } = userPlain;

      const decryptPassword = await bcrypt.compare(password, user.password);
      if (decryptPassword) {
        const accessToken = jwt.sign(
          safeUserData,
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30m",
          }
        );
        const refreshToken = jwt.sign(
          safeUserData,
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );
        await User.update(
          { refreshToken: refreshToken }, //var:val
          {
            where: {
              id: user.id,
            },
          }
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: false, //ngatur cross-site scripting, untuk penggunaan asli aktifkan karena bisa nyegah serangan fetch data dari website "document.cookies"
          sameSite: "none", //ini ngatur domain yg request misal kalo strict cuman bisa akseske link dari dan menuju domain yg sama, lax itu bisa dari domain lain tapi cuman bisa get
          maxAge: 24 * 60 * 60 * 1000,
          secure: true, //ini ngirim cookies cuman bisa dari https, kenapa? nyegah skema MITM di jaringan publik, tapi pas development di false in aja
        });
        res.status(200).json({
          status: "Succes",
          message: "Login Berhasil",
          safeUserData,
          accessToken,
        });
      } else {
        res.status(400).json({
          status: "Failed",
          message: "Paassword atau email salah",
        });
      }
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Paassword atau email salah",
      });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await User.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user.refresh_token) return res.sendStatus(204);
  const userId = user.id;
  await User.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
export {
  getUsers,
  createUser,
  loginHandler,
  logout,
};