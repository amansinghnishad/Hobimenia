import { motion } from "framer-motion";

// Modern card component
const Card = ({
  children,
  className = "",
  padding = "md",
  shadow = "md",
  hover = false,
  ...props
}) => {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    none: "",
  };

  const shadowClasses = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    none: "shadow-none",
  };

  const baseClasses = `
    bg-white rounded-xl border border-gray-100
    ${paddingClasses[padding]}
    ${shadowClasses[shadow]}
    ${className}
  `;

  const hoverProps = hover
    ? {
        whileHover: {
          y: -4,
          transition: { duration: 0.2 },
        },
        className: `${baseClasses} hover:shadow-xl transition-shadow duration-200`,
      }
    : {
        className: baseClasses,
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...hoverProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
