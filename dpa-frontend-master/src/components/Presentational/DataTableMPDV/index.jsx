import React, { useState, useMemo } from "react";
import { search } from "ss-search";
import DataTable from "react-data-table-component";
import Card from "@/components/Presentational/Card";
import Button from "@/components/Presentational/Buttons/Icon";
import Circle from "@/components/Presentational/Buttons/Circle";
import Upload from "@/components/Presentational/Buttons/Upload";
import Export from "@/components/Presentational/Buttons/Export";
import Spinner from "@/components/Presentational/Spinner";
import Search from "@/components/Presentational/Inputs/Search";
import Toggle from "@/components/Presentational/Toogle";
import { PAGINATION, MESSAGES, STYLE } from "./constants";

const DatatableMPDV = ({
  data,
  columns,
  loader,
  paginationTotalRows,
  onChangePage,
  onChangeRowsPerPage,
  paginationServer = false,
  buttonActions = true,
  buttonAdd = true,
  buttonEdit = true,
  buttonRemove = true,
  buttonUpload = false,
  buttonBuy = false,
  buttonStatus = false,
  buttonExport = false,
  buttonDetails,
  onClickAdd,
  onClickEdit,
  onClickRemove,
  onClickStatus,
  onClickUpload,
  onClickPurchase,
  onClickDetails,
  filters,
  exports,
  onDownload,
  buttonDownload,
}) => {
  let title = "";
  let buttonRight = "";

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [filterTextDigital, setFilterTextDigital] = useState("");
  const [resetPaginationToggleDigital, setResetPaginationToggleDigital] = useState(false);
  const filteredItems = search(data, filters, filterText);

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return ([
      <h1 class="h3 mb-0 text-gray-800">MPDV Físico</h1>,
      <Search
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
      />
    ]);
  }, [filterText, resetPaginationToggle]);
  

  const subHeaderComponentMemoDigital = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggleDigital(!resetPaginationToggleDigital);
        setFilterTextDigital("");
      }
    };

    return ([
      <h1 class="h3 mb-0 text-gray-800">MPDV Digital</h1>,
      <Search
        value={filterTextDigital}
        onChange={(e) => setFilterTextDigital(e.target.value)}
        onClear={handleClear}
      />
    ]);
  }, [filterTextDigital, resetPaginationToggleDigital]);

  const editButton = (record) => (
    <Circle icon="edit" color="info" onClick={() => onClickEdit(record)} />
  );

  const deleteButton = (record) => (
    <Circle icon="trash" color="danger" onClick={() => onClickRemove(record)} />
  );

  const downloadButton = (record) => (
    <Circle icon="download" color="info" onClick={() => onDownload(record)} />
  );

  const toogleButton = (record) => (
    <Toggle
      checked={!record.deletedAt ? true : false}
      onChange={() => onClickStatus(record)}
    />
  );

  const buyButton = (record) =>
    !record.deletedAt && record.stock > 0 ? (
      <Circle
        icon="dollar-sign"
        color="primary"
        onClick={() => onClickPurchase(record)}
      />
    ) : (
      ""
    );

  const detailsButton = (record) => (
    <Circle
      icon="file"
      color="primary"
      onClick={() => onClickDetails(record)}
    />
  );

  if (buttonAdd) {
    title = (
      <Button
        type="button"
        title="Adicionar"
        icon={"plus"}
        onClick={onClickAdd}
      />
    );
  }

  if (buttonUpload) {
    title = (
      <Upload
        label="Upload"
        icon={"plus"}
        color={"warning"}
        onChange={onClickUpload}
      />
    );
  }

  if (buttonExport) {
    buttonRight = (
      <Export title="Exportar" data={filteredItems} headers={exports} />
    );
  }

  const getColumns = (rowsColumns) => {
    const data = [];

    const actions = {
      key: "actions",
      name: "Ações",
      sortable: false,
      cell: (record) => (
        <>
          {buttonBuy && buyButton(record)}
          {buttonDetails && detailsButton(record)}
          {buttonEdit && editButton(record)}
          {buttonDownload && downloadButton(record)}
          {buttonRemove && deleteButton(record)}
        </>
      ),
    };

    const status = {
      key: "status",
      name: "Ativo/Inativo",
      sortable: false,
      cell: (record) => <>{toogleButton(record)}</>,
    };

    if (!Array.isArray(rowsColumns)) {
      for (const key in rowsColumns) {
        if (rowsColumns.hasOwnProperty(key)) {
          data.push({
            key,
            text: rowsColumns[key],
            sortable: false,
          });
        }
      }
    } else {
      for (const k in rowsColumns) {
        data.push(rowsColumns[k]);
      }
    }

    if (buttonStatus) data.push(status);
    if (buttonActions) data.push(actions);
    return data;
  };

  return (
    <Card title={title} buttonRight={buttonRight}>
      <DataTable
        defaultSortAsc={true}
        data={filteredItems}
        columns={getColumns(columns)}
        pagination={true}
        paginationComponentOptions={PAGINATION}
        progressPending={loader}
        customStyles={STYLE}
        progressComponent={<Spinner />}
        expandableRows={false}
        noDataComponent={MESSAGES.noData}
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
        paginationServer={paginationServer}
        paginationTotalRows={paginationTotalRows}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />,
      
      <DataTable
        defaultSortAsc={true}
        data={filteredItems}
        columns={getColumns(columns)}
        pagination={true}
        paginationComponentOptions={PAGINATION}
        progressPending={loader}
        customStyles={STYLE}
        progressComponent={<Spinner />}
        expandableRows={false}
        noDataComponent={MESSAGES.noData}
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemoDigital}
        persistTableHead
        paginationServer={paginationServer}
        paginationTotalRows={paginationTotalRows}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Card>
  );
};

export default DatatableMPDV;
