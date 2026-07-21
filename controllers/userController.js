function register(req, res) {
    /*

    Read name, email, and password from req.body
    Create a new user object
    Add that user to global.users
    Set global.user_id to that user
    Return status 201
    Return JSON with the user's name and email
    Do not return the password

    Example response:

        {
        "name": "Jim",
        "email": "jim@sample.com"
        }
   */

    const {name, email, password} = req.body;

    const newUser = {
        id: global.users.length + 1,
        name,
        email,
        password
    }

    global.users.push(newUser);
    global.user_id = newUser;

    res.status(201).json({name, email});

    return;

}


function logon(req, res) {
    /*

    The logon function should:
    Read email and password from req.body
    Find a matching user in global.users
    If the email and password match, set global.user_id to that user
    Return status 200
    Return JSON with the user's name and email
    If the email or password does not match, return status 401

    */
    const {email, password} = req.body;
    const user = global.users.find(user => user.email === email && user.password === password);
    if (!user) {
        res.status(401).json({error: "Invalid email or password"});
        return;
    }

    global.user_id = user;
    res.status(200).json({name: user.name, email: user.email});

}


function logoff(req, res) {
    /*

    The logoff function should:
    Set global.user_id to null
    Return status 200

    */

    global.user_id = null;
    res.status(200).json({"message": "Logged off"});

    
}

module.exports = {
    register,
    logon,
    logoff
}