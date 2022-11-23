import React, { useContext, useEffect, useState } from "react";
import "./single.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import { Menu } from "../components/layout";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState({});
  const { currentUser } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  // get post id from the uri
  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    // create an async function insite the useEffect
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    //call the function
    fetchData();
  }, [postId]);

  //delete post function

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}

          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link
                to={`/write?edit`}
                state={post}
                className="bg-green-400 rounded-full p-0.5"
              >
                <AiTwotoneEdit size="16" color="white" />
              </Link>
              <Link to="" className="bg-red-400 rounded-full p-0.5">
                <AiTwotoneDelete
                  size="16"
                  color="white"
                  onClick={handleDelete}
                />
              </Link>
            </div>
          )}
        </div>
        <div className="text">
          <h1>{post.title}</h1>
          {/* we are ussing a rich edit the is not need for <p> */}
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.desc),
            }}
          ></p>
        </div>
      </div>
      <div className="menu">
        <Menu cat={post.cat} />
      </div>
    </div>
  );
};

export default Single;
