
import { API_URL } from "../config/api";


export async function fetchIncomes() {
    const res = await fetch(`${API_URL}/api/incomes/me`, {
        method: "GET",
        credentials: "include"
    });
    if (!res.ok) throw new Error('Failed to fetch incomes');
    const data = await res.json();   // parse JSON once
    console.log(data);               // now this logs the actual array
    return data;
}

export async function fetchMonthlyIncomes() {
    const res = await fetch(`${API_URL}/api/incomes/monthly/me`, {
        method: "GET",
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch monthly incomes");
    return res.json();
}

export async function fetchExpenses() {
    const res = await fetch(`${API_URL}/api/expenses/me`, {
        method: "GET",
        credentials: "include"
    });
    if (!res.ok) throw new Error('Failed to fetch expenses');
    const data = await res.json();   // parse JSON once
    console.log(data);               // now this logs the actual array
    return data;
}

export async function fetchMonthlyExpenses() {
    const res = await fetch(`${API_URL}/api/expenses/monthly/me`, {
        method: "GET",
        credentials: "include"
    });
    if (!res.ok) throw new Error('Failed to fetch expenses');
    const data = await res.json();



    console.log(data);
    return data;
}

export async function fetchSavings() {
    const res = await fetch(`${API_URL}/api/savings/me`, {
        method: "GET",
        credentials: "include"
    });
    if (!res.ok) throw new Error('Failed to fetch expenses');
    const data = await res.json();
    console.log(data);
    return data;
}

export async function fetchMonthlySavings() {
    const res = await fetch(`${API_URL}/api/savings/monthly/me`, {
        method: "GET",
        credentials: "include"
    });
    if (!res.ok) throw new Error('Failed to fetch expenses');
    const data = await res.json();
    console.log(data);
    return data;
}