import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";


export default function Sportovisko(props) {
    return (
        <AccordionItem value="item-1">
        <AccordionTrigger> {props.name} </AccordionTrigger>
        <AccordionContent>
            {props.info}
        <Button> Zarezervovat </Button>
            </AccordionContent>
        </AccordionItem>
    );
}
