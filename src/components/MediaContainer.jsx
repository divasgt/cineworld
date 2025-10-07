
export function MediaContainer({id="", type="grid-container", children}) {
  return (
  <>
    {type==="grid-container" && 
      <div id={id} className="grid-container grid grid-cols-2 gap-4 pb-4 md:grid-cols-4 md:gap-4 lg:grid-cols-6 lg:gap-5">
        {children}
      </div>
    }

    {type==="horizontal-container" && 
      <div id={id} className="horizontal-container flex overflow-x-auto gap-4 lg:gap-5 p-4 -m-4">
        {children}
      </div>
    }
  </>
  )
}