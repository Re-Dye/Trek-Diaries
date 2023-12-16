import { MessageSquare } from "lucide-react";

export default function ButtonComment({
  handleRouting,
}: {
  handleRouting: () => void;
}) {
  return (
    <>
      <button className="cursor-pointer" onClick={handleRouting}>
        <MessageSquare className="w-4 h-4 sm:w-6 sm:h-6 hover:text-blue-600" />
      </button>
    </>
  );
}
