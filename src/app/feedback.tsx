import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Feedback() {
  return (
    <Dialog>
      <div className="fixed bottom-4 right-4">
        <DialogTrigger className="fixed bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow">
          💬
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dajte nám vedieť váš názor</DialogTitle>
          <div className="mt-4">
            <textarea
              className="h-24 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Napíšte sem"
            ></textarea>
          </div>
          <div className="mt-4">
            <button className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500">
              Odoslať
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
