
import Logo from "./assets/logo.svg"
import { Input } from "./items"
import Arrow from "./assets/Arrow 1.svg"
import { motion, AnimatePresence } from "framer-motion"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import getAvailableClasses from "./api/getAvailableClasses"
import getLessonPlan from "./api/getLessonPlan"
import { beautifyTable } from "./utils/beautifyTable"
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Custom hook to set path and query parameters
const useSetPathAndQuery = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const setPathAndQuery = (newPath: string, newParams: { [a: string]: string } = {}) => {
    const searchParams = new URLSearchParams(location.search);

    // Update search params with newParams
    Object.keys(newParams).forEach((key) => {
      searchParams.set(key, newParams[key]);
    });

    // Navigate to the new path with updated query parameters
    navigate(`${newPath}?${searchParams.toString()}`);
  };

  return setPathAndQuery;
};

function App({ setRealized, realized }: { setRealized: Dispatch<SetStateAction<boolean>>, realized?: boolean }) {
  const setQuery = useSetPathAndQuery();
  const location = useLocation();
  const query = new URLSearchParams(useLocation().search);

  const [className, selectClassName] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [classes, setClasses] = useState<string[]>([])
  const [errMessage, setErr] = useState<string | null>()

  const [verified, setVerify] = useState(false)
  const [htmlPlan, setHtmlPlan] = useState<string | null>(null)

  useEffect(() => { setRealized(query.get("plan_url") && location.pathname.startsWith('/chooseplan') || false); if(!location.pathname.startsWith('/chooseplan') && !query.get("plan_url")){setHtmlPlan(null); setClasses([]); selectClassName(null)}}, [query])

  useEffect(() => {
    (async () => {
      try {
        const res = await getAvailableClasses(query.get("plan_url")!)
        setErr(null)
        setQuery("/chooseplan", { plan_url: res.url })
        setClasses(res.classes)
        setRealized(true)
      } catch {
        ""
      }

    })()
  }, [])


  async function onPlanEntered() {
    try {
      const res = await getAvailableClasses(query.get("plan_url")!)
      setErr(null)
      setQuery("/chooseplan", { plan_url: res.url })
      setClasses(res.classes)
      setRealized(true)
    } catch (e) {
      setErr("Ta strona nie jest kompatybilna")
      console.log(e)
    }
  }

  async function onClassSelected(_class: string) {
    try {
      setHtmlPlan(beautifyTable(await getLessonPlan(query.get("plan_url")!, _class)))
      selectClassName(_class)
    } catch (e) {
      console.log(e)
    }
  }

  const link = new URL("api/generate_calendar.php", (window.location as unknown as string))
  link.searchParams.set("class", className!)
  link.searchParams.set("plan_url", query.get("plan_url")!)

  return <div className="relative w-screen h-screen overflow-hidden text-white">
    <div className="absolute z-40 flex flex-row items-center gap-6 mx-10 my-10 lg:mx-20">
      <Link to="/" style={{ position: "relative", zIndex: 999 }}><img src={Logo} className="mr-9" /></Link>
      <AnimatePresence>
        <motion.div onClickCapture={() => { setQuery("/", { plan_url: query.get("plan_url")! }); setRealized(false); selectClassName(null); setHtmlPlan(null); setTimeout(() => { inputRef.current?.focus() }, 20) }} animate={{ opacity: realized ? 1 : 0, x: realized ? 0 : -200 }}  >
          <Input value={query.get("plan_url")!} onChange={(a) => { setQuery("", { plan_url: a.target.value }) }}></Input>
        </motion.div>
        {className && <motion.div key={0} transition={{ duration: 0.1 }} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} >
          <Pod selected={true} text={className}></Pod>
        </motion.div>}
      </AnimatePresence>
    </div>
    <AnimatePresence>
      {
        location.pathname === '/' &&
        <motion.div key={0} initial={{ opacity: 0, x: -150 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 150 }} className="absolute top-0 bottom-0 w-full max-lg:top-36">
          <div className="container flex flex-col min-h-full mx-auto lg:justify-center">

            <h1 className="font-black lg:text-[9rem] max-lg:text-center max-lg:text-[2.2rem] leading-tight">Koniec z <br class="max-lg:hidden" />chaosem </h1>
            <h2 className="lg:my-10 lg:text-[2.3rem] max-lg:text-center max-lg:text-[2.2rem] font-extrabold">w planach lekcji!</h2>
            <p className="text-lg max-lg:text-sm max-lg:mt-2 max-lg:text-center max-lg:mx-3 lg:w-1/3">Twoje rozwiązanie do harmonizacji planów z Vulcan Optivum z Twoim ulubionym kalendarzem. Konwertuj, synchronizuj, zapanuj nad czasem już teraz!</p>

            <div className="items-center w-screen my-20 max-lg:flex max-lg:flex-col max-lg:justify-end max-lg:flex-grow max-lg:mb-5">
              <p className="mx-5 my-2 max-lg:text-xs">Wprowadź link do planu Vulcan Optivum twojej szkoły!</p>

              <div className="flex items-center max-lg:flex-col lg:flex-row max-lg:w-full">
                <Input name="plan_url" placeholder="https://plan.elektryk.opole.pl" value={query.get("plan_url")!} errorMessage={errMessage} onVerify={setVerify} ref={inputRef} onChange={(a) => { setQuery("", { plan_url: a.target.value }) }}></Input>
                <motion.button animate={{ opacity: verified ? 1 : 0, x: verified ? 0 : -10 }} whileHover={{ x: verified ? 10 : undefined, opacity: verified ? 0.8 : undefined }} transition={{ duration: 0.03 }} className="px-4 transition-all duration-75 max-lg:pt-4 hover:scale-110 hover:shadow-2xl shadow-white"><img src={Arrow} onClick={onPlanEntered} /></motion.button>
              </div>
            </div>
          </div>
        </motion.div>}
      {location.pathname.startsWith('/chooseplan') &&
        <motion.div key={1} initial={{ opacity: 0, x: -150 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 150 }} className="absolute top-[15%] bottom-0 w-full">
          <h2 className="container mx-auto my-10 text-[2.3rem] font-extrabold">Do której klasy chodzisz?</h2>
          <div className="container grid min-h-screen mx-auto lg:grid-cols-3 lg:grid-rows-3">
            <div className="max-lg:mb-24">
              <div className="flex flex-wrap">
                {classes.map(a => <Pod text={a} selected={a == className} onClick={() => onClassSelected(a)} />)}
              </div>
            </div>
            <div className="col-span-2 row-span-3 relative lg:max-h-[60%] mask_img">
              <AnimatePresence>
                {
                  realized && htmlPlan &&
                  <motion.div initial={{ y: 400, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -400, opacity: 0 }} transition={{ ease: "circInOut", duration: 0.9 }} dangerouslySetInnerHTML={{ __html: htmlPlan }} key={className} className="lg:absolute lg:top-0">
                  </motion.div>
                }
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {htmlPlan && link && <motion.div className="max-lg:my-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="my-10 text-[2.3rem] font-extrabold">Gotowe!</h2>
                <Input value={link.toString()} onChange={(e) => e.preventDefault()}></Input></motion.div>}
            </AnimatePresence>

          </div>
        </motion.div>
      }
    </AnimatePresence>
  </div>
}

function Pod({ selected, text, onClick }: { selected?: boolean, text: string, onClick?: () => void }) {
  return <button onClick={onClick} className={`transition-all px-6 py-1 border-2 border-primary rounded-full m-2 hover:bg-primary ${selected && "bg-primary"}`}>{text}</button>

}

export default App
