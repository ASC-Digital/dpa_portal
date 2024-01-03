import React from "react";

export const Avatar = ({ photoUrl, name }) => {
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }
  return (
    <div>
      {isValidUrl(photoUrl) ? (
        <img
          src={photoUrl}
          alt="foto"
          style={{
            borderRadius: "100%",
            height: 50,
            width: 50,
          }}
        />
      ) : (
        <div
          style={{
            backgroundColor: "blue",
            textAlign: "center",
            color: "white",
            height: 40,
            width: 40,
            borderRadius: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>{name}</div>
        </div>
      )}
    </div>
  );
};
