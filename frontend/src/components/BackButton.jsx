import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BackButton = ({ destination = "/" }) => {
  return (
    <div>
      <Link to={destination}>Back</Link>
    </div>
  );
};

export default BackButton;
