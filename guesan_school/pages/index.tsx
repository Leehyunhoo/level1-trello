import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box,Button,Image } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Dispatch, SetStateAction, useState } from 'react'
import ThreeImages from '../src/components/three-images'
 
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
export type Task = {
  title : string;
  description : string ;
}

const Home: NextPage = () => {
  const [start_job,setStart] = useState([
    {title : "제목", description : "나는 현호야"},
  {title : "제목", description : "나는 현호야"}
  ,{title : "제목", description : "나는 현호야"}]);
  const [doing_job,setDoing] = useState([
    {title : "제목", description : "나는 현호야"},
  {title : "제목", description : "나는 현호야"}
  ,{title : "제목", description : "나는 현호야"}]);
  const [finished_job,setFinish] = useState([
    {title : "제목", description : "나는 현호야"},
  {title : "제목", description : "나는 현호야"}
  ,{title : "제목", description : "나는 현호야"}]);
  // const data: Task[] = [{title : "제목", description : "나는 현호야"},{title : "제목", description : "나는 현호야"}
  // ,{title : "제목", description : "나는 현호야"}];
  const itemToComponent = (task : Task, job : Task[], state :  Dispatch<SetStateAction<Task[]>>) => (
    <ThreeImages key={task.title} task = {task} onDelete = {()=>{
      const i = job.findIndex((t) => t ===task);
      state([...job.slice(0,i),...job.slice(i+1)]);
    }}/>
  );

  return (
    <Box display="flex" flexDirection="row" >
      <Box pb={4}>
        <Button onClick={() => setStart([...start_job, {title : '추가', description : '문자'}])}> 추가하기 </Button>
        {start_job.map((task) => itemToComponent(task, start_job, setStart))}
      </Box>
      <Box pb={4}>
        <Button onClick={() => setDoing([...doing_job, {title : '추가', description : '문자'}])}> 추가하기 </Button>
        {doing_job.map((task) => itemToComponent(task, doing_job, setDoing))}
      </Box>
      <Box pb={4}>
        <Button onClick={() => setFinish([...finished_job, {title : '추가', description : '문자'}])}> 추가하기 </Button>
        {finished_job.map((task) => itemToComponent(task, finished_job, setFinish))}
      </Box>
    </Box>
  )
}

export default Home


{/* <Accordion defaultIndex={[0]} allowMultiple>
  <AccordionItem>
    <h2>  
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          Section 1 title
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      <Button onClick={() => setData([...data, {title : '추가', description : '문자'}])}> 추가하기 </Button>
      {data.map(itemToComponent)}
    </AccordionPanel>
  </AccordionItem>
</Accordion> */}
