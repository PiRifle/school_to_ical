import { motion } from "framer-motion"

function Pill({additionalStyle}: {additionalStyle: string}){

    return <motion.div animate={{ opacity: [0.08, 1, 0.08] }} transition={{ duration: 3.5, repeat: Infinity, delay: (Math.random()*3.5)}}  className={`aspect-[1/5] w-20 rounded-full ${additionalStyle}`} style={{boxShadow: "0px 0px 40px -10px var(--tw-shadow-color)"}}></motion.div>
}

function PillVertical({additionalStyle}: {additionalStyle: string}){

    return <motion.div animate={{ opacity: [0.08, 1, 0.08] }} transition={{ duration: 3.5, repeat: Infinity, delay: (Math.random()*3.5)}}  className={`aspect-[5/1] h-20 rounded-full ${additionalStyle}`} style={{boxShadow: "0px 0px 40px -10px var(--tw-shadow-color)"}}></motion.div>
}

function Background({realised}: {realised?: boolean}) {

return  <div className="bg-neutral w-screen overflow-clip ">
            <div className="ml-auto container h-screen mr-[20vw]">
                <motion.div className="flex flex-row rotate-45 -translate-y-1/4 relative" initial={{bottom:"100%"}} transition={{duration: 1, ease:"anticipate", mass:2}} animate={{bottom: realised ? "70%": "0%"}}>
                    <div className="ml-20">
                        <Pill additionalStyle="shadow-primary bg-primary"/>
                        <PillVertical additionalStyle="relative shadow-primary bg-primary left-20"/>
                        <Pill additionalStyle="shadow-primary bg-primary"/>
                        <PillVertical additionalStyle="relative shadow-primary bg-primary left-20"/>
                        <Pill additionalStyle="shadow-primary bg-primary"/>
                        <PillVertical additionalStyle="relative shadow-primary bg-primary left-20"/>
                        <Pill additionalStyle="shadow-primary bg-primary"/>
                        <PillVertical additionalStyle="relative shadow-primary bg-primary left-20"/>
                    </div>
                    <div className="ml-20">
                        <Pill additionalStyle="shadow-primary bg-primary"/>
                        <PillVertical additionalStyle="relative shadow-primary bg-primary left-20"/>
                        <Pill additionalStyle="shadow-primary bg-primary"/>
                        <PillVertical additionalStyle="relative shadow-primary bg-primary left-20"/>
                        <Pill additionalStyle="shadow-primary bg-primary"/>
                        <PillVertical additionalStyle="relative shadow-primary bg-primary left-20"/>
                        <Pill additionalStyle="shadow-primary bg-primary"/>
                        <PillVertical additionalStyle="relative shadow-primary bg-primary left-20"/>
                        <Pill additionalStyle="shadow-primary bg-primary"/>
                    </div>
                    <div className="ml-20">
                        <Pill additionalStyle="shadow-primary bg-primary"/>
                        <PillVertical additionalStyle="relative shadow-primary bg-primary left-20"/>
                        <Pill additionalStyle="shadow-primary bg-primary"/>
                        <PillVertical additionalStyle="relative shadow-primary bg-primary left-20"/>
                        <Pill additionalStyle="shadow-primary bg-primary"/>
                        <PillVertical additionalStyle="relative shadow-primary bg-primary left-20"/>
                        <Pill additionalStyle="shadow-primary bg-primary"/> 
                    </div>
                    <div className="ml-20">
                        <Pill additionalStyle="shadow-primary bg-primary"/>
                        <PillVertical additionalStyle="relative shadow-primary bg-primary left-20"/>
                        <Pill additionalStyle="shadow-primary bg-primary"/>
                        <PillVertical additionalStyle="relative shadow-primary bg-primary left-20"/>
                        <Pill additionalStyle="shadow-primary bg-primary"/>
                    </div>
                </motion.div>
            </div>
        </div>
  }

  
export default Background
  