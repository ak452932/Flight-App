import { supabase } from '../config/supabase.js';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return res.status(401).json({ message: error.message });
    console.log("Login successful for:", email);

    res.status(200).json({
      message: "Login successful",
      token: data.session.access_token,
      user: data.user
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
