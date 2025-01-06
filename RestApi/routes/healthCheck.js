const healthCheck = (req, res) => {
    res.status(200).send("Connected");
};

export default healthCheck;
