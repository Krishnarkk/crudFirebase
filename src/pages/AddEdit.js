import React, { useEffect, useState } from 'react'
import { db, storage } from '../firebase'
import './Add.css'
import { useParams, useNavigate } from 'react-router-dom'
import { getDownloadURL, ref,uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, doc, getDoc,updateDoc, serverTimestamp } from 'firebase/firestore'
const initialState = {
  name: '',
  email: '',
  info: "",
  phone: ''
}
const AddEdit = () => {
  const [data, setData] = useState(initialState);
  const { name, email, info, phone } = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [err, setErr] = useState({});
  const [submit, setSubmit] = useState(false);
  const navigate=useNavigate();
  const {id}=useParams();
  useEffect(()=>{
  id && getSingleUser();
  },[id])
  const getSingleUser=async()=>{
    const docRef=doc(db,"users",id);
    const snapshot=await getDoc(docRef);
    if(snapshot.exists()){
      setData({...snapshot.data()})
    }
  }
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  useEffect(()=>{
    const UploadFile=()=>{
      const name=new Date().getTime()+file.name;
      const storageRef=ref(storage,file.name);
      const uploadTask=uploadBytesResumable(storageRef,file);
      uploadTask.on("state_changed",(snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setProgress(progress);
        switch(snapshot.state){
          case "paused":
            console.log("paused upload");
            break;
          case "running":
            console.log("upload is runnig")
            default:
              break;

        }
      },(error)=>{
        console.log(error)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setData((prev)=>({...prev,img:downloadURL}))
        })
      })
    }
       file && UploadFile();
  },[file])

  // const vaildate = () => {
  //   let err= {};
  //   if (!name) {
  //     err.name = "Name is required";
  //   }
  //   if (!email) {
  //     err.email = "Email is required";
  //   }
  //   if (!phone) {
  //     err.phone = "Phone number is required";
  //   }
  //   if (!info) {
  //     err.info = "Info is required";
  //   }
  //   return err;
  // }
  const handleSubmit = async(e) => {
    e.preventDefault();
    // var err = vaildate();
    // if (Object.keys(err).length)
    //   return setErr(err);
    setSubmit(true);
    if(!id){
      try{
    await addDoc(collection(db,"users"),{
      ...data,
      timestamp:serverTimestamp()
    });
  }
  catch(error){
     console.log(error)
  }
  }
  else{
    try{
      await updateDoc(doc(db,"users",id),{
        ...data,
        timestamp:serverTimestamp()
      });
    }
    catch(error){
       console.log(error)
    }
  
  }
    navigate('/')

  };
  return (
    <div className="form-box">
      <h1>{id?"Update User":"Add User"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="name">Name</label>
          <input
            className="form-control"
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            value={name} />
        
        </div>
        <div className="form-group">
          <label for="email">Email</label>
          <input className="form-control"
            id="email"
            type="email"
            name="email"
            onChange={handleChange}
            value={email} />
         
        </div>
        <div className="form-group">
          <label for="email">Phone</label>
          <input className="form-control"
            id="phone"
            type="number"
            name="phone"
            onChange={handleChange}
            value={phone} />
     
        </div>

        <div className="form-group">
          <label for="message">Info</label>
          <textarea className="form-control"
            id="message"
            name="info"
            onChange={handleChange}
            value={info}
          ></textarea>
   
        </div>
        <div className="form-group">
          <label for="formFile" className="form-label">Upload Image</label>
          <input className="form-control"
            type="file"
            id="formFile"
            onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <input disabled={progress !==null && progress<100} className="btn btn-primary mt-4" type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default AddEdit