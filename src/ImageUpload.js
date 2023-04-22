import "./styles.css";
import React, { useState, useEffect, useRef } from "react";
import locationPin from "./location-pin.png";
import listItems from "./listItems";

// React Dropzone
import { useDropzone } from "react-dropzone";

// Based on the default React Dropzone image thumbnail example
// The `thumbButton` style positions the edit button in the bottom right corner of the thumbnail
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
  padding: 20,
  alignItems: "center", 
  justifyContent: "center"
};

const thumb = {
  position: "relative",
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 500,
  height: 500,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
  align:"center"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

const thumbButton = {
  position: "absolute",
  right: 10,
  bottom: 10
};

// This function is called when the user taps the edit button.
// It opens the editor and returns the modified file when done
const editImage = (image, done) => {
};
  

function App() {
    const [files, setFiles] = useState([]);
    const pinRef = useRef(null);
  
   
   // The main function which is handling what happens when the image is clicked 
   
    const handleImageClick = (event) => {
      const image = event.target;
      const rect = image.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const relativePos = { x, y };
      const absolutePos = { x: event.clientX, y: event.clientY };
      console.log("Relative Position:", relativePos);
      console.log("Absolute Position:", absolutePos);

      // Create a new pin image element and append it to the image container
        const pinImg = new Image();
        pinImg.src = locationPin;
        pinImg.style.position = "absolute";
        pinImg.style.left = `${x}px`;
        pinImg.style.top = `${y}px`;
        pinImg.style.width = "30px";
        pinImg.style.height = "30px";
        pinRef.current.appendChild(pinImg);
    };
  
    const { getRootProps, getInputProps } = useDropzone({
      accept: "image/*",
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });
  
    const thumbs = files.map((file, index) => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            alt=""
            onClick={handleImageClick}
          />
          <div ref={pinRef}></div>
        </div>
      </div>
    ));
  
    useEffect(() => {
      // Clean up the generated preview URLs
      return () => {
        files.forEach((file) => URL.revokeObjectURL(file.preview));
      };
    }, [files]);
  
    return (
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop or click to select an image of your closet</p>
          <listItems />
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
    );
  }  

export default App;
