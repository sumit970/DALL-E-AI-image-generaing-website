import React, { useEffect, useState } from "react";
import { Card, Loader, FormField } from "../component";
const RenderCards = ({ data, title }) => {
  if (data.length > 0) {
    return data.map((post) => <Card  {...post} />);
  }
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [Loading, setLoading] = useState(false);
  const [allpost, setallpost] = useState(null);
  const [searchtext, setsearchtext] = useState("");
  const [searchedresult, setsearchedresult] = useState(null);
  const [searchtimeout, setsearchtimeout] = useState();
  const fetchpost = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/v1/post", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        setallpost(result.data.reverse());
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchpost();
  }, []);
  const handlesearchchange = (e) => {
    clearTimeout(searchtimeout)
    setsearchtext(e.target.value);

    setsearchtimeout(
        setTimeout(() => {
            const searchresult = allpost.filter(
              (item) =>
                item.name.toLowerCase().includes(searchtext.toLowerCase()) ||
                item.prompt.toLowerCase().includes(searchtext.toLowerCase())
            );
      
            setsearchedresult(searchresult);
          }, 500)
    )
    
  };
  return (
    <section className="max-w-7xl mx-auto ">
      <div className="">
        <h1 className="text-black text-2xl font-extrabold">
          The Community Showcase
        </h1>
        <p className="text-grey-500 text-[14px] max-w-[500px]">
          Browse Through a collection of imaginative and visually stunning
          images generated by DALL-E 2.O AI
        </p>
      </div>
      <div className="mt-16">
        <FormField 
        labelName="Search post "
        type="text"
        name="text"
        placeholder="Search posts"
        value={searchtext}
        handleChange={handlesearchchange}
        />
      </div>

      <div className="">
        {Loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            <h1 className="text-xl text-black ">
              Showing Results for{" "}
              <span className="font-extrabold">{searchtext}</span>{" "}
            </h1>
          </>
        )}
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
          {searchtext ? (
            <RenderCards data={[searchedresult]} title="No search results found" />
          ) : (
            <RenderCards data={[allpost]} title="No posts found" />
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;