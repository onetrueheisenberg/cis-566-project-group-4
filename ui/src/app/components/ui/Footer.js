import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Kitchen Delivery. All rights
          reserved.
        </p>
        <p className="text-xs">Designed and developed by your team.</p>
      </div>
    </footer>
  );
};

export default Footer;
