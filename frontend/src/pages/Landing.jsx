import {Link} from 'react-router-dom'

function Landing(){
    return(
        <div>
            <h1>Welcome to the Full Stack Web Application</h1>
            <p>This is the landing page of the Restaurant Automation System application</p>

            <Link to="/register"><button>Register</button></Link>
            <Link to="/login"><button>Login</button></Link>
        </div>
    )
}

export default Landing;