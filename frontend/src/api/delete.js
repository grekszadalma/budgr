
export async function deleteExpense(id) {
    const res = await fetch(`http://localhost:8080/api/expenses/${id}`, {
        method: "DELETE",
        credentials: "include", // keep if using cookies/session auth
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Failed to delete expense: ${msg}`);
    }

    return res;
}

export async function deleteIncome(id) {
    const res = await fetch(`http://localhost:8080/api/incomes/${id}`, {
        method: "DELETE",
        credentials: "include", // keep if using cookies/session auth
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Failed to delete income: ${msg}`);
    }

    return res;
}

export async function deleteBudget(id) {
    const res = await fetch(`http://localhost:8080/api/budgets/${id}`, {
        method: "DELETE",
        credentials: "include", // keep if using cookies/session auth
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Failed to delete budget: ${msg}`);
    }

    return res;
}

export async function deleteSaving(id) {
    const res = await fetch(`http://localhost:8080/api/savings/${id}`, {
        method: "DELETE",
        credentials: "include", // keep if using cookies/session auth
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Failed to delete saving: ${msg}`);
    }

    return res;
}

export async function deleteWishlistItem(id) {
    const res = await fetch(`http://localhost:8080/api/wlitems/${id}`, {
        method: "DELETE",
        credentials: "include", // keep if using cookies/session auth
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Failed to delete wishlist item: ${msg}`);
    }

    return res;
}