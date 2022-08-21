import React, { useContext, useState } from "react";
import { Comment, CommentInput } from "../../components";
import { UserContext } from "../../contexts/user";
import { db, storage } from "../../firebase";
import "./style.css";

export const Post = ({
  profileURL,
  username,
  id,
  photoURL,
  caption,
  comments,
}) => {
  const [user, setUser] = useContext(UserContext).user;

  const deletePost = () => {
    //deleteimage from firebase storage
    if (username === user.email.replace("@gmail.com", "")) {
      //get ref to image by URL
      var imageRef = storage.refFromURL(photoURL);

      //delete file
      imageRef
        .delete()
        .then(() => {
          console.log("deleted");
        })
        .catch((error) => {
          console.log(error.message);
        });

      //removin post
      db.collection("posts")
        .doc(id)
        .delete()
        .then(() => {
          console.log("deleted post");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__headerleft">
          <img className="post__icon" src={profileURL} />
          <p>{username}</p>
        </div>
        <button onClick={deletePost} className="post__button">
          DELETE
        </button>
      </div>
      <div className="post__body">
        <img className="post__img" src={photoURL} />
      </div>
      <div className="post__caption">
        <p>
          <span style={{ fontWeight: "600", marginRight: "6px" }}>
            {username}
          </span>
          {caption}
        </p>
      </div>
      {user ? <CommentInput comments={comments} id={id} /> : <></>}
      <div
        style={{
          margin: "5px 0px",
          color: "white",
          fontSize: "16px",
        }}
      >
        Comments
      </div>
      {comments ? (
        comments.map((comment) => (
          <Comment
            key={"id" + comment.comment}
            username={comment.username}
            caption={comment.comment}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
