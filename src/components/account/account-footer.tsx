import Link from "next/link";
import { Button } from "../ui/button";

const AccountFooter = () => {
  return (
    <div className="flex flex-col small:flex-row items-end justify-between p-5 gap-8 w-full ">
      <div className="w-full">
        <h3 className="font-semibold mb-4">Dúvidas??</h3>
        <span className="txt-medium">
          Voce pode perguntar em nosso serviço de ajuda!
        </span>
      </div>
      <div>
        <Button>
          <Link href="/customer-service">Serviço ao Ciente</Link>
        </Button>
      </div>
    </div>
  );
};
export default AccountFooter;
