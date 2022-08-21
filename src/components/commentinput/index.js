import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/user";
import { db } from "../../firebase";
import "./style.css";

export const CommentInput = (comments) => {
  const [comment, setComment] = useState("");
  const [user, setUser] = useContext(UserContext).user;
  let [commentArray, setCommentArray] = useState(
    comments.comments ? comments.comments : []
  );

  const addComment = () => {
    //add comment to post info

    if (comment !== "") {
      console.log(commentArray);
      commentArray.push({
        username: user.email.replace("@gmail.com", "").toLowerCase(),
        comment: comment,
      });

      db.collection("posts")
        .doc(comments.id)
        .update({
          comments: commentArray,
        })
        .then(() => {
          commentArray = [];
          setComment("");
          console.log("comment added successfully");
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <div className="commentInput">
      <textarea
        rows="1"
        className="commentInput__textarea"
        placeholder="Write your comment here"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      ></textarea>
      <button onClick={addComment} className="commentInput__button">
        POST
      </button>
    </div>
  );
};
