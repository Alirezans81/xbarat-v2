import { useUserState } from "../../../Providers/UserProvider";
import { useCurrenciesState } from "../../../Providers/CurrenciesProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
const SubmitModal = ({ setSubmitModal, data }) => {
  const lang = useLanguageState();
  const user = useUserState();
  console.log(data);
  console.log(user.username);
  return (
    <div>
      <div className={`grid grid-cols-1 gird-rows-6 w-fit h-fit`}>
        <div className="row-span-1 col-span-1 bg-blue text-light min-w-[20rem] rounded-2xl p-2 flex justify-center">
          {lang["exchange"]}
        </div>
        <div className="col-span-1 row-span-1 flex flex-row gap-x-2">
          <span>From:</span>
          <span>{user.username}</span>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
