import Image from "next/image";
import Link from "next/link";
import { ArrowDownIcon } from "@heroicons/react/solid";
import { ChevronDownIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { sanityClient } from "../lib/Sanity";
import { ThemeProvider } from "next-themes";

import mistrilogo from "../public/mistri_logo_svg.svg";
import Multiselect from "multiselect-react-dropdown";
import Head from "next/head";

export default function imagetest() {
  const [imageSrc, setImageSrc] = useState();
  const [pdf, setPdf] = useState();
  const [image, setImage] = useState("");
  const [uploadData, setUploadData] = useState();

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
      
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    console.log(event.currentTarget);
    const form = event.currentTarget;
    const fileInput1 = Array.from(form.elements).find(({ name }) => name ==="file");
    console.log(fileInput1);
    
    const formData1 = new FormData();
    for( const image of fileInput1.files ){
        formData1.append("file", image);
    }
    
    formData1.append("upload_preset", "mistri-application");
    const  data1 = await fetch("https://api.cloudinary.com/v1_1/dqbr3ydia/image/upload",
    {
        method: "POST",
        body: formData1
    }).then(r => r.json());

    setImageSrc(data1.secure_url);
    console.log(imageSrc)
    setUploadData(data1);
    console.log("data",data1)

    const fileInput2 = Array.from(form.elements).find(({ name }) => name ==="pdf");
    console.log(fileInput2);
    const formData2 = new FormData();
    for( const pdf of fileInput2.files ){
        formData2.append("file", pdf);
    }
    formData2.append("upload_preset", "mistri-application");
    const  data2 = await fetch("https://api.cloudinary.com/v1_1/dqbr3ydia/image/upload",
    {
        method: "POST",
        body: formData2
    }).then(r => r.json());
    console.log("data",data2)
  };

  return (
    <div>
      <Head></Head>
      <main>
        <form method="post"  onSubmit={handleOnSubmit}>
          <img src={imageSrc} />
          <p>
            <input type="file" name="file" onChange={handleOnChange} />
            <input type="file" name= "pdf"  />
          </p>

          {imageSrc && !uploadData && (
            <p>
              <button>upload Files</button>
            </p>
          )}

          {uploadData && (
            <code>
              <pre>{JSON.stringify(uploadData, null, 2)}</pre>
            </code>
          )}

          {imageSrc && (
            <p>
                {imageSrc}
            </p>
          )}
        </form>
      </main>
    </div>
  );
}
