import '@/app/globals.css'; 
import { 
  LinkIcon, 
} from "@heroicons/react/24/outline";
import { ReactNode } from 'react';

export function InfoSpan( {label, value}: {label: string, value: string}) {

  return (
    <div className="flex flex-row justify-start items-center">
      <p className="text-sm text-gray-500 mr-2">{label}:</p>
      <p className="text-sm">{value}</p>
    </div>
  )
}


export function InfoMainHeader({label, link}: { label: string; link: string }) {
  return (
    <div className="flex flex-row justify-start items-center my-2">
      <h1 className="text-sm font-medium">{ label }</h1>
      <a href={link}>
        {link!=='' ? <LinkIcon className="h-3 w-3 mx-2"/> : <></>}
      </a>
    </div>
  )
}

export function InfoSubHeader({label, link}: { label: string; link: string }) {
  return (
    <div className="flex flex-row justify-start items-center my-2">
      <h2 className="text-sm font-medium">{ label }</h2>
      <a href={link}>
        {link!=='' ? <LinkIcon className="h-3 w-3 mx-2"/> : <></>}
      </a>
    </div>
  )
}

export function InfoPanel({ children }: { children: React.ReactNode }) {
  return (
    
    // <div className="p-8 w-96 max-w-lg border-2 border-black"></div>
    <div data-component="infoPanel" className="px-6 py-8 w-full flex flex-col justify-start items-start border-2 border-black">
      {children}
    </div>
  );
}

export function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    
    // <div className="p-8 w-96 max-w-lg border-2 border-black"></div>
    <div data-component="infoPanel" className="px-6 py-8 m-4 w-full flex flex-col justify-start items-start border-2 border-black">
      {children}
    </div>
  );
}

