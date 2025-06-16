import '@/app/globals.css'; 
import { 
  LinkIcon, 
} from "@heroicons/react/24/outline";

export function InfoSpan( {label, value}: {label: string, value: string}) {

  return (
    <div className="flex flex-row justify-start items-center">
      <p className="text-sm text-gray-500 mr-2">{label}:</p>
      <p className="text-sm">{value}</p>
    </div>
  )
}



export function InfoTitle({label, link}: { label: string; link: string }) {
  return (
    <div className="flex flex-row justify-start items-center my-2">
      <h2 className="text-sm font-medium">{ label }</h2>
      <a href={link}>
        {link!=='' ? <LinkIcon className="h-3 w-3 mx-2"/> : <></>}
      </a>
    </div>

  )

}

