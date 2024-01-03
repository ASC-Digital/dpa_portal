const ProfileImage = ({ image = "", width = "50", height = "50" }) => {
  return (
    <img
      className="img-profile rounded-circle"
      src={
        image
          ? image
          : "https://sb-admin-pro.startbootstrap.com/assets/img/illustrations/profiles/profile-1.png"
      }
      alt=""
      width={width}
      height={height}
    />
  );
};

export default ProfileImage;
