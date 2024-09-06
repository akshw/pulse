import { Button } from "./Button";

export const Navbar = () => {
  return (
    <>
      <div className="flex justify-between">
        <div className="text-2xl p-5">Zap</div>
        <div>
          <Button></Button>
        </div>
      </div>
    </>
  );
};
