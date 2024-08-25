"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { Plus } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import { classSchema } from "@/lib/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useGetUnitsByLectureId } from "@/lib/hooks/useUnit";
import { useAuth } from "../provider/UserAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCustomToast } from "../atoms/functions";
import { useCreateClass } from "@/lib/hooks/useClass";

type ClassSchema = z.infer<typeof classSchema>;
export const NewClass = () => {
  const pathname = usePathname();
  const unit = pathname.split("/").pop();
  const { user } = useAuth();
  const { data: units } = useGetUnitsByLectureId(user?._id);
  const { mutateAsync: createClass } = useCreateClass();
  const { customToast, modalOpen, setModalOpen } = useCustomToast();
  const form = useForm<ClassSchema>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      unit: unit || "",
      status: "upcoming",
      lecturer: user?._id,
    },
  });
  const onSubmit = (e: FieldValues) => {
    const data = e as ClassSchema;
    customToast({
      func: async () => {
        await createClass(data);
      },
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          <span>Create Class</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[70vw] mb:w-[90vw] rounded-lg">
        <DialogHeader>
          <DialogTitle>Create A New Class</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" mb:max-h-[80vh] 
    max-h-[80vh] rounded-md  flex flex-col  overflow-y-scroll p-1"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Class Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {units?.map((unit) => (
                          <SelectItem value={unit._id} key={unit._id}>
                            {unit.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="class_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "dd MMM yyyy")
                            : "Select Date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (date) form.setValue("class_date", date);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    Select the date for when the event will take place
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="start_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormDescription>
                      Select the time for when the class will start
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormDescription>
                      Select the time for when the event will end
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
