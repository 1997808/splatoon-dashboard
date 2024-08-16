import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useTransactionContext } from ".";

const TransactionPagination = () => {
  const { meta, filter, setFilter } = useTransactionContext();
  const arr = []
  for (var i = 1; i <= meta?.pageCount; i++) {
    arr.push(i);
  }

  return meta !== undefined ? (
    <Pagination>
      <PaginationContent>
        {meta?.hasPreviousPage && (
          <PaginationItem>
            <PaginationPrevious href="#" onClick={() => setFilter({ ...filter, page: meta?.page - 1 })} />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href="#" isActive>{meta?.page}</PaginationLink>
        </PaginationItem>
        {meta?.hasNextPage && (
          <PaginationItem>
            <PaginationNext href="#" onClick={() => setFilter({ ...filter, page: meta?.page + 1 })} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  ) : <></>
}

export default TransactionPagination;
