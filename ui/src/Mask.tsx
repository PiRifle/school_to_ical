function Mask() {

    return <div className="grid overflow-hidden h-screen grid-cols-3">
        <div className="bg-neutral"></div>
        <div className="h-[140vh] bg-center col-span-2" style={{
            backgroundImage: `radial-gradient(ellipse at center, transparent 30%, #181619 70%)`
        }}></div>
    </div>
  }
  
  export default Mask
  