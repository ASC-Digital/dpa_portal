/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DataTable from "@/components/Presentational/DataTable";
import { COLUMNS, FILTERS, EXPORTS } from "./constants";
import useAccessControl from "@/hooks/useAccessControl";
import { useAuth } from "@/contexts/Authentication";

const AccessControlContainers = () => {
  const { getData } = useAccessControl();
  const [spinner, setSpinner] = useState(true);
  const [accessControls, setAccessControls] = useState([]);
  const { user: { permissions } } = useAuth();
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const listData = async (page = 1, per_page = 10) => {
    const response = await getData(`?page=${page}&limit=${per_page}`);
    console.log('[response]', response.accessControl)
    setAccessControls(response.accessControl);
    setTotalRows(response.total);
    setSpinner(false);
  };

  const handlePageChange = (page) => {
    listData(page, perPage);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  useEffect(() => {
    listData(1, perPage);
  }, [perPage]);

  return (
    <>
      <DataTable
        data={accessControls}
        paginationServer={true}
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        columns={COLUMNS}
        loader={spinner}
        filters={FILTERS}
        exports={EXPORTS}
        buttonActions={false}
        buttonAdd={false}
        buttonEdit={false}
        buttonRemove={false}
        buttonUpload={false}
        buttonExport={permissions.includes("access-control-export")}
      />
    </>
  );
};

export default AccessControlContainers;
