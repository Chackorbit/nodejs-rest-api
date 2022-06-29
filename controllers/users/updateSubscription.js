const updateSubscription = async (req, res) => {
  const { subscription } = req.body;

  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        subscription,
      },
    },
  });
};

module.exports = updateSubscription;
