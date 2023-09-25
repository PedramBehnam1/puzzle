import React,{useState} from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import img1 from './images/1.png';
import img2 from './images/2.png';
import img3 from './images/3.png';
import img4 from './images/4.png';
import img5 from './images/5.png';
import img6 from './images/6.png';
import img7 from './images/7.png';
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
  
  
    const checkList = ()=>{
      let isTrueOrdered = true;
      orderedList.map((imgObj,index)=>{
        if (isTrueOrdered) {
          if (imgObj.id == (index+1)) {
            isTrueOrdered =true
          }else{
            isTrueOrdered = false
          }
          
        }
      })
      return isTrueOrdered;
    }

    const handleSubmit= ()=>{
      let isTrueOrdered = checkList();
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
      }
    }
    
    const refreshList = ()=>{
      setUnOrderedList([{id:3,img:img3},{id:1,img:img1},{id:4,img:img4},{id:2,img:img2},{id:7,img:img7},{id:5,img:img5},{id:6,img:img6}])
      setOrderedList([])
      setIndex(1);
      setIsTrueOrdered(true)
    }
  
    const handleDragAndDrop = (results:any) => {
      const { source, destination } = results;
      if (!destination) return
      if(source.droppableId == destination.droppableId){
        if (destination.droppableId =="Root") {
          const orderedArray = [...orderedList];
          const [deletedItem] = orderedArray.splice(source.index, 1);
          orderedArray.splice(destination.index, 0, deletedItem)
          setOrderedList(orderedArray)
        } else {
          const unOrderedArray = [...unorderedList];
          const [deletedItem] = unOrderedArray.splice(source.index, 1);
          unOrderedArray.splice(destination.index, 0, deletedItem)
          setUnOrderedList(unOrderedArray)
        }

      }else{
        if (destination.droppableId =="Root") {
          const orderedArray = [...orderedList];
          const unOrderedArray = [...unorderedList];
          
          const [deletedItem] = unOrderedArray.splice(source.index, 1);
          orderedArray.splice(destination.index, 0, deletedItem)
          
          setOrderedList(orderedArray)
          setUnOrderedList(unOrderedArray);
        } else {
          const orderedArray = [...orderedList];
          const unOrderedArray = [...unorderedList];
          const [deletedItem] = orderedArray.splice(source.index, 1);
          unOrderedArray.splice(destination.index, 0, deletedItem)
          setOrderedList(orderedArray)
          setUnOrderedList(unOrderedArray);
        }
      }
      
    }
  return (
    <div >
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <Grid xs={12} display="flex" justifyContent="center" mt={5} dir="rtl">
          <h2>لیست مرتب شده</h2>
        </Grid>
        <Grid display='flex' justifyContent='center' border="1px solid black" xs={12} container >
          <Droppable droppableId='Root' key='Root' direction='horizontal' >
            {(provided)=>{
              return(
                <Grid item xs={12} {...provided.droppableProps} ref={provided.innerRef} display='flex' justifyContent='center'  alignItems='center' height={"318px"}>
                    {orderedList.length!=0? orderedList.map((imgObj,index)=>{
                      return(
                        <Draggable key={imgObj.id} draggableId={imgObj.id.toString()} index={index}>
                          {(provided)=>{
                            return(
                              <Grid 
                              pt="5px"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}>
                                <img  src={imgObj.img} style={{height:"318px"}}/>
                              </Grid>
                            )
                          }}
                        </Draggable>
                      )
                    }):
                      <Grid dir='rtl' position="absolute">
                        لطفا عکس به این لیست اضاف کنید.
                      </Grid>
                    }
                    {provided.placeholder}
                </Grid>
              )
            }}
          </Droppable>
          
        </Grid>
        <Grid xs={12} display="flex" justifyContent="center" mt={5} dir="rtl">
          <h2>لیست مرتب نشده</h2>
        </Grid>
        <Grid display='flex' justifyContent='center' border="1px solid black" container>
          <Droppable droppableId='Root1' key='Root1' direction='horizontal' >
            {(provided)=>{
              return(
                <Grid item xs={12} {...provided.droppableProps} ref={provided.innerRef} display='flex' justifyContent='center'  alignItems='center' height={"318px"}>
                    {unorderedList.length!=0?unorderedList.map((imgObj,index)=>{
                      return(
                        <Draggable key={imgObj.id} draggableId={imgObj.id.toString()} index={index}>
                          {(provided)=>{
                            return(
                              <Grid 
                              pt="5px"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps} >
                                <img  src={imgObj.img} style={{height:"318px"}}/>
                              </Grid>
                            )
                          }}
                        </Draggable>
                      )
                    }):
                      <Grid dir='rtl' position="absolute">
                        لیست نامرتب شما خالی شده است.
                      </Grid>
                    }
                    {provided.placeholder}
                </Grid>
              )
            }}
          </Droppable>
          
        </Grid>
      </DragDropContext>
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
