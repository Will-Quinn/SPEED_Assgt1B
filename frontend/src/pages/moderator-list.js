import Styles from "../components/tablestyle.js";
import Table from "../components/evidencetable.js";
import tablecolumns from "../components/tablecolumns.js";
import Dropdown from "../components/Dropdown.js";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";


const ModeratorList = () => {

  const [datas, setData] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const getDT = async () => {
      try {
        const data = await axios.get('http://localhost:5000/api/moderator/article');
        setData(data.data);

      } catch (error) {
        console.log(error);
      }
    }
    getDT();
  }, []);


  const searchByTitle = async (datas) => {
    try {
      const searchResult = await axios.get(`http://localhost:5000/api/search/${datas.searchTitle}/true/false`);
      setData(searchResult.data);

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <h2>Submitted Articles awaiting Moderation</h2>
      <div className="inline">
        <Dropdown />
        <form onSubmit={handleSubmit(searchByTitle)}>
          <input {...register("searchTitle")} className="search" type="text" placeholder="Search Title.." required />
        </form>
      </div>
      <Styles>
        <Table
          data={datas}
          columns={tablecolumns}
        />
      </Styles>
    </div>
  );
}

export default ModeratorList; 