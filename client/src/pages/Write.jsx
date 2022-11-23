import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "./write.scss";
import { FormInput } from "../components/form";
import axios from "axios";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="write-Area">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>

      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b>Draft
          </span>
          <span>
            <b>Visibility: </b>Public
          </span>
          <input
            className="hidden"
            type="file"
            name=""
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="underline cursor-pointer" htmlFor="file">
            Upload Image
          </label>
          <div className=" buttons flex justify-between">
            <button>Save as a file draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>

        <div className="item">
          <h1>Category</h1>
          <FormInput
            type="radio"
            name="cat"
            id="art"
            title="Art"
            checked={cat === "art"}
            onChange={(e) => setCat(e.target.value)}
          />
          <FormInput
            type="radio"
            name="cat"
            id="science"
            title="Science"
            checked={cat === "science"}
            onChange={(e) => setCat(e.target.value)}
          />
          <FormInput
            type="radio"
            name="cat"
            id="technology"
            title="Technology"
            checked={cat === "technology"}
            onChange={(e) => setCat(e.target.value)}
          />
          <FormInput
            type="radio"
            name="cat"
            id="cinema"
            title="Cinema"
            checked={cat === "cinema"}
            onChange={(e) => setCat(e.target.value)}
          />
          <FormInput
            type="radio"
            name="cat"
            id="design"
            title="Design"
            checked={cat === "design"}
            onChange={(e) => setCat(e.target.value)}
          />
          <FormInput
            type="radio"
            name="cat"
            id="food"
            title="Food"
            checked={cat === "food"}
            onChange={(e) => setCat(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Write;
