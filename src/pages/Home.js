import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { useNavigate ,useLocation} from 'react-router-dom'
import { collection, onSnapshot } from 'firebase/firestore';
import './Home.css'

const Home = () => {
  // console.log(window.location.href)
const que=useLocation().search;
const searchTerm=new URLSearchParams(que).get('search');
  const [user, setUser] = useState([]);
  // const[searchTerm,setSearchterm]=useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // setSearchterm(name);
  // console.log(searchTerm)

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      })
      setUser(list);
      setLoading(false);

    },
      (error) => {
        console.log(error)
      });
    return () => {
      unsub();
    }
  }, [])


  return (
    <div>
      {/* <input type="text" placeholder="serach name" onChange={(e)=>{setSearchterm(e.target.value)}}/> */}
    <div className='container' id="cards_landscape_wrap-2">
      <div class="row">
        {user && user.
        // filter((user)=>{
        //   if(searchTerm==""){
        //     return user;
        //   }
        //   else if(user.name.toLowerCase().includes(searchTerm.toLowerCase())){
        //   return user;
        //   }
          // else{
          //   return user;
          // }
        // }).
        
        
        
        map((user) =>
          //     <div class="col">
          //       <div class="card" style={{width: '18rem'}}>
          //   <img src={user.img} class="card-img-top" alt="images"/>
          //   <div class="card-body">
          //     <h2 class="card-text">{user.name}</h2>
          //     <h4 class="card-text">{user.email}</h4>
          //     <h4 class="card-text">{user.phone}</h4>
          //   </div>
          // </div>
          //     </div>

          <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
            <a href="">
              <div class="card-flyer">
                <div class="text-box">
                  <div class="image-box">
                    <img src={user.img} alt="" />
                  </div>
                  <div class="text-container">
                    <h4>{user.name}</h4>
                    <h5>{user.phone}</h5>
                    <p>{user.info}</p>
                    <button className="btn btn-sm btn-success" onClick={() => navigate(`update/${user.id}`)}>Update</button>
                  </div>

                </div>
              </div>
            </a>
          </div>


        )
        }

      </div>
    </div>
    </div>
  )
}

export default Home