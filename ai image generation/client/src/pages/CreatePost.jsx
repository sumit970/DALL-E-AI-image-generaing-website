import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { preview } from "../assets";
import { getRandomPromt } from "../utils";
import { FormField, Loader } from "../component";
const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setform] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setgeneratingImg] = useState(false);
  const [loading, setloading] = useState(false);

  const generateImg = async () => {
    if (form.prompt) {
      try {
        setgeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data=await response.json();
        setform({...form, photo:`data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error);
      }
      finally{
        setgeneratingImg(false);
      }

    }
    else{
      alert('please enter a prompt');
    }
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(form.prompt && form.photo){
      setloading(true);
      try {
        const response =await fetch('http://localhost:8080',{
          method:'POST',
          headers:{
            'content-type': 'application/json',
          },
          body:JSON.stringify(form)
        })
      await response.json();
      navigate('/')
        
      } catch (error) {
        alert(error)
        
      } finally{
        setloading(false);
      }
    }
    else{
      alert("Please enter the prompt and generate an image!")
    }
  };
  const handleChange = (e) => {
    setform({...form, [e.target.name]: e.target.value });
  };
  const handleSupriseMe = () => {
    const randomprompt = getRandomPromt(form.prompt);
    setform({ ...form, prompt: randomprompt });
  };
  return (
    <section className="max-w-7xl mx-auto">
      <div className="">
        <h1 className="text-black text-2xl font-extrabold">Create</h1>
        <p className="text-grey-500 text-[14px] max-w-[500px]">
          Create imaginative and visually stunning images through DALL-E AI and
          share them with Community
        </p>
      </div>

      <form action="" className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="your name"
            type="text"
            name="name"
            placeholder="sumit kumar"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="Prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={form.prompt}
            handleChange={handleChange}
            isSupriseMe
            handleSupriseMe={handleSupriseMe}
          />
          <div
            className="relative bg-grey-50 border border-grey-300 text-grey-900 text-sm rounded-lg
        focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center "
          >
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src=""
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div
                className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)]
          rounded-lg"
              >
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImg}
            className="text-white bg-green-700 rounded-md text-sm w-full sm:w-auto px-5 py-2.5"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created the image you want ,you can share it with
            others in the community
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
