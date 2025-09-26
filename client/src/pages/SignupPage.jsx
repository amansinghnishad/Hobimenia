import React from "react";
import { motion } from "framer-motion";
import { Card } from "../components/ui";
import SignupHeader from "../components/SignupPage/SignupHeader";
import SignupForm from "../components/SignupPage/SignupForm";
import SignupFooter from "../components/SignupPage/SignupFooter";

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 shadow-xl">
          <SignupHeader />
          <SignupForm />
          <SignupFooter />
        </Card>
      </motion.div>
    </div>
  );
};

export default SignupPage;
