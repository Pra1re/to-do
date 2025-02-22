import TaskBoard from './todo';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';




const Home = () => {
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
            
            <TaskBoard></TaskBoard>
            </DndProvider>
           
            
            

        </div>
    );
};

export default Home;