'use client'
import { useEffect, useState } from "react";
import { useFormState } from "../utils/FormContext";
import { ThrowExpression } from "../utils/errorHandler";
import axios from "axios";
import { GetCreateOrderURL, GetQueryUpcomingOrdersURL } from "../utils/envVariableManager";
import { CustomItem } from "@/types/CustomItem";
import { FormateDateObjToJustDate } from "../utils/stringFormatter";
import { CustomOrderModel } from "@/types/CustomOrderModel";
import { title } from "process";

// grid dependencies
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
//import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

type OrderObject = {
    firstName: string,
    lastName: string,
    email: string,
    items: CustomItem[],
    dateCreated: Date,
    dateDue: Date
}

export default function UpcomingOrders(){
    const [upcomingOrders, setUpcomingOrders] = useState("");
    const [orderObjects, setOrderObjects] = useState<OrderObject[]>([]);
    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        { field: "firstName" },
        { field: "lastName" },
        { field: "email", sortable: true},
        { field: "dateDue", sortable: true}
    ]);

    useEffect(() => {
        getUpcomingOrders();
      }, []); // The empty dependency array ensures that the effect runs only once, equivalent to componentDidMount
    

    // const getTableTitles = () => {
    //     let titles = "Name \t\t\t\t\t Email \t\t\t\t\t\t\t\t\t Pinata Count \t\t Due Date \n";
    //     return titles;
    // }

    // const prettifyResults = (dataArray: any[]): string => {
    //     let result = "";
    //     result += getTableTitles();
    //     for(let i = 0; i < dataArray.length; i++){
    //         let formattedDueDate = FormateDateObjToJustDate(dataArray[i].dateDue)
    //         result += `${dataArray[i].firstName} ${dataArray[i].lastName} \t ${dataArray[i].email} \t\t\t ${dataArray[i].items.length}x \t\t\t\t\t ${formattedDueDate} \n`
    //     }
    //     return result;
    // }

    //sort array by dateDue field where the first element is due soon and the
    //last is due much later
    const sortByDate = (dateArray: any[]) =>{        
        dateArray.sort((a, b) => (a.dateDue > b.dateDue ? 1 : -1));
        return dateArray;
    }


    const getUpcomingOrders = async() => {
        // event.preventDefault();
        // console.log(`Submit clicked: `);
        // console.log(this.state);                    

        //RETURN a JSON data file
      }

    return(                
      <div className="h-full w-full bg-white border rounded-xl text-black">
          {/* <textarea 
              readOnly
              className="h-60 w-full p-2 text-black"
              value={upcomingOrders}
          />    */}
          {/* <AgGridReact rowData={rowData} columnDefs={colDefs2} /> */}
          <AgGridReact rowData={orderObjects} columnDefs={colDefs} />
      </div>                   
    );

}