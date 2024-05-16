import Image from "next/image";
import { ISelectProps } from "./types";

function Select({ onChange, optionsList, token }: ISelectProps) {
  return (
    <details className="dropdown relative">
      <summary className="m-1 btn bg-[#020617] w-24 h-10 rounded-full	flex items-center p-1 cursor-pointer hover:bg-[#52525b]">
        <div className="flex flex-row flex-nowrap gap-1 items-center">
          <div className="w-6 h-6">
            <Image
              src={token?.img || ""}
              alt={token?.name || ""}
              width={25}
              height={25}
            />
          </div>
          <div className="overflow-hidden w-14">
            <p className="text-xs text-[#84cc16] text-ellipsis overflow-hidden text-nowrap truncate">
              {token?.name || ""}
            </p>
          </div>
        </div>
      </summary>
      <ul className="absolute flex flex-col p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        {optionsList.map((item) => (
          <li
            key={item.address}
            style={{
              listStyleType: "none"
            }}
            onClick={() => onChange(item.address)}
          >
            <div className="flex flex-row bg-[#eab308] cursor-pointer hover:bg-[#52525b]">
              <span className="basis-1/4">
                <Image src={item.img} alt={item.name} width={25} height={25} />
              </span>
              <span className="basis-3/4">
                <h4>{item.name}</h4>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default Select;
