import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { DatePicker } from "@/shared/ui/date-picker";

export function BookingForm() {
  return (
    <form>
      <Card className="w-[400px] max-h-fit">
        <CardHeader>
          <CardTitle className="font-bold text-2xl text-gray-800 text-left">
            Booking
          </CardTitle>
          <CardDescription>Book your table</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm">Full Name</p>
          <Input
            className="border-gray-400"
            placeholder="Lisa Brown"
            id="fullname_input"
          />
        </CardContent>

        <CardContent className="flex flex-row gap-4">
          <div className="w-7/12">
            <p className="text-sm">Phone number</p>
            <Input
              className="border-gray-400"
              placeholder="+380XXXXXXXXX"
              id="phoneNumber_input"
            />
          </div>

          <div className="w-5/12">
            <p className="text-sm">Data</p>
            <DatePicker />
          </div>
        </CardContent>

        <CardContent className="flex flex-row gap-4">
          <div className="w-1/3">
            <p className="text-sm">Your table</p>
            <Input
              className="border-gray-400"
              placeholder="Choose your table"
              type="text"
              inputMode="numeric"
              id="summa_input"
            />
          </div>

          <div className="w-1/3">
            <p className="text-sm">Start time</p>
            <Input
              className="border-gray-400"
              placeholder="Start"
              type="text"
              inputMode="numeric"
              id="start_time"
            />
          </div>

          <div className="w-1/3">
            <p className="text-sm">End time</p>
            <Input
              className="border-gray-400"
              placeholder="End"
              type="text"
              inputMode="numeric"
              id="end_time"
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full">
            Book
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
