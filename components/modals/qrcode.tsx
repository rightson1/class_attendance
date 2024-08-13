import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarButton } from "../shared/atoms";
import { ClipboardPlus } from "lucide-react";

export function QRCODEMODAL() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>QR CODE</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[60vw]">
        <div className="w-full"></div>
      </DialogContent>
    </Dialog>
  );
}
