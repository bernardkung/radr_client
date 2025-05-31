import '@/app/globals.css';

export function InfoSpan( {label, value}: {label: string, value: string}) {

  return (
    <div className="flex flex-row justify-start items-center">
      <p className="text-sm text-gray-500 mr-2">{label}:</p>
      <p className="text-sm">{value}</p>
    </div>
  )
}

