import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./menu.scss";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  console.log(cat);

  useEffect(() => {
    // create an async function insite the useEffect
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    //call the function
    fetchData();
  }, [cat]);

  console.log(posts);

  //   const posts = [
  //     {
  //       id: 1,
  //       title: "It is a long established fact that a reader will be distracted",
  //       decs: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
  //       img: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     },
  //     {
  //       id: 2,
  //       title: "It is a long established fact that a reader will be distracted",
  //       decs: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
  //       img: "https://images.pexels.com/photos/247851/pexels-photo-247851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     },
  //     {
  //       id: 3,
  //       title: "It is a long established fact that a reader will be distracted",
  //       decs: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
  //       img: "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     },
  //     {
  //       id: 4,
  //       title: "It is a long established fact that a reader will be distracted",
  //       decs: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
  //       img: "https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     },
  //   ];

  return (
    <div className="menu">
      <h1 className="">Other post you might like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`../upload/${post.img}`} alt="" />
          <h2>{post.title}</h2>
          <button onClick={() => navigate(`/post/${post.id}`)}>
            read more
          </button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
