"use client"
export const TextInput = ({label, onChange, placeholder, type}: {
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: "password" | "text"
}) => {
  return <div className="pt-2">
    <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
    <input onChange={(e) => onChange(e.target.value)} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5" placeholder={placeholder} />
  </div>

}