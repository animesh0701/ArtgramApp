import React, { useContext, useState } from "react";
import { SignInBtn } from "../../components";
import { UserContext, UserContextProvider } from "../../contexts/user";
import "./style.css";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { db, storage } from "../../firebase";
import makeid from "../../helper/functions";
import firebase from "firebase/compat/app";

export function CreatePost() {
  const [user, setUser] = useContext(UserContext).user;
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);

      let selectedSrc = URL.createObjectURL(e.target.files[0]);

      let imagePreview = document.getElementById("image-preview");

      imagePreview.src = selectedSrc;
      imagePreview.style.display = "block";
    }
  };

  const handleUpload = () => {
    if (image) {
      var imageName = makeid(10);
      const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          //getdownload URL and upload the post information
          storage
            .ref("images")
            .child(`${imageName}.jpg`)
            .getDownloadURL()
            .then((imageURL) => {
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                photoURL: imageURL,
                username: user.email.replace("@gmail.com", ""),
                profileUrl: user.photoURL,
              });
            });

          setCaption("");
          setProgress(0);
          setImage(null);
          document.getElementById("image-preview").style.display = "none";
        }
      );
    }
  };

  return (
    <div className="createpost">
      {user ? (
        <div className="createpost__loggedIn">
          <p>Create a post</p>
          <div className="createpost__loggedInCenter">
            <textarea
              className="createpost__textarea"
              placeholder="Enter your caption"
              rows="3"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
            <div className="createpost__imgpreview">
              <img id="image-preview" alt="" />
            </div>
          </div>
          <div className="createpost__uploadwrapper">
            <label htmlFor="fileInput">
              <AddAPhotoIcon
                style={{ cursor: "pointer", fontSize: "30px", color: "white" }}
              />
            </label>
            <div className="createpost__imageupload">
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button
              className="createpost__uploadbutton"
              onClick={handleUpload}
              style={{ color: caption ? "white" : "lightgrey" }}
            >
              {`UPLOAD ${progress !== 0 ? progress : ""}`}
            </button>
          </div>
        </div>
      ) : (
        <div className="createpost__loggedOut">
          <SignInBtn />
          <span className="description">to Post & Comment</span>
        </div>
      )}
    </div>
  );
}
