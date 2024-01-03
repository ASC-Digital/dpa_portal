/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const Pagination = ({ totalPages, actualPage, handleChange }) => {
  const pagesArr = new Array(totalPages).fill(0);
  return (
    <div className="d-flex justify-content-center mt-3">
      <nav>
        <ul className="pagination">
          <li
            className={`page-item ${actualPage === 1 ? "disabled" : ""}`}
            onClick={
              actualPage === 1 ? () => {} : () => handleChange(actualPage - 1)
            }
            style={{ cursor: "pointer" }}
          >
            <a className="page-link" aria-label="Anterior">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Anterior</span>
            </a>
          </li>
          {pagesArr?.map((item, index) => (
            <li
              className={`page-item ${
                index + 1 === actualPage ? "active" : ""
              }`}
              onClick={() => handleChange(index + 1)}
              style={{ cursor: "pointer" }}
            >
              <a className="page-link">{index + 1}</a>
            </li>
          ))}
          <li
            className={`page-item ${
              actualPage === totalPages ? "disabled" : ""
            }`}
            onClick={
              actualPage === totalPages
                ? () => {}
                : () => handleChange(actualPage + 1)
            }
            style={{ cursor: "pointer" }}
          >
            <a className="page-link" aria-label="Próximo">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Próximo</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
