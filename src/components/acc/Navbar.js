// import React from 'react'
// const Navbar = () => {
//   return (
//     <div>
//         <nav class="navbar navbar-expand-lg navbar-light bg-warning">
//   <div class="container-fluid">
//     <a class="navbar-brand" href="#">Crud</a>
//     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
//       <span class="navbar-toggler-icon"></span>
//     </button>
//     <div class="collapse navbar-collapse" id="navbarNavDropdown">
//       <ul class="navbar-nav">
//         <li class="nav-item">
//           <h4 class="nav-link active" aria-current="page" href="#" onClick={()=>navigate("/")}>Home</h4>
//         </li>
//         <li class="nav-item">
//           <button  onClick={()=>navigate('/add')}class="nav-link btn btn-outline btn-primary text-dark" href="#">Add User</button>
//         </li>
//         <li class="nav-item">
//           <a class="nav-link" href="#">Pricing</a>
//         </li>
//              </ul>
//     </div>
//   </div>
// </nav>
//     </div>
//   )
// }

// export default Navbar




import React,{useState} from 'react'
import { useNavigate,Link,useSearchParams } from 'react-router-dom'

const Navbar = ({fun}) => {

  const navigate=useNavigate();
  const[searchTerm,setSearchterm]=useState("");
 const[searchParams,setSearchParams]=useSearchParams()
  return (
    <div>

<nav class="navbar navbar-dark navbar-expand-sm bg-dark">
{/* fixed-top */}

        <div class="container">
        <a href="/" class="navbar-brand">
        <i class="fas fa-blog"></i> &nbsp;
        CRUD APP
        </a>
</div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>


        <div id="navbarCollapse" class="collapse navbar-collapse">
        <ul class="navbar-nav  ml-auto">
            <li class="nav-item">
                <a href="" class="nav-link active"  onClick={()=>{
                    navigate("/")
                    // searchParams.set('search', searchTerm);
                    // setSearchParams(searchParams)
                    }}>
                    Home
                </a>
            </li>
            <li class="nav-item">
                <a href="" class="nav-link active" onClick={()=>navigate("/add")}>
                    ADD
                </a>
            </li>
        
        </ul>
      <input type="text" placeholder="serach name" onChange={(e)=>{setSearchterm(e.target.value)
      console.log(searchTerm)
    }}/>

        </div>
</nav>


    </div>
  
    )
}

export default Navbar