import axios from "axios";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./home.scss";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;
  const navigate = useNavigate();

  useEffect(() => {
    // create an async function insite the useEffect
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    //call the function
    fetchData();
  }, [cat]);

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
  //     {
  //       id: 5,
  //       title: "It is a long established fact that a reader will be distracted",
  //       decs: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
  //       img: "https://images.pexels.com/photos/39853/woman-girl-freedom-happy-39853.jpeg?cs=srgb&dl=pexels-jill-wellington-39853.jpg&fm=jpg",
  //     },
  //     {
  //       id: 6,
  //       title: "It is a long established fact that a reader will be distracted",
  //       decs: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
  //       img: "https://images.pexels.com/photos/296282/pexels-photo-296282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     },
  //   ];

  // removing the <p></p> tags from the rich edit out put
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img h-full">
              <img src={`../upload/${post.img}`} alt={post.title} />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{getText(post.title)}</h1>
              </Link>
              <p
                className="text-ellipsis overflow-hidden h-14"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.desc),
                }}
              ></p>
              <button onClick={() => navigate(`/post/${post.id}`)}>
                read more
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
