const { is } = require('express/lib/request');
const userService = require('../../../services/userService');

module.exports = () => {

    return async (req, res) => {
        const { name, email, phone, password, cpassword } = req.body;
        if (!name || !email || !phone || !password || !cpassword) {
            res.status(417).json({ error: 'Please fill all the fields' });
        } else {
            if (password != cpassword) {
                res.status(422).json({ error: 'Password does not match' });
            } else {
                const message= await userService.register(name,email,phone,password);
                if(message=="Exists"){
                    res.status(422).json({error: 'Email already exists'});

                }else if(message=="Failed"){
                    console.log(message)
                    res.status(500).json({error: message});

                }
                else{
                    res.status(200).json({message: 'User registered successfully'});
                }
            }

        }


    }
}