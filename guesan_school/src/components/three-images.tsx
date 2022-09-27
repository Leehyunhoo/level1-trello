import { Box, Button, Heading, Image } from "@chakra-ui/react";
import { Task } from "../../pages";

export default function ThreeImages({ task, onDelete } : {task : Task, onDelete :() => void}){
    return (
     <Box display="flex" padding={10} bg='cyan' justifyContent="space-evenly" margin = {10} borderRadius={30} shadow= "lg" _hover={{ shadow :"2xl"}}>
         <Heading fontSize="medium">
              {task.title}
         </Heading>
         <Button onClick={onDelete} >
             삭제하기
         </Button>
         <Heading>
            {task.description}
         </Heading>
      </Box>
    )
}