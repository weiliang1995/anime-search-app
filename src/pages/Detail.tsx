// src/pages/DetailPage.tsx
import React from "react";
import { useParams } from "react-router-dom";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">✨ Anime Details</h1>
      <div className="bg-gray-100 p-8 rounded-lg min-h-screen">
        <p>Loading details for Anime ID: **{id}**</p>
      </div>
    </div>
  );
};

export default DetailPage;
