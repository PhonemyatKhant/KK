"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  increasePage,
  decreasePage,
  setPage,
} from "@/app/redux/slices/pageSlice";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Paginations = ({ pages }) => {
  const dispatch = useDispatch();

  async function increase(pages) {
    dispatch(increasePage(pages));
  }
  async function decrease(pages) {
    dispatch(decreasePage(pages));
  }
  async function setPageNumber(page) {
    dispatch(setPage(page));
  }
  const { page } = useSelector((state) => state.pagination);

  return (
    <Pagination className="col-span-full">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => decrease(pages)} />
        </PaginationItem>
        <PaginationItem>
          {Array.from({ length: pages }).map((_, index) => (
            <PaginationLink
              key={index}
              onClick={() => setPageNumber(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          ))}
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => increase(pages)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginations;
