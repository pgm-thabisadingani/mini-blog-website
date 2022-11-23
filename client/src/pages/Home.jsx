import axios from 'axios';
import DOMPurify from 'dompurify';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './home.scss';

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

  // removing the <p></p> tags from the rich edit out put
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
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
