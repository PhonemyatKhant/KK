import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CheckOutPage = () => {
 
  return (
    <div className="container sm:mx-20 mt-4">
      <h1 className=" text-3xl font-semibold my-3">Payment</h1>
      <div className=" max-w-[500px] ">
        {" "}
        <Accordion
          
          type="single"
          collapsible
          className="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Bank Deposit</AccordionTrigger>
            <AccordionContent>
              KBZ Bank - 09459224459 (account name - Phone Myat Khant)
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>KBZ Pay</AccordionTrigger>
            <AccordionContent>
              Acc Name: Phone Myat Khant <br></br> KBZ Pay: 09763092928
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Wave Pay</AccordionTrigger>
            <AccordionContent>
              Acc Name: Phone Myat Khant <br></br> Wave Pay: 09763092928
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <h1 className=" text-2xl font-semibold my-3">Billing Address</h1>
    </div>
  );
};

export default CheckOutPage;
