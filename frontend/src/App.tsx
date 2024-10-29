import { motion } from 'framer-motion';

const App: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen  space-x-3">
            {/* <motion.div
                className="box"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{
                    type: 'Spring',
                    stiffness: 400,
                    damping: 10,
                }}
            />

            <motion.button
                animate={{
                    scale: [1, 1.1, 1],
                    backgroundColor: ['red', 'blue', 'green'],
                }}
                transition={{
                    duration: 0.8,
                    ease: 'easeInOut',
                    repeat: Infinity,
                }}
                className="px-4 py-2 bg-blue-700 rounded-lg outline-none"
            >
                Button
            </motion.button> */}
            {/* <div className="flex items-center justify-center space-x-3">
                {[...Array(3)].map((_, index) => (
                    <motion.div
                        key={index}
                        className="h-4 w-4 bg-white rounded-full"
                        animate={{ x: [0, 15, 0] }}
                        transition={{
                            duration: 0.4,
                            ease: 'easeInOut',
                            repeat: Infinity,
                            delay: index * 0.1,
                            repeatDelay: 0.6,
                        }}
                    />
                ))}
            </div> */}

            {[...Array(3)].map((_, index) => (
                <motion.div
                    key={index}
                    className="h-4 w-4 bg-red-500 rounded-full"
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
            ))}
        </div>
    );
};

export default App;
