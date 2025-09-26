import React from "react";
import { motion } from "framer-motion";
import { Card } from "../components/ui";
import LoginHeader from "../components/LoginPage/LoginHeader";
import LoginForm from "../components/LoginPage/LoginForm";
import LoginFooter from "../components/LoginPage/LoginFooter";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 shadow-xl">
          <LoginHeader />
          <LoginForm />
          <LoginFooter />
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
