import { motion } from 'framer-motion';

const App: React.FC = () => {
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

    return (
        <div className="flex justify-center items-center h-screen  ">
            {/* {[...Array(3)].map((_, index) => (
                <motion.div
                    key={index}
                    className="h-4 w-4 bg-red-500 rounded-full"
                    variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: {
                            opacity: 1,
                            scale: 1,
                        },
                        exit: {
                            opacity: 0,
                            scale: 0.5,
                        },
                    }}
                    initial="visible"
                    animate={{
                        x:
                            index === 0
                                ? [0, 15, 0]
                                : index === 1
                                  ? [0, 15, 0]
                                  : [0, 15, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        times: [0, 0.5, 1],
                        delay: index * 0.3,
                        repeatDelay: 0.4,
                    }}
                />
            ))} */}
            <motion.div
                className="w-40 h-40 bg-blue-500 rounded-lg"
                variants={boxVariants}
                initial="initial"
                whileHover="hover"
                whileTap="click"
            ></motion.div>
        </div>
    );
};

export default App;
