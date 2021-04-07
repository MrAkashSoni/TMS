async function getConstantData(req, res, next) {
    try {
        const role = {
            0: 'admin',
            1: 'sub_admin',
            2: 'manager',
            3: 'transporter',
            4: 'vehicle_owner',
            5: 'driver',
        };

        res.status(200).json({
            status: 'success',
            data: {
                role,
            },
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getConstantData,
};
