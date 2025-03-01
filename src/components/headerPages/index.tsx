import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./styles.css";

interface HeaderPagesProps {
    title: string;
}

export const HeaderPages: React.FC<HeaderPagesProps> = ({ title }) => {
    const navigate = useNavigate();

    return (
        <div className="header-pages">
            <h1>{title}</h1>
            <div className="home-button">
                <HomeOutlined className="home-icon" onClick={() => navigate("/")} />
            </div>
        </div>
    );
};