import { Box, Button, Heading, IconButton, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { DeleteIcon, SearchIcon,ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons'
import { useState } from "react";

type TaskType = {
  id: number;
  title: string;
  description: string;
}

export default function Section({ title: sectionTitle }: { title: string }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen: updateModalIsOpen, onClose: onUpdateModalClose, onOpen: onUpdateModalOpen } = useDisclosure();
  const [currentId, setCurrentId] = useState(-1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState<TaskType[]>([]);
  return (
    <Box bg="tomato" flex={1} borderRadius={4} p={4}>
      <Heading>{sectionTitle}</Heading>
      <Button onClick={() => {
        onOpen();
      }}>
        할일 추가
      </Button>
      <Stack>
        {tasks.map((task) => (
          <Box key={task.id} bg="cyan.200" p={4} borderRadius={4}>
            <Heading fontSize="md">{task.title}</Heading>
            <Text>{task.description}</Text>
            <Box display="flex" justifyContent='right' alignItems='center'>
            <IconButton icon={<DeleteIcon />} onClick={() => {
              const idx = tasks.findIndex(t => t.id === task.id);
              setTasks([
                ...tasks.slice(0, idx),
                ...tasks.slice(idx + 1),
              ])
            }}/>
              <IconButton icon={<ArrowUpIcon />} onClick={() => {
              const idx = tasks.findIndex(t => t.id === task.id);
              if(idx>0){
                setTasks([
                  ...tasks.slice(0, idx-1),
                  tasks[idx],
                  tasks[idx-1],
                  ...tasks.slice(idx + 1),
                ])
            }
            }}/>
            <IconButton icon={<ArrowDownIcon />} onClick={() => {
              const idx = tasks.findIndex(t => t.id === task.id);
              const max_idx = tasks.length
              if (max_idx>idx+1){
                setTasks([
                  ...tasks.slice(0, idx),
                  tasks[idx+1],
                  tasks[idx],
                  ...tasks.slice(idx + 2),
                ])
              }
            }}/>
            </Box>
            <Button onClick={() => {
              onUpdateModalOpen();
              setTitle(task.title);
              setDescription(task.description);
              setCurrentId(task.id);
            }}>
              수정
            </Button>
          </Box>
        ))}
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>할일 추가</ModalHeader>
          <ModalBody>
            <Input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => {
              // 카드 추가
              setTasks([
                {
                  id: Date.now(),
                  title: title,
                  description,
                },
                ...tasks
              ]);
              // 입력값 초기화
              setTitle('');
              setDescription('');
              // 모달 닫기
              onClose();
            }}>추가하기</Button>
            <Button variant="text" onClick={onClose}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={updateModalIsOpen} onClose={onUpdateModalClose}>
        <ModalContent>
          <ModalHeader>카드 수정</ModalHeader>
          <ModalBody>
            <Input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => {
              const idx = tasks.findIndex(t => t.id === currentId);
              setTasks([
                ...tasks.slice(0, idx),
                {
                  id: currentId,
                  title,
                  description,
                },
                ...tasks.slice(idx + 1),
              ]);
              onUpdateModalClose();
            }}>수정하기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}