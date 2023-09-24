import React,{useState} from 'react';
import img1 from './images/1.png';
import img2 from './images/2.png';
import img3 from './images/3.png';
import img4 from './images/4.png';
import img5 from './images/5.png';
import img6 from './images/6.png';
import img7 from './images/7.png';
import './App.css';
import { Grid,Button } from '@mui/material';
import Notification from './layout/notification';

interface Iimage{
  id: number,
  img: string
}
interface InotificationObj{
  open: boolean,
  type: string
  message: string
}
function App() {
  const [unorderedList,setUnOrderedList]= useState<Iimage[]>([{id:3,img:img3},{id:1,img:img1},{id:4,img:img4},{id:2,img:img2},{id:7,img:img7},{id:5,img:img5},{id:6,img:img6}])
  const [orderedList,setOrderedList]= useState<Iimage[]>([])
  const [isTrueOrdered,setIsTrueOrdered]= useState<boolean>(true)
  const [index,setIndex]= useState<number>(1)
  const [notificationObj, setNotificationObj] = useState<InotificationObj>({
    open: false,
    type: 'success',
    message: ''
  })
  
  const handleOnDrag = (e:React.DragEvent, id:number , img:string)=>{
    e.dataTransfer.setData('id',id.toString())

  }
  const handleOnDrop = (e:React.DragEvent)=>{
    const id =  e.dataTransfer.getData('id') as string;
    const imgObj  = unorderedList.find(img=>img.id==parseInt(id, 10)) as Iimage;
    
    setOrderedList([...orderedList,imgObj])
    setUnOrderedList(unorderedList.filter(img=>img.id!=parseInt(id, 10)));
    if(isTrueOrdered){
      if (index== parseInt(id, 10)) {
        setIsTrueOrdered(true)
      }else{
        setIsTrueOrdered(false)
      }
      setIndex(index+1)
    }
  }
  const handleDragOver = (e:React.DragEvent)=>{
    e.preventDefault();
  }
  
  const handleSubmit= ()=>{
    if (isTrueOrdered) {
      setNotificationObj({
        open: true, type: 'success', message: `تبریک می گویم! شما موفق شدید.`
      })
      setTimeout(
          () => setNotificationObj({
            open: false,
            type: 'success',
            message: ''
          }
          ), 3000);
    }else{
      setNotificationObj({
        open: true, type: 'error', message: `شما بازی را باختید!`
      })
      setTimeout(
        () => setNotificationObj({
          open: false,
          type: 'error',
          message: ''
        }
        ), 3000);
        console.log("Sorry! You can't win this game.");
      }
    }
    
    const refreshList = ()=>{
      setUnOrderedList([{id:3,img:img3},{id:1,img:img1},{id:4,img:img4},{id:2,img:img2},{id:7,img:img7},{id:5,img:img5},{id:6,img:img6}])
      setOrderedList([])
      setIndex(1);
      setIsTrueOrdered(true)
    }
  
  return (
    <div >
      <Grid xs={12} display="flex" justifyContent="center" mt={5} dir="rtl">
        <h2>لیست مرتب شده</h2>
      </Grid>
      <Grid xs={12} height="318px" display='flex' 
        justifyContent='center' mt={3} 
        border="1px solid black" 
        onDrop={handleOnDrop}
        onDragOver={handleDragOver}
        sx={orderedList.length==0?{alignItems:'center'}:{}}
        dir={orderedList.length==0?"rtl":"ltr"}
      >
        
        {orderedList.length!=0?orderedList.map((imgObj)=>{
          return(
            <img src={imgObj.img} />
          )
        }):"لطفا لیست خود را مرتب کنید."
        }
      </Grid>
      <Grid xs={12} display="flex" justifyContent="center" mt={5} dir="rtl">
        <h2>لیست مرتب نشده</h2>
      </Grid>
      <Grid xs={12} height={unorderedList.length==0?"150px":"318px"} display='flex' justifyContent='center'sx={unorderedList.length==0?{alignItems:'center'}:{}} 
      mt={3} border="1px solid black" 
      dir={unorderedList.length==0?"rtl":"ltr"}>
        
        {
          unorderedList.length!=0?
        unorderedList.map((unordered)=>{
          return(
            <img draggable onDragStart={(e)=>handleOnDrag(e,unordered.id,unordered.img)} src={unordered.img} style={{cursor:'pointer'}}/>
          )
        })
        :"لیست شما خالی شد."
        }
      </Grid>

      <Grid xs={12} display='flex' justifyContent='center' dir="rtl" pt="10px">
        <Button variant='contained' sx={{"&:hover": { backgroundColor: "#CB929B" }}} disabled={unorderedList.length!=0} onClick={handleSubmit}>تایید</Button>
        <Button variant='contained' sx={{"&:hover": { backgroundColor: "#CB929B" },mr:"10px"}} disabled={unorderedList.length==7} onClick={()=>refreshList()} >بازگرداندن</Button>
      
      </Grid>
      <Grid height="30px"></Grid>  
      
      <Notification
        open={notificationObj.open}
        type={notificationObj.type}
        message={notificationObj.message}
      />
    </div>
  );
}

export default App;
