import { StarIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Rating from "./Rating";

const AllReviews = ({ reviews }) => {
  return (
    <div className=" w-full max-w-[500px]">
      {reviews.length === 0 ? (
        <Alert>
          <StarIcon className="h-4 w-4" />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>
            You can rate and review products down below.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="mb-5">
          <StarIcon className="h-4 w-4" />
          <AlertTitle>All Reviews</AlertTitle>
        </Alert>
      )}
      {reviews.map((review) => (
        <div key={review._id}>
          <div className="container flex flex-col gap-2 w-full max-w-[500px] items-start">
            <h4 className=" text-sm  leading-none">{review.name}</h4>
            <Rating value={review.rating} />
            <p className="text-sm text-muted-foreground">{`${review.createdAt.slice(
              0,
              10
            )}`}</p>
            <h4 className=" text-md font-medium leading-none">
              {review.comment}
            </h4>
          </div>
          <Separator className="h-0.5 w-full bg-slate-400 my-4" />
        </div>
      ))}
    </div>
  );
};

export default AllReviews;
