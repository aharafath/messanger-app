import { Listbox } from "@headlessui/react";

import { FaCheck } from "react-icons/fa6";
import { MdArrowDropDown } from "react-icons/md";

const RenderListbox = ({ label, name, options, formData, setFormData }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1 ">{label}</label>
    <Listbox
      value={formData[name]}
      onChange={(value) => setFormData({ ...formData, [name]: value })}
    >
      <div className="relative">
        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white/10 text-white border border-white/20 py-2 pl-4 pr-10 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <span className="block truncate capitalize">
            {formData[name] || `Select ${label}`}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <MdArrowDropDown
              className="h-5 w-5 text-white"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#6A3B91] text-white border border-white/20 backdrop-blur-lg shadow-lg">
          <Listbox.Option
            value={null}
            className={({ active }) =>
              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                active ? "bg-indigo-500 text-white" : "text-white"
              }`
            }
          >
            {({ selected }) => (
              <>
                <span
                  className={`block truncate capitalize ${
                    selected ? "font-medium" : "font-normal"
                  }`}
                >
                  Select
                </span>
                {selected && (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaCheck className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}
              </>
            )}
          </Listbox.Option>
          {options.map((option) => (
            <Listbox.Option
              key={option}
              value={option}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? "bg-indigo-500 text-white" : "text-white"
                }`
              }
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate capitalize ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {option}
                  </span>
                  {selected && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaCheck className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  </div>
);

export default RenderListbox;
