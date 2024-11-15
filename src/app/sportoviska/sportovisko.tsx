import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
type SportType = {
  id: string;
  name: string | null;
  info: string | null;
  pictures: { id: string; image: string }[];
};

export default function SportoviskoComponent(props: SportType) {
  return (
    <Card className="max-h-[15%] max-w-[15%] border-2">
      <CardContent>
        <Image
          className="pt-10"
          src={props.pictures[0]?.image ?? ""}
          width="200"
          height="200"
          alt="test"
        />
      </CardContent>
      <CardHeader className="bg-secondary">
        <CardTitle className="text-center"> {props.name} </CardTitle>
        <CardDescription> {props.info} </CardDescription>
      </CardHeader>
    </Card>
  );
}

//<AccordionItem value="item-1">
//<AccordionTrigger> {props.name} </AccordionTrigger>
//<AccordionContent>
//{props.info}
//<Button> Zarezervovat </Button>
//</AccordionContent>
//</AccordionItem>
