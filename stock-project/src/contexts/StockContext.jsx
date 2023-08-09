import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import dayjs from "dayjs";


StockProvider.propTypes = {
  children: PropTypes.node
}

 async function fetchProduct () {
  const response = await fetch('http://localhost:3000/products')
  const data = await response.json()
  return data
}

export const StockContext = createContext()

export function StockProvider({children}){

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    fetchProduct().then(res => {
      setData(res)
      setLoading(false)
    })
  }, [])

  const [inventary, setInventary] = useState(0);
  const [recentItems, setRecentItems] = useState(0);
  const [runningOut, setRunningOut] = useState(0);
  const [diversity, setDiversity] = useState(0);

  useEffect(() => {
    const verifielStock = data.filter((el) => el.inStock < 15);
    setRunningOut(verifielStock);
    
  }, [data]);

  useEffect(() => {
    setDiversity(data.length);
  }, [data]);

  useEffect(() => {
    setInventary(
      data.reduce((ac, current) => {
        return ac + Number(current.inStock);
      }, 0)
    );
  }, [data]);

  useEffect(() => {
    const test = data.filter((el) => {
      const data1 = el.createdAt;
      const date2 = dayjs();
      const difference = date2.diff(data1, "day");
      return difference < 30;
    });
    setRecentItems(test);
  }, [data]);

  return (
    <StockContext.Provider value={{data, inventary, recentItems, runningOut, diversity, loading}}>
      {children}
    </StockContext.Provider>
  )
}