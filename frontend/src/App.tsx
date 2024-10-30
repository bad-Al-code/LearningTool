import { motion } from 'framer-motion';
import { useState } from 'react';

const App: React.FC = () => {
    const [showImage, setShowImage] = useState(false);
    const handleClickImage = () => setShowImage((prev) => !prev);

    const boxVariants = {
        initial: {
            scale: 1,
            rotate: 0,
            skew: 0,
        },
        hover: {
            scale: 1.2,
            rotate: 15,
            skew: 10,
            transition: { duration: 0.5 },
        },
        click: {
            scale: 0.9,
            rotate: -15,
            transition: { duration: 0.3 },
        },
    };

    const parentVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.8 } },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            className="flex justify-center items-center h-screen  "
            variants={parentVariants}
            initial="hidden"
            animate="visible"
        >
            {[...Array(5)].map((_, index) => (
                <motion.div
                    className="box mt-[2rem]"
                    key={index}
                    variants={childVariants}
                ></motion.div>
            ))}
            {/* <motion.div
                className="w-40 h-40 bg-blue-500 rounded-lg"
                variants={boxVariants}
                initial="initial"
                whileHover="hover"
                whileTap="click"
            ></motion.div> */}

            <motion.button
                className="ml-10 px-4 py-2 bg-orange-500 rounded-md shadow-md hover:bg-orange-600 outline-none hover:shadow-orange-800"
                onClick={handleClickImage}
            >
                {showImage ? 'Hide Images' : 'Show Images'}
            </motion.button>
        </motion.div>
    );
};

export default App;
