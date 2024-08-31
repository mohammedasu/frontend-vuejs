const headerConfig = {
    headers: {
        "x-request-id": new Date().getUTCMilliseconds(),
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + localStorage.getItem("token") + ""
    }
};

export { headerConfig };
