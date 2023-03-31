import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useExpenseContext } from "../hooks/useExpenseContext";
import { useDuesContext } from "../hooks/useDuesContext";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

// components
import ExpenseDetails from "../Components/ExpenseDetails";
import ExpenseForm from "../Components/ExpenseForm";
import DuesDetailsForCustomer from "../Components/DuesDetailsForCustomer";

import "./customer.css";
import { kk } from "date-fns/locale"; 
import { pink, lightGreen, blue } from "@mui/material/colors";

const Borrowings = () => {
  const { expense, dispatch } = useExpenseContext();
  const { user } = useAuthContext();
  const [rollNo,setRollNo] = useState(null)
  const [borrows, setBorrows] = useState(null);
  const { Dues, dispatch: dispatchd } = useDuesContext();

  useEffect(() => {
    const fetchExpense = async () => {
      const response = await fetch("/api/expense", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_EXPENSES", payload: json });
        console.log(user)
      }
    };

    if (user) {
      fetchExpense();
      console.log(user.rollNo);
    }
  }, [dispatch, user]);

  useEffect(() => {
    const fetchDues = async () => {
      const response = await fetch(`/api/dues`, {
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
  
        // console.log(json[0])
        // setBorrows(json);
        // console.log(borrows[0].RollNo);
        console.log(borrows);
        dispatchd({ type: "SET_DUESS", payload: json });
      }
    };
    if (user) {
      fetchDues();
    }
  }, [dispatchd, user]);
  let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let data_to_show;
  let Food = 0;
  let Health = 0;
  let Shopping = 0;
  let Others = 0;
  var date = new Date();
  var current_month = date.getMonth();
  var todays_date = date.getDate();
  var current_year = date.getFullYear();
  var total_data = [];
  var last_ten_days_name = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  var last_ten_days_value = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var last_ten_days_data = [];
  var piechart_data = [];
  var bar_graph_progress = 0;
  var total_budget = 20000;
  for (let i = 1; i <= 12; i++) {
    let temp = 0;
    for (let j = 0; expense && j < expense.length; j++) {
      // console.log(expense[j].Date[5] + expense[j].Date[6], current_month);
      if (expense[j].Date[5] + expense[j].Date[6] == current_month + 1) {
        bar_graph_progress += expense[j].MoneySpent;
      }
      if (expense[j].Date[5] + expense[j].Date[6] == i) {
        temp += expense[j].MoneySpent;

        if (todays_date >= 11) {
          if (
            expense[j].Date.substring(0, 4) == current_year &&
            expense[j].Date[5] + expense[j].Date[6] == current_month + 1
          ) {
            if (
              Number(todays_date) - Number(expense[j].Date.substring(8, 10)) <=
                10 &&
              Number(todays_date) - Number(expense[j].Date.substring(8, 10)) > 0
            ) {
              last_ten_days_name[
                10 -
                  (Number(todays_date) -
                    Number(expense[j].Date.substring(8, 10)))
              ] = expense[j].Date.substring(0, 10);
              last_ten_days_value[
                10 -
                  (Number(todays_date) -
                    Number(expense[j].Date.substring(8, 10)))
              ] += expense[j].MoneySpent;
            }
          }
        } else {
          if (
            expense[j].Date.substring(0, 4) == current_year &&
            expense[j].Date[5] + expense[j].Date[6] == current_month + 1
          ) {
            if (
              Number(todays_date) - Number(expense[j].Date.substring(8, 10)) <=
                10 &&
              Number(todays_date) - Number(expense[j].Date.substring(8, 10)) > 0
            ) {
              last_ten_days_name[
                10 -
                  (Number(todays_date) -
                    Number(expense[j].Date.substring(8, 10)))
              ] = expense[j].Date.substring(0, 10);
              last_ten_days_value[
                10 -
                  (Number(todays_date) -
                    Number(expense[j].Date.substring(8, 10)))
              ] += expense[j].MoneySpent;
            }
          } else if (
            expense[j].Date.substring(0, 4) == current_year &&
            expense[j].Date[5] + expense[j].Date[6] == current_month
          ) {
            if (
              current_month == 2 ||
              current_month == 4 ||
              current_month == 6 ||
              current_month == 7 ||
              current_month == 9 ||
              current_month == 11
            ) {
              if (current_month == 2) {
                if (
                  Number(expense[j].Date.substring(8, 10)) >
                  28 - (10 - todays_date + 1)
                ) {
                  last_ten_days_name[
                    28 - Number(expense[j].Date.substring(8, 10)) - 2
                  ] = expense[j].Date.substring(0, 10);
                  last_ten_days_value[
                    28 - Number(expense[j].Date.substring(8, 10)) - 2
                  ] += expense[j].MoneySpent;
                }
              } else {
                if (
                  Number(expense[j].Date.substring(8, 10)) >
                  30 - (10 - todays_date + 1)
                ) {
                  last_ten_days_name[
                    30 - Number(expense[j].Date.substring(8, 10)) - 2
                  ] = expense[j].Date.substring(0, 10);
                  last_ten_days_value[
                    30 - Number(expense[j].Date.substring(8, 10)) - 2
                  ] += expense[j].MoneySpent;
                }
              }
            } else {
              if (
                Number(expense[j].Date.substring(8, 10)) >
                31 - (10 - todays_date + 1)
              ) {
                last_ten_days_name[
                  31 - Number(expense[j].Date.substring(8, 10)) - 2
                ] = expense[j].Date.substring(0, 10);
                last_ten_days_value[
                  31 - Number(expense[j].Date.substring(8, 10)) - 2
                ] += expense[j].MoneySpent;
              }
            }
          }
        }

        if (i == current_month + 1) {
          if (expense[j].Category == "Food") {
            Food += expense[j].MoneySpent;
          }
          if (expense[j].Category == "Health") {
            Health += expense[j].MoneySpent;
          }
          if (expense[j].Category == "Shopping") {
            Shopping += expense[j].MoneySpent;
          }
          if (expense[j].Category == "Others") {
            Others += expense[j].MoneySpent;
          }
        }
      }
    }
    total_data.push({ name: month[i - 1], value: temp });
  }
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "black"];

  for (let i = 0; i < 10; i++) {
    last_ten_days_data.push({
      name: last_ten_days_name[i],
      value: last_ten_days_value[i],
    });
  }
  piechart_data.push({ name: "Food", value: Food });
  piechart_data.push({ name: "Health", value: Health });
  piechart_data.push({ name: "Shopping", value: Shopping });
  piechart_data.push({ name: "Other", value: Others });
  piechart_data.push({
    name: "remaining",
    value: user.budget?user.budget:total_budget - Food - Health - Shopping,
  });
  const date_dep = new Date();
  const todays_month = date_dep.getMonth();

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
      <div className="home-customer-bot-expense">
        
        <div className="dues-history">
          <div className="expense-history-heading-cover">
            <div
              className="expense-details-heading"
              style={{ fontSize: "25px", fontWeight: "bolder" }}
            >
              Recent Borrowings
            </div>
            <div className="expense-details-heading">
              <span>Item</span>
              <span>Amount</span>
              <span>Payement Status</span>{" "}
            </div>
          </div>
          {Dues &&
            Dues.map((borrow) => {
              // console.log(borrow.RollNo)
                if(user.rollNo == borrow.RollNo)
                return (
                  <div>
                  <DuesDetailsForCustomer key={borrow._id} due={borrow} />
                </div>
              );
            })}
        </div>
      </div>
    
  );
};

export default Borrowings;