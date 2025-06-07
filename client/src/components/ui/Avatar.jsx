import { motion } from "framer-motion";

// Modern avatar component
const Avatar = ({
  src,
  alt = "",
  size = "md",
  fallback = "?",
  className = "",
  online = false,
  onClick,
  ...props
}) => {
  const sizes = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-xl",
    "2xl": "w-32 h-32 text-2xl",
    "3xl": "w-40 h-40 text-3xl",
  };

  const baseClasses = `
    relative inline-flex items-center justify-center rounded-full
    bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium
    ${sizes[size]} ${onClick ? "cursor-pointer" : ""} ${className}
  `;

  return (
    <motion.div
      className={baseClasses}
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      onClick={onClick}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span>{fallback.charAt(0).toUpperCase()}</span>
      )}

      {online && (
        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
      )}
    </motion.div>
  );
};

export default Avatar;
